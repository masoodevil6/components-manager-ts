///------------------------------
import {AbstractValidatorRule as ValidatorRule}     from "../abstract/AbstractValidatorRule";
import {TValidatorResult      as ValidatorResult}   from "../types/TValidatorResult";
import {Keys}                                         from "../language/keys";
import type {ValidatorDescription}                  from "../abstract/AbstractValidatorRule";


type ValidatorTextForbiddenParams = {
    chars: string[];
};

export class ClValidateTextForbidden
    extends ValidatorRule<ValidatorTextForbiddenParams> {

    constructor(
        title:       ValidatorDescription = Keys.textForbidden.title,
        description: ValidatorDescription = Keys.textForbidden.description,
        chars: string[] = []
    ) {
        super(
            title,
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