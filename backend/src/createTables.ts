import DBClient from "./database/client";
import * as fs from "fs";
import * as path from "path";
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const createTableCommands = fs
  .readdirSync(path.join(__dirname, "database/tables"))
  .map((file) => require(`./database/tables/${file}`));

const createTables = async (client: DynamoDB, commands: any[]) => {
  await Promise.all(
    commands.map(async ({ table }) => {
      try {
        await client.createTable(table);
        console.log(`Table created: ${table.TableName}`);
      } catch (err) {
        console.log(err);
      }
    })
  );
};

(async () => {
  const client = DBClient();
  await createTables(client, createTableCommands);
})();
