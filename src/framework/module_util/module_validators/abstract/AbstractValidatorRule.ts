import * as UtilTools                            from "@/util_tools";
///------------------------------
import {TValidatorResult as ValidatorResult}     from "../types/TValidatorResult";

export abstract class AbstractValidatorRule<TParams = void> {

    constructor(
        public readonly description: string,
        public readonly params: TParams
    ) {}

    abstract validate(input: string): ValidatorResult;


    protected getDescription(): string {

        return UtilTools.Replace.TextWithPattern(
            this.description,
            this.params as Record<string, unknown>
        );
    }
}