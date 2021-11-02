import { CreateTableCommandInput } from "@aws-sdk/client-dynamodb";

export const table: CreateTableCommandInput = {
  TableName: "Workspaces",
  KeySchema: [{ AttributeName: "uuid", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "uuid", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5,
  },
};
