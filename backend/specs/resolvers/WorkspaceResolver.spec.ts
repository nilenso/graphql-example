import _ from "lodash";
import fc from "fast-check";

import WorkspaceResolver from "../../src/resolvers/WorkSpaceResolver";
import * as DB from "../../src/dynamodb";
import { ArbWorkspace } from "../factories/WorkspaceFactory";
import { Workspace } from "../../src/models/Workspace";
import * as Fixtures from "../Fixtures";
describe("WorkSpaceResolver", () => {
  let resolver: WorkspaceResolver;

  Fixtures.cleanDB();

  beforeEach(() => {
    resolver = new WorkspaceResolver();
  });

  describe("workspace", () => {
    it("returns the workspace for the given id, if it exists", async () => {
      await fc.assert(
        fc.asyncProperty(
          ArbWorkspace,
          fc.scheduler(),
          async (workspace: Workspace) => {
            const { id } = workspace;
            await DB.mapper.put(workspace);
            expect(await resolver.workspace(id)).toEqual(workspace);
          }
        )
      );
    });
  });

  describe("allWorkspaces", () => {
    it("returns all the existing workspaces", async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.array(ArbWorkspace),
          fc.scheduler(),
          async (workspaces: Array<Workspace>) => {
            await Promise.all(workspaces.map((ws) => DB.mapper.put(ws)));

            const results = await resolver.allWorkspaces();
            workspaces.forEach((workspace) => {
              expect(results).toContainEqual(workspace);
            });
          }
        )
      );
    });
  });
});
