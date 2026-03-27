import {fa} from "../langs/Fa"
import {en} from "../langs/En"

import {AppConfig} from "./AppConfig";
import {Observable} from "./Observable";


type LangMeta = {
    code: string
    name: string
    rtl: boolean
}

type LangDict = Record<string, any>

export class Language {

    static languages: LangMeta[] = [
        { code: "fa", name: "فارسی", rtl: true },
        { code: "en", name: "English", rtl: false }
    ]

    static _fallbackLanguage: string = "en"

    static _dict: LangDict = {
        fa , en
    }

    static async setLanguage(lang: string): Promise<void> {

        const meta = this.languages.find(l => l.code === lang)
        if (!meta) return

        AppConfig.set("language", lang)
        AppConfig.set("directionRtl", meta.rtl)
    }

    private static _resolve(obj: any, path: string): any {
        return path.split(".").reduce((o, k) => o?.[k], obj)
    }

    private static _template(
        text: string,
        params: Record<string, any>
    ): string {

        return text.replace(/\{\{(.*?)\}\}/g, (_, k) => {
            const key = k.trim()
            return params[key] ?? ""
        })
    }

    static translate(
        key: string,
        params: Record<string, any> = {}
    ): Observable<string> {

        return AppConfig
            .observable("language")
            .map(lang => {

                const text =
                    this._resolve(this._dict[lang], key)
                    ?? this._resolve(this._dict[this._fallbackLanguage], key)
                    ?? key

                //console.log(text)

                return this._template(text, params)
            })
    }
}