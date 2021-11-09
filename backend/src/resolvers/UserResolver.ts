import _ from "lodash";
import * as uuid from "uuid";

import { Arg, Mutation, Resolver } from "type-graphql";
import { mapper } from "../dynamodb";
import { SignUpInputs, User } from "../models/User";

@Resolver(User)
export default class UserResolver {
  @Mutation(() => User)
  async signUp(@Arg("params") params: SignUpInputs): Promise<User> {
    const user = _.assign(new User(), _.merge(params, { id: uuid.v4() }));
    return mapper.put(user);
  }
}
