import * as Core from "@/core";
import * as CoreConfig from "@/core_configs";
import * as CoreObservable from "@/core_observable";
import * as UtilBrands  from "@/util_brands";


type TLanguageDictionary = Map<UtilBrands.TranslationKey, string>;
type TLanguageDirectory = Record<string, TLanguageDictionary>;

export class ClLanguageApp {

    private static _directory:
        TLanguageDirectory = {};

    private static _fallback:
        Core.Language.Types.LanguageDefinition;


    static initialize(
        directory: TLanguageDirectory,
        fallback: Core.Language.Types.LanguageDefinition
    ): void {

        this._directory =
            directory;

        this._fallback =
            fallback;
    }


    static setLanguage(
        language: Core.Language.Types.LanguageDefinition
    ): void {

        CoreConfig.App
            .state(
                CoreConfig.States.Language
            )
            .set(language);

        CoreConfig.App
            .state(
                CoreConfig.States.DirectionRtl
            )
            .set(language.directionRtl);
    }


    static translate(
        key:    UtilBrands.TranslationKey,
        params: Record<string, unknown> = {}
    ): CoreObservable.App<string> {

        return CoreConfig.App
            .state(
                CoreConfig.States.Language
            )
            .observable()
            .map(
                (lang: Core.Language.Types.LanguageDefinition) => {

                    const dictionary =
                        this._directory[
                            lang?.code
                            ];

                    const fallback =
                        this._directory[
                            this._fallback?.code
                            ];

                    const text =
                        dictionary?.get(key)
                        ??
                        fallback?.get(key)
                        ??
                        "";

                    return this._template(
                        text,
                        params
                    );
                }
            );
    }


    private static _template(
        text: string,
        params: Record<string, unknown>
    ): string {

        return text.replace(
            /\{\{(.*?)\}\}/g,
            (_, key: string) => {

                const value =
                    params[key.trim()];

                return value == null
                    ? ""
                    : String(value);
            }
        );
    }
}