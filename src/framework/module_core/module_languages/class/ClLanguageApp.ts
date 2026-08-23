import * as CoreConfig                                  from "@/core_configs";
import * as CoreObservable                              from "@/core_observable";
///------------------------------
import * as Directory                                   from "../directory";
import {DefEn as En}                                    from "../definition/DefEn";
import {TVLanguageDefinition as LanguageDefinition}     from "../type/var/TVLanguageDefinition";


export class ClLanguageApp {

    private static _fallback = En;

    static setLanguage(language: LanguageDefinition): void {
        CoreConfig.App.state(CoreConfig.States.Language).set(language);
        CoreConfig.App.state(CoreConfig.States.DirectionRtl).set(language.directionRtl);
    }


    static translate(
        key: string,
        params: Record<string, any> = {}
    ): CoreObservable.App<string> {

        return CoreConfig.App.state(CoreConfig.States.Language)
            .observable()
            .map((lang: LanguageDefinition) => {

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
            Directory as any
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