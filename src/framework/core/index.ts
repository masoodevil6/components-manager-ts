import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";




//----------------------------
// Config
//----------------------------
// Config.Service
//     .state(CoreConfig.State.Language)
//     .set(language.code);

export const Config = {
    Service: CoreConfig.Class.ClConfigApp,
    state:   CoreConfig.State,
}



//----------------------------
// Language
//----------------------------
//Language.Service.translate("welcome");

export const Language = {
    Service:     CoreLanguage.CLass.ClLanguageApp,
}



//----------------------------
// Observable
//----------------------------
// const example = new Observable.Service("Hello World")

export const Observable = {
    Service:      CoreObservable.Observable,
    Scope:        CoreObservable.Scope,
}



//----------------------------
// CoreReactive
//----------------------------
// Reactive.Service.section({...})

export const Reactive = {
    Service:      CoreReactive.ReactiveElement,
}



