import { Workspace } from "../src/models/Workspace";
import { mapper } from "../src/dynamodb";
import _ from "lodash";

const DEFAULT_CAPACITY = { readCapacityUnits: 5, writeCapacityUnits: 5 };
const tables = [Workspace];

export const cleanDB = async () => {
  beforeEach(async () => {
    await Promise.all(
      _.map(tables, async (table) => {
        await mapper.ensureTableNotExists(table);
        await mapper.ensureTableExists(table, DEFAULT_CAPACITY);
      })
    );
  });
};
