import _ from "lodash";
import * as uuid from "uuid";

import { Arg, Mutation, Resolver } from "type-graphql";
import { mapper } from "../dynamodb";
import { SignUpInput, User } from "../models/User";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg("params") params: SignUpInput): Promise<User> {
    const user = _.assign(new User(), _.merge(params, { id: uuid.v4() }));
    return mapper.put(user);
  }
}
