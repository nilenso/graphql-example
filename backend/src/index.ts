import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import morgan from 'morgan';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

dotenv.config();
const isProduction = () => process.env.ENV === 'production';
const port = process.env.PORT;

const app = express();
const schemaFile = path.join(process.env.SCHEMA_FILE);

const schema = buildSchema(fs.readFileSync(schemaFile).toString());

const root = { };

app.use(morgan('combined'));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: !isProduction()
}))

app.listen(port, () => {
  console.log(`Started graphql server on port: ${port}`);
});
