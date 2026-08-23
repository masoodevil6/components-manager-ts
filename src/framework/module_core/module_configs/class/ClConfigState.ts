import * as CoreObservable                            from "@/core_observable";
///------------------------------
import {IConfigState as ConfigState}                  from "../interface/IConfigState";

export class ClConfigState<T>
    implements ConfigState<T> {

    protected _state: CoreObservable.App<T>;

    constructor(value : T) {
        this._state = new CoreObservable.App(value);
    }

    observable(): CoreObservable.App<T> {
        return this._state;
    }

    get(): T {
        return this.observable().get();
    }

    set(value: T): void {
        this.observable().set(value);
    }

}