import lighthouse, { upload } from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

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

const uploadText = async () => {
  const apiKey = process.env.LIGHTHOUSE_API_KEY as string; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)
  const response = await lighthouse.uploadText("This is a string", apiKey);

  // Display response
  console.log(response);
  /*
  {
    data: {
      Name: 'Qmbz13iSeUU1y1z4JGcLNSBH1bFveWzpyTk1drZ6iKSVvd',
      Hash: 'Qmbz13iSeUU1y1z4JGcLNSBH1bFveWzpyTk1drZ6iKSVvd',
      Size: '24'
    }
  }
  */
};

const uploadFile = async (path: string) => {
  const apiKey = process.env.LIGHTHOUSE_API_KEY as string; //generate from https://files.lighthouse.storage/ or cli (lighthouse-web3 api-key --new)

  // Both file and folder supported by upload function
  const response = await lighthouse.upload(path, apiKey);

  // Display response
  console.log(response);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   await uploadText();
  await deployEncrypted("public/test.json");
  //   await uploadFile("public/test.json");
  res.status(200).json({ name: "John Doe" });
}
