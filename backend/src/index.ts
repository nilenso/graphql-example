import { ApolloServer } from "apollo-server";
import path from "path";
import "reflect-metadata";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import WorkspaceResolver from "./resolvers/WorkSpaceResolver";

const port = process.env.PORT;

const init = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, WorkspaceResolver],
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
