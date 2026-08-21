import * as UtilValidator from "@/util_validators"

export class ClValidator {

    static validate(
        input: string,
        rules: UtilValidator.Abstract.ValidatorRule[]
    ): UtilValidator.Types.ValidatorResult[] {

        if (typeof input !== 'string') {
            throw new Error('Input must be a string');
        }

        return rules.map(
            rule => rule.validate(input)
        );
    }
}