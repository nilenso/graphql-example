import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import { graphqlHTTP } from 'express-graphql';
import {buildSchema} from 'graphql';

dotenv.config();
const isProduction = () => process.env.ENV === 'production';
const port = process.env.PORT;

const app = express();
const schemaFile = process.env.SCHEMA_FILE;

const schema = buildSchema(fs.readFileSync(schemaFile).toString());

const root = { };

app.use(morgan());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: !isProduction()
}))

app.listen(port, () => {
  console.log(`Started graphql server on port: ${port}`);
});
