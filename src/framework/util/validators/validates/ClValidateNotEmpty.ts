import * as UtilValidators from "@/util_validators"

export class ClValidateNotEmpty
    extends UtilValidators.Abstract.ValidatorRule {

    constructor(
        description: string
    ) {
        super(description, undefined);
    }

    validate(
        input: string
    ): UtilValidators.Types.ValidatorResult {

        return [
            input.trim().length > 0,
            this.getDescription()
        ];
    }

}