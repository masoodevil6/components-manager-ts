import * as UtilValidators from "@/util_validators"

type ValidatorCharLengthParams = {
    min: number;
};

export class ClValidateCharLength
    extends UtilValidators.Abstract.ValidatorRule<ValidatorCharLengthParams> {

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
    ): UtilValidators.Types.ValidatorResult {

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