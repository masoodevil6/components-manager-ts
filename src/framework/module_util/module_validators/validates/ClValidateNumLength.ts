///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";
import {Keys}                                         from "../language/keys";
import type {ValidatorDescription}                  from "../abstract/AbstractValidatorRule";

export class ClValidateNumLength
    extends ValidatorRule {

    constructor(
        title:       ValidatorDescription = Keys.numLength.title,
        description: ValidatorDescription = Keys.numLength.description
    ) {
        super(title, description, undefined);
    }

    validate(
        input: string
    ): ValidatorResult {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return [
            emailRegex.test(input.trim()),
            this.getDescription()
        ];
    }

}