///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";
import {Keys}                                         from "../language/keys";
import type {ValidatorDescription}                  from "../abstract/AbstractValidatorRule";

export class ClValidateNotEmpty
    extends ValidatorRule {

    constructor(
        title:       ValidatorDescription = Keys.notEmpty.title,
        description: ValidatorDescription = Keys.notEmpty.description
    ) {
        super(title, description, undefined);
    }

    validate(
        input: string
    ): ValidatorResult {

        return [
            input.trim().length > 0,
            this.getDescription()
        ];
    }

}