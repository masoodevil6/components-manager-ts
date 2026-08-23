///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";


type ValidatorTextForbiddenParams = {
    chars: string[];
};

export class ClValidateTextForbidden
    extends ValidatorRule<ValidatorTextForbiddenParams> {

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
    ): ValidatorResult {

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