import { ApolloServer } from "apollo-server";
import path from "path";
import "reflect-metadata";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import WorkspaceResolver from "./resolvers/WorkSpaceResolver";

const isProduction = () => process.env.NODE_ENV === "production";
const port = process.env.PORT;

const init = async () => {
  const schema = await buildSchema({
    resolvers: [WorkspaceResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(port);
  console.log(`Started graphql server on: ${url}`);

  return server;
};

init();
