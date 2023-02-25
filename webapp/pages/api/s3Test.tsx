import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { NextApiRequest, NextApiResponse } from "next";

const aws_client: S3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_KEY as string,
    secretAccessKey: process.env.S3_SECRET as string,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await aws_client.send(
      new PutObjectCommand({
        Bucket: "spndao",
        Key: "test.txt",
        Body: "Hello World!",
      })
    );
    console.log(data);
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({ name: "John Doe" });
}
