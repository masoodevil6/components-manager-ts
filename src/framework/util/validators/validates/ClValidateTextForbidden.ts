import * as UtilValidators from "@/util_validators"

type ValidatorTextForbiddenParams = {
    chars: string[];
};

export class ClValidateTextForbidden
    extends UtilValidators.Abstract.ValidatorRule<ValidatorTextForbiddenParams> {

    constructor(
        description: string,
        chars: string[] = []
    ) {
        super(
            description,
            { chars }
        );
    }

    validate(
        input: string
    ): UtilValidators.Types.ValidatorResult {

        const escaped = this.params.chars
            .map(
                char => char.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                )
            )
            .join("");

        const regex = new RegExp(
            `^[a-zA-Z0-9${escaped}]*$`
        );

        return [
            regex.test(input),
            this.getDescription()
        ];
    }

}