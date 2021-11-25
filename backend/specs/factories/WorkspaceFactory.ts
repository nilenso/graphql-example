import fc from "fast-check";
import { fromFaker } from "./FromFaker";
import { Workspace } from "../../src/models/Workspace";
import faker from "faker";
import _ from "lodash";

const ArbId = fc.uuidV(4);
const ArbName = fromFaker(faker.lorem.words);
const ArbSlug = fromFaker(faker.lorem.slug);

export const ArbWorkspace = fc
  .record<Workspace>({
    id: ArbId,
    name: ArbName,
    slug: ArbSlug,
  })
  .map((record) => _.assign(new Workspace(), record));
