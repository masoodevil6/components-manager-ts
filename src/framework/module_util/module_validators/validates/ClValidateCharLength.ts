///------------------------------

import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";

type ValidatorCharLengthParams = {
    min: number;
};

export class ClValidateCharLength
    extends ValidatorRule<ValidatorCharLengthParams> {

    constructor(
        description: string,
        min: number = 4
    ) {
        super(
            description,
            { min }
        );
    }

    validate(
        input: string
    ): ValidatorResult {

        const count = input
            .split("")
            .filter(
                char => !/\d/.test(char)
            )
            .length;

        return [
            count >= this.params.min,
            this.getDescription()
        ];
    }

}