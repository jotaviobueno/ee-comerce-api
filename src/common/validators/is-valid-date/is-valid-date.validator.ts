import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidDate', async: false })
export class IsValueIsValidDate implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: Date, _: ValidationArguments) {
    if (new Date() >= value) return false;

    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(_: ValidationArguments) {
    return "This date it's invalid.";
  }
}

export function IsValidDate() {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'IsValidDate',
      target: object.constructor,
      propertyName: propertyName,
      options: {},
      validator: IsValueIsValidDate,
    });
  };
}
