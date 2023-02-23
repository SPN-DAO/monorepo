import axios from "axios";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
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

export default async function handler(req: PlaidHook, res: NextApiResponse) {
  // logHook(req);

  if (req.body.webhook_code === "HISTORICAL_UPDATE") {
    const access_token = await getAccessToken(req.body.item_id);
    const client = new PlaidApi(configuration);
    console.log(`transactionsSync() called: ${access_token}`);
    await client
      .transactionsSync({
        access_token: access_token,
      })
      .then((response) => {
        console.log(`transactionsSync() succeeded: ${response}`);
        res.status(200).json({ response: response });
      })
      .catch((error) => {
        console.log(`transactionsSync() failed: ${error}`);
        res.status(500).json({ error: error });
      });
  }
}
