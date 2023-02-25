import lighthouse from "@lighthouse-web3/sdk";
import S3 from "aws-sdk/clients/s3";
import { ethers } from "ethers";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const aws_client = new S3({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_KEY as string,
    secretAccessKey: process.env.S3_SECRET as string,
  },
});

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

const url = `mongodb+srv://admin:${process.env.DB_PASSWORD}@spndao.vjnl9b2.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(url);
const dbName = "spndao";

async function getAccessToken(item_id: string) {
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection("users");

  const access_token = await collection
    .findOne({ plaid_item_id: item_id })
    .then((result) => {
      return result?.plaid_access_token as string;
    });

  return access_token;
}

interface PlaidHook extends NextApiRequest {
  body: {
    webhook_code: string;
    webhook_type: string;
    item_id: string;
    new_transactions: number;
  };
}

function logHook(req: PlaidHook) {
  console.log("---------------------------------------");
  console.log(`webhook_code: ${req.body.webhook_code}`);
  console.log(`webhook_type: ${req.body.webhook_type}`);
  console.log(`item_id: ${req.body.item_id}`);
  console.log(`new_transactions: ${req.body.new_transactions}`);
  console.log(`webhook_code: ${req.body.webhook_code}`);
}

const sign_auth_message = async (publicKey: string) => {
  const provider: ethers.providers.Provider =
    new ethers.providers.JsonRpcProvider();
  const signer: ethers.Signer = new ethers.Wallet(
    process.env.PRIV_KEY as string,
    provider
  );
  const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data
    .message;
  const signedMessage = await signer.signMessage(messageRequested);
  return signedMessage;
};

// path needs to be asbolute path
const deployEncrypted = async (path: string) => {
  const apiKey = process.env.LIGHTHOUSE_API_KEY as string;
  const publicKey = process.env.PUBLIC_KEY as string;
  const signed_message = await sign_auth_message(publicKey);

  const response = await lighthouse.uploadEncrypted(
    path,
    apiKey,
    publicKey,
    signed_message
  );
  // Display response
  console.log(response);
  /*
    {
      Name: 'flow1.png',
      Hash: 'QmQqfuFH77vsau5xpVHUfJ6mJQgiG8kDmR62rF98iSPRes',
      Size: '31735'
    }
    Note: Hash in response is CID.
  */
};

export default async function handler(req: PlaidHook, res: NextApiResponse) {
  // logHook(req);

  if (req.body.webhook_code === "HISTORICAL_UPDATE") {
    const access_token = await getAccessToken(req.body.item_id);
    const client = new PlaidApi(configuration);

    await client
      .transactionsSync({
        access_token: access_token,
      })
      .then((response) => {
        aws_client.putObject(
          {
            Bucket: "spndao",
            Key: `${response.data.request_id}.json`,
            Body: JSON.stringify(response.data.added),
          },
          (err, data) => {
            if (err) {
              console.log(err);
              res.status(500).json({ success: false });
            }

            const buffer = aws_client
              .getObject({
                Bucket: "spndao",
                Key: `${response.data.request_id}.json`,
              })
              .createReadStream();

            lighthouse
              .uploadBuffer(buffer, process.env.LIGHTHOUSE_API_KEY as string)
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      });
  }
}
