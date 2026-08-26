import * as CoreObservable  from "@/core_observable";
/// ----------------------------------------
import {IconVariant}        from "../enums"


export interface IIconOptions {

    size?:           CoreObservable.TObservableValue<string>;

    primaryColor?:   CoreObservable.TObservableValue<string>;

    secondaryColor?: CoreObservable.TObservableValue<string>;

    strokeWidth?:    CoreObservable.TObservableValue<number>;

    variant?:        CoreObservable.TObservableValue<IconVariant>;

}