import * as UtilValidators from "@/util_validators"

type ValidatorTextLengthParams = {
    min: number;
};

export class ClValidateTextLength
    extends UtilValidators.Abstract.ValidatorRule<ValidatorTextLengthParams> {

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
    ): UtilValidators.Types.ValidatorResult {

        return [
            input.length >= this.params.min,
            this.getDescription()
        ];
    }

}