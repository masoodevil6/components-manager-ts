import * as CoreObservable from "@/core_observable"

export type TObservableValue<T> =
    T | CoreObservable.App<T>;