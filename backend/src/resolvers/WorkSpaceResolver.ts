import _ from "lodash";
import * as uuid from "uuid";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { mapper } from "../dynamodb";
import { Workspace, NewWorkspaceInput } from "../models/Workspace";

@Resolver(Workspace)
export default class WorkspaceResolver {
  @Query((_) => Workspace)
  async workspace(@Arg("id") id: string): Promise<Workspace> {
    const query = _.assign(new Workspace(), { id: id });
    return mapper.get(query);
  }

  @Query((_) => [Workspace])
  async allWorkspaces(): Promise<Array<Workspace>> {
    const results: Array<Workspace> = [];
    for await (const item of mapper.scan(Workspace)) {
      results.push(item);
    }
    return results;
  }

  @Mutation((_) => Workspace)
  async addWorkSpace(
    @Arg("newWorkspace") newWorkspace: NewWorkspaceInput
  ): Promise<Workspace> {
    const workspace = _.assign(
      new Workspace(),
      _.merge(newWorkspace, { id: uuid.v4() })
    );
    return mapper.put(workspace);
  }
}
