import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as CoreObservable from "@/core_observable";


export class ClLanguageApp {

    private static _fallback =
        CoreLanguage.Definition.En;

    static setLanguage(language: CoreLanguage.Type.Var.TVLanguageDefinition): void {
        CoreConfig.Class.ClConfigApp.state(CoreConfig.State.Language).set(language);
        CoreConfig.Class.ClConfigApp.state(CoreConfig.State.DirectionRtl).set(language.directionRtl);
    }


    static translate(
        key: string,
        params: Record<string, any> = {}
    ): CoreObservable.Observable<string> {

        return CoreConfig.Class.ClConfigApp
            .state(CoreConfig.State.Language)
            .observable()
            .map((lang: CoreLanguage.Type.Var.TVLanguageDefinition) => {

                const dictionary =
                    this._getDictionary(lang.code);

                const fallback =
                    this._getDictionary(
                        this._fallback.code
                    );

                const text =
                    this._resolve(
                        dictionary,
                        key
                    )
                    ??
                    this._resolve(
                        fallback,
                        key
                    )
                    ??
                    key;

                return this._template(
                    text,
                    params
                );
            });
    }


    private static _getDictionary(
        code: string
    ): any {

        return (
            CoreLanguage.Directory as any
        )[code];
    }


    private static _resolve(
        object: any,
        path: string
    ): any {

        return path
            .split(".")
            .reduce(
                (value, key) =>
                    value?.[key],
                object
            );
    }


    private static _template(
        text: string,
        params: Record<string, any>
    ): string {

        return text.replace(
            /\{\{(.*?)\}\}/g,
            (_, key) => {

                const value =
                    params[key.trim()];

                return value ?? "";
            }
        );
    }
}