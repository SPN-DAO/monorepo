import { MongoClient } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Configuration,
  CountryCode,
  DepositoryAccountSubtype,
  PlaidApi,
  PlaidEnvironments,
} from "plaid";
import axios from "axios";

const url = `mongodb+srv://admin:${process.env.DB_PASSWORD}@spndao.vjnl9b2.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(url);
const dbName = "spndao";

async function setToken(userId: string, token: string, itemId: string) {
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection("users");

  await collection.insertOne({
    name: userId,
    plaid_access_token: token,
    plaid_item_id: itemId,
  });
}

async function getAccessToken(item_id: string) {
  await dbClient.connect();

  const db = dbClient.db(dbName);
  const collection = db.collection("users");

  await collection.findOne({ plaid_item_id: item_id }).then((result) => {
    return result?.plaid_access_token as string;
  });
}

interface ReqProps extends NextApiRequest {
  body: {
    item_id: string;
  };
}

export default async function handler(req: ReqProps, res: NextApiResponse) {
  await getAccessToken(req.body.item_id)
    .then((result) => {
      res.status(200).json({ access_token: result });
    })
    .catch((error) => {
      console.log(`getAccessToken() failed: ${error}`);
      res.status(500).json({ error: error });
    });
}
