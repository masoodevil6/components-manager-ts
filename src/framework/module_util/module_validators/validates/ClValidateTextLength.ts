///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";
import {Keys}                                         from "../language/keys";
import type {ValidatorDescription}                  from "../abstract/AbstractValidatorRule";

type ValidatorTextLengthParams = {
    min: number;
};

export class ClValidateTextLength
    extends ValidatorRule<ValidatorTextLengthParams> {

    constructor(
        title:       ValidatorDescription = Keys.textLength.title,
        description: ValidatorDescription = Keys.textLength.description,
        min: number = 8
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

        return [
            input.length >= this.params.min,
            this.getDescription()
        ];
    }

}