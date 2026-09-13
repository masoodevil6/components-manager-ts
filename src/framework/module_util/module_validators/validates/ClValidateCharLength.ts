///------------------------------

import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";
import {Keys}                                         from "../language/keys";
import type {ValidatorDescription}                  from "../abstract/AbstractValidatorRule";

type ValidatorCharLengthParams = {
    min: number;
};

export class ClValidateCharLength
    extends ValidatorRule<ValidatorCharLengthParams> {

    constructor(
        title:       ValidatorDescription = Keys.charLength.title,
        description: ValidatorDescription = Keys.charLength.description,
        min: number = 4
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