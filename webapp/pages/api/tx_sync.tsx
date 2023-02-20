import { NextApiRequest, NextApiResponse } from "next";
import {
  Configuration,
  CountryCode,
  DepositoryAccountSubtype,
  PlaidApi,
  PlaidEnvironments,
} from "plaid";

interface ReqAccessProps extends NextApiRequest {
  body: {
    access_token: string;
  };
}

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

export default async function handler(
  req: ReqAccessProps,
  res: NextApiResponse
) {
  const client = new PlaidApi(configuration);
  console.log(`transactionsSync() called: ${req.body.access_token}`);
  await client
    .transactionsSync({
      access_token: req.body.access_token,
    })
    .catch((error) => {
      console.log(`transactionsSync() failed: ${error}`);
      res.status(500).json({ error: error });
    })
    .finally(() => {
      res.status(200).json({ success: true });
    });
}
