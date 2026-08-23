///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";

export class ClValidateNotEmpty
    extends ValidatorRule {

    constructor(
        description: string
    ) {
        super(description, undefined);
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