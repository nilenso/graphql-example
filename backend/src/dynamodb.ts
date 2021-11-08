import DynamoDB from "aws-sdk/clients/dynamodb";
import { DataMapper } from "@aws/dynamodb-data-mapper";

const DynamoDBConfig = {
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const client = new DynamoDB(DynamoDBConfig);

export const mapper = new DataMapper({ client });
