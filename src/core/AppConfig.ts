
import {Observable} from "./Observable";
import {SIZES} from "../utils/ToolsConsts";
import {fa} from "../langs/Fa";

export class AppConfig {

    static _DIRECTION_RTL= {
        name: "directionRtl" ,
        value: false
    };
    static _LANGUAGE= {
        name: "language" ,
        value: "en"
    };
    static _SIZE_NAME= {
        name: "sizeName" ,
        value: SIZES.M
    };
    static _FONT_NAME= {
        name: "font" ,
        value: "IRANSans"
    };


    static _state = {
        [this._DIRECTION_RTL.name]:  new Observable(this._DIRECTION_RTL.value),
        [this._LANGUAGE.name]:       new Observable(this._LANGUAGE.value),
        [this._SIZE_NAME.name]:      new Observable(this._SIZE_NAME.value),
        [this._FONT_NAME.name]:      new Observable(this._FONT_NAME.value),

        sizeNameSmall: new Observable(SIZES.S),
        sizeNameLarge: new Observable(SIZES.L),
        stdHeight:     new Observable(25),
    };

    static get(key) {
        return this._state[key].get();
    }

    static set(key, value) {
        this._state[key].set(value);
    }

    static observable(key) : Observable<any> {
        return this._state[key];
    }



    static get_directionRtl() : Observable<any> {
        return this.observable(this._DIRECTION_RTL.name);
    }
    static get_language() : Observable<any> {
        return this.observable(this._LANGUAGE.name);
    }
    static get_sizeName() : Observable<any> {
        return this.observable(this._SIZE_NAME.name);
    }
    static get_fontName() : Observable<any> {
        return this.observable(this._FONT_NAME.name);
    }


    //static _subscribers = new Map();

    // static get<K extends keyof typeof AppConfig._state>(key: K, defaultValue: typeof AppConfig._state[K] = null as any) {
    //     return this._state?.[key] ?? defaultValue;
    // }
    //
    // static set<K extends keyof typeof AppConfig._state>(key: K, value: typeof AppConfig._state[K]) {
    //     if (this._state[key] === value) return;
    //
    //     this._state[key] = value;
    //     this._notify(key, value);
    // }

    // static subscribe(key: keyof typeof AppConfig._state, callback: (value: any) => void) {
    //     if (!this._subscribers.has(key)) {
    //         this._subscribers.set(key, new Set());
    //     }
    //
    //     this._subscribers.get(key)!.add(callback);
    //
    //     return () => {
    //         this._subscribers.get(key)!.delete(callback);
    //     };
    // }
    //
    // static _notify(key: keyof typeof AppConfig._state, value: any) {
    //     if (!this._subscribers.has(key)) return;
    //
    //     this._subscribers
    //         .get(key)!
    //         .forEach((fn: (value: any) => void) => fn(value));
    // }



    //// for Observable
    // static observable<K extends keyof typeof AppConfig._state>(key: K) {
    //     const obs = new Observable(this.get(key));
    //
    //     this.subscribe(key, v => {
    //         obs.set(v);
    //     });
    //
    //     return obs;
    // }



    //// for colors
    static color = {
        get(name: string){
            return getComputedStyle(document.documentElement)
                .getPropertyValue(`--${name}`)
                .trim();
        },

        set(name: string, value: string){
            document.documentElement
                .style
                .setProperty(`--${name}`,value);
        }
    }

}