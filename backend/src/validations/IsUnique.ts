import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import _ from "lodash";
import { mapper } from "../dynamodb";

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint<T> implements ValidatorConstraintInterface {
  modelClass: new () => T;

  constructor(modelClass: new () => T) {
    this.modelClass = modelClass;
  }

  async validate(
    value: any,
    validationArguments?: ValidationArguments
  ): Promise<boolean> {
    const entity = _.assign(new this.modelClass(), {
      [validationArguments.property]: value,
    });
    const existingUser = await mapper.get(entity);
    return _.isEmpty(existingUser);
  }

  defaultMessage?(validationArguments?: ValidationArguments): string {
    return `Property ${validationArguments.property} is not unique in ${this.modelClass.name}`;
  }
}

export const IsUnique = <T>(
  modelClass: new () => T,
  validationOptions: ValidationOptions
) => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: new IsUniqueConstraint(modelClass),
    });
  };
};
