import * as UtilTools                            from "@/util_tools";
import * as UtilBrands                          from "@/util_brands";
import * as CoreLanguage                        from "@/core_languages";
import * as CoreConfig                          from "@/core_configs";
///------------------------------
import {TValidatorResult as ValidatorResult}     from "../types/TValidatorResult";

export type ValidatorDescription =
    | string
    | UtilBrands.TranslationKey
    | Record<string, string>;

function resolveDescription(desc: ValidatorDescription): string {
    if (typeof desc === "string") {
        return desc;
    } else if (typeof desc === "symbol") {
        return CoreLanguage.App.translate(desc).get();
    } else {
        const langCode = CoreConfig.Settings.Language.get()?.code;
        const fallbackCode = CoreLanguage.FallbackLanguage.code;
        return desc[langCode]
            ?? desc[fallbackCode]
            ?? Object.values(desc)[0]
            ?? "";
    }
}

export abstract class AbstractValidatorRule<TParams = void> {

    constructor(
        public readonly title:       ValidatorDescription,
        public readonly description: ValidatorDescription,
        public readonly params: TParams
    ) {}

    abstract validate(input: string): ValidatorResult;


    public getTitle(): string {
        return UtilTools.Replace.TextWithPattern(
            resolveDescription(this.title),
            this.params as Record<string, unknown>
        );
    }

    protected getDescription(): string {
        return UtilTools.Replace.TextWithPattern(
            resolveDescription(this.description),
            this.params as Record<string, unknown>
        );
    }
}