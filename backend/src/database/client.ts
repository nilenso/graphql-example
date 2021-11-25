import { DynamoDB } from "@aws-sdk/client-dynamodb";

const DynamoDBConfig = {
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

console.log(DynamoDBConfig);
export default (): DynamoDB => new DynamoDB(DynamoDBConfig);
