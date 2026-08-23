///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";

type ValidatorTextLengthParams = {
    min: number;
};

export class ClValidateTextLength
    extends ValidatorRule<ValidatorTextLengthParams> {

    constructor(
        description: string,
        min: number = 8
    ) {
        super(
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