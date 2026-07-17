
import {Observable} from "./Observable";
import {SIZES} from "../utils/ToolsConsts";
import {fa} from "../langs/Fa";

export class AppConfig {
    // static _state = {
    //     directionRtl:      false,
    //     language:          "en",
    //     sizeNameSmall:     SIZES.S,
    //     sizeName:          SIZES.M,
    //     sizeNameLarge:     SIZES.L,
    //     stdHeight:         25,
    //
    // };

    static _state = {
        directionRtl:  new Observable(false),
        language:      new Observable("en"),
        sizeNameSmall: new Observable(SIZES.S),
        sizeName:      new Observable(SIZES.M),
        sizeNameLarge: new Observable(SIZES.L),
        stdHeight:     new Observable(25),
        //font:        new Observable("IRANSans"),
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