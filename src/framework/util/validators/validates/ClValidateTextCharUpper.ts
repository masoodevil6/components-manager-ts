import * as UtilValidators from "@/util_validators"

type ValidatorTextCharUpperParams = {
    min: number;
};

export class ClValidateTextCharUpper
    extends UtilValidators.Abstract.ValidatorRule<ValidatorTextCharUpperParams> {

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
    ): UtilValidators.Types.ValidatorResult {

        const regex = new RegExp(
            `(?:.*[A-Z]){${this.params.min},}`
        );

        return [
            regex.test(input),
            this.getDescription()
        ];
    }

}