///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";

type ValidatorTextCharUpperParams = {
    min: number;
};

export class ClValidateTextCharUpper
    extends ValidatorRule<ValidatorTextCharUpperParams> {

    constructor(
        description: string,
        min: number = 1
    ) {
        super(
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