///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";

export class ClValidateIsEmail
    extends ValidatorRule {

    constructor(
        description: string
    ) {
        super(description, undefined);
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