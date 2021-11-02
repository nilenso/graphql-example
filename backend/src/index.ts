import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import express from "express";
import morgan from "morgan";
import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";
import { QueryResolvers } from "./types/resolvers";
import * as DB from "./database/dynamodb";
import * as Types from "./types/models";

const isProduction = () => process.env.ENV === "production";
const port = process.env.PORT;

const app = express();
const schemaFile = path.join(process.env.SCHEMA_FILE);

const schema = buildSchema(fs.readFileSync(schemaFile).toString());

const root: QueryResolvers = {
  workspace: async (args) => {
    const ws = await DB.getItem("Workspaces", args);
    console.log(ws);
    return ws;
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
  const id = uuid.v4();
  console.log(id);
  console.log(
    await DB.putItem("Workspaces", {
      uuid: id,
      slug: `FOO-${Math.floor(Math.random() * 1000)}`,
    })
  );
  console.log(`Started graphql server on port: ${port}`);
});
