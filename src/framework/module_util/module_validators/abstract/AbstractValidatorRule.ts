import * as UtilValidator from "@/util_validators";
import * as UtilTools from "@/util_tools";

export abstract class AbstractValidatorRule<TParams = void> {

    constructor(
        public readonly description: string,
        public readonly params: TParams
    ) {}

    abstract validate(input: string): UtilValidator.Types.ValidatorResult;


    protected getDescription(): string {

        return UtilTools.Methods.Replace.TextWithPattern(
            this.description,
            this.params as Record<string, unknown>
        );
    }
}