///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";
import {Keys}                                         from "../language/keys";
import type {ValidatorDescription}                  from "../abstract/AbstractValidatorRule";

type ValidatorTextCharUpperParams = {
    min: number;
};

export class ClValidateTextCharUpper
    extends ValidatorRule<ValidatorTextCharUpperParams> {

    constructor(
        title:       ValidatorDescription = Keys.textCharUpper.title,
        description: ValidatorDescription = Keys.textCharUpper.description,
        min: number = 1
    ) {
        super(
            title,
            description,
            { min }
        );
    }

    validate(
        input: string
    ): ValidatorResult {

        const regex = new RegExp(
            `(?:.*[A-Z]){${this.params.min},}`
        );

        return [
            regex.test(input),
            this.getDescription()
        ];
    }

}