import { Resolver, ClassType, Query } from "type-graphql";
import { mapper } from "../dynamodb";

export const CreateBaseResolve = <T extends ClassType>(
  suffix: string,
  objectTypeClass: T
) => {
  @Resolver({ isAbstract: true })
  abstract class BaseResolver {
    @Query(() => objectTypeClass, { name: `get${suffix}` })
    async read() {}
  }

  return BaseResolver;
};
