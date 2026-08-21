import * as UtilValidators from "@/util_validators"

export class ClValidateNumLength
    extends UtilValidators.Abstract.ValidatorRule {

    constructor(
        description: string
    ) {
        super(description, undefined);
    }

    validate(
        input: string
    ): UtilValidators.Types.ValidatorResult {

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return [
            emailRegex.test(input.trim()),
            this.getDescription()
        ];
    }

}