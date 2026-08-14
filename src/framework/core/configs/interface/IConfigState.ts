import * as CoreObservable from "@/core_observable";

export interface IConfigState<T> {

    observable(): CoreObservable.Observable<T>;
    get(): T ;
    set(value: T): void;

}
