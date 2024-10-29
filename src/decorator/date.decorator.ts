import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({name: 'requireBothDates'})
export class RequireBothDatesConstraint implements ValidatorConstraintInterface{
    validate(value: any, arg?: ValidationArguments){
        const object = arg.object as any
        const startdate = object.startdate
        const enddate = object.enddate

        if (!startdate && !enddate) return true
        
        return new Date(startdate) <= new Date(enddate)
    }

    defaultMessage(arg: ValidationArguments){
        return '두 Date가 올바른 순서로 놓여있지 않거나, 한 값만 지정되어있습니다.'
    }
}

export function RequireBothDates(validationOptions?: ValidationOptions){
    return (object: Object, propName: string) => {
        registerDecorator({
            name: 'requireBothDates',
            target: object.constructor,
            propertyName: propName,
            constraints: [],
            options: validationOptions,
            validator: RequireBothDatesConstraint,
        })
    }
}