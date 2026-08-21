import * as UtilValidator from "@/util_validators";
import * as UtilPublics from "@/util_publics";

export abstract class AbstractValidatorRule<TParams = void> {

    constructor(
        public readonly description: string,
        public readonly params: TParams
    ) {}

    abstract validate(input: string): UtilValidator.Types.ValidatorResult;


    protected getDescription(): string {

        return UtilPublics.Methods.Replace.TextWithPattern(
            this.description,
            this.params as Record<string, unknown>
        );
    }
}