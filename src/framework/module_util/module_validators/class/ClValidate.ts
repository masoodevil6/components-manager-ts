
///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";

export class ClValidator {

    static validate(
        input: string,
        rules: ValidatorRule[]
    ): ValidatorResult[] {

        if (typeof input !== 'string') {
            throw new Error('Input must be a string');
        }

        return rules.map(
            rule => rule.validate(input)
        );
    }
}