import * as CoreObservable from "@/core_observable";

export interface IConfigState<T> {

    observable(): CoreObservable.Class.Observable<T>;
    get(): T ;
    set(value: T): void;

}

