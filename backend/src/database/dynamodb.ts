import * as fs from "fs";
import _ from "lodash";
import * as path from "path";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const DynamoDBConfig = {
  endpoint: process.env.AWS_DYNAMODB_ENDPOINT,
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const tables = fs
  .readdirSync(path.join(__dirname, "tables"))
  .map((file) => require(`./tables/${file}`))
  .map((m) => m.table);

const tablesByName = _.keyBy(tables, "TableName");

const client = new DynamoDB(DynamoDBConfig);

const ddbAttributeType = (TableName: string, AttributeName: string): string => {
  const attributes = _.get(tablesByName, [TableName, "AttributeDefinitions"]);
  const attribute = _.find(attributes, { AttributeName });

  return _.get(attribute, "AttributeType");
};

const toDDBAttributes = (tableName: string, attributes: any) => {
  return _.chain(attributes)
    .toPairs()
    .map(([key, value]) => [key, { [ddbAttributeType(tableName, key)]: value }])
    .fromPairs()
    .value();
};

const fromDDBAttributes = (item: any) => {
  return _.fromPairs(_.map(item, (v, k) => [k, _.values(v)[0]]));
};

export const getItem = async (tableName: string, query: any): Promise<any> => {
  console.log(toDDBAttributes(tableName, query));
  const result = await client.getItem({
    TableName: tableName,
    Key: toDDBAttributes(tableName, query),
  });

  console.log(result);
  return fromDDBAttributes(result.Item);
};

export const putItem = async (tableName: string, item: any) => {
  return client.putItem({
    TableName: tableName,
    Item: toDDBAttributes(tableName, item),
  });
};
