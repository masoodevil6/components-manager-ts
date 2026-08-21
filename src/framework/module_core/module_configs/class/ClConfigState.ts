import * as CoreConfig from "@/core_configs";
import * as CoreObservable from "@/core_observable";
///------------------------------

export class ClConfigState<T>
    implements CoreConfig.Interface.IConfigState<T> {

    protected _state: CoreObservable.Observable<T>;

    constructor(value : T) {
        this._state = new CoreObservable.Observable(value);
    }

    observable(): CoreObservable.Observable<T> {
        return this._state;
    }

    get(): T {
        return this.observable().get();
    }

    set(value: T): void {
        this.observable().set(value);
    }

}