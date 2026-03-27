
import {Observable} from "./Observable";
import {SIZES} from "../utils/ToolsConsts";
import {fa} from "../langs/Fa";

export class AppConfig {
    static _state = {
        directionRtl:      false,
        language:          "fa",
        sizeNameSmall:     SIZES.S,
        sizeName:          SIZES.M,
        sizeNameLarge:     SIZES.L,
        //font:       "IRANSans"
    };

    static _subscribers = new Map();

    static get(key) {
        return this._state[key];
    }

    static set(key, value) {
        if (this._state[key] === value) return;

        this._state[key] = value;
        this._notify(key, value);
    }

    static subscribe(key, callback) {
        if (!this._subscribers.has(key)) {
            this._subscribers.set(key, new Set());
        }

        this._subscribers.get(key).add(callback);

        return () => {
            this._subscribers.get(key).delete(callback);
        };
    }

    static _notify(key, value) {
        if (!this._subscribers.has(key)) return;

        this._subscribers
            .get(key)
            .forEach(fn => fn(value));
    }



    //// for Observable
    static observable(key) {
        const obs = new Observable(this.get(key));

        this.subscribe(key, v => {
            obs.set(v);
        });

        return obs;
    }



    //// for colors
    static color = {
        get(name){
            return getComputedStyle(document.documentElement)
                .getPropertyValue(`--${name}`)
                .trim();
        },

        set(name,value){
            document.documentElement
                .style
                .setProperty(`--${name}`,value);
        }
    }

}