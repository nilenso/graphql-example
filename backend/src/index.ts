import { printSchemaWithDirectives } from "@graphql-tools/utils";
import { ApolloServer } from "apollo-server";
import { GraphQLSchema, lexicographicSortSchema } from "graphql";
import path from "path";
import "reflect-metadata";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import UserResolver from "./resolvers/UserResolver";
import WorkspaceResolver from "./resolvers/WorkSpaceResolver";
import { outputFile } from "type-graphql/dist/helpers/filesystem";

const port = process.env.PORT;

export async function emitSchemaDefinitionWithDirectivesFile(
  schemaFilePath: string,
  schema: GraphQLSchema
): Promise<void> {
  const schemaFileContent = printSchemaWithDirectives(
    lexicographicSortSchema(schema)
  );
  await outputFile(schemaFilePath, schemaFileContent);
}

const init = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver, WorkspaceResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.graphql"),
  });

  await emitSchemaDefinitionWithDirectivesFile("schema.gql", schema);

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(port);
  console.log(`Started graphql server on: ${url}`);

  return server;
};

init();
