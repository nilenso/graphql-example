import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import express from "express";
import morgan from "morgan";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { QueryResolvers } from "./types/resolvers";
import DBClient from "./database/client";

const isProduction = () => process.env.ENV === "production";
const port = process.env.PORT;

const app = express();
const schemaFile = path.join(process.env.SCHEMA_FILE);

const schema = buildSchema(fs.readFileSync(schemaFile).toString());

const root: QueryResolvers = {
  workspace: async (args) => {
    console.log(args);
    const client = DBClient();
    try {
      const workspace = await client.getItem({
        TableName: "Workspaces",
        Key: {
          uuid: {
            S: "blah",
          },
        },
      });
      console.log(workspace);
    } catch (e) {
      console.log(e);
    }

    return { slug: "Hello World!" };
  },
};

app.use(morgan("combined"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: !isProduction(),
  })
);

app.listen(port, async () => {
  const client = DBClient();
  const id = uuid.v4();
  console.log(id);
  try {
    await client.putItem({
      TableName: "Workspaces",
      Item: {
        uuid: { S: id },
      },
    });
  } catch (e) {
    console.log(e);
  }
  console.log(`Started graphql server on port: ${port}`);
});
