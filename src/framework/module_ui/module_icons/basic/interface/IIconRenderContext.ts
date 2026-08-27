import * as CoreObservable  from "@/core_observable";
/// ----------------------------------------
import {IconVariant}        from "../enums"


export interface IIconRenderContext {

    scope?:          CoreObservable.Scope;

    sizeName:        CoreObservable.TObservableValue<number | string>;

    primaryColor:    CoreObservable.TObservableValue<string>;

    secondaryColor:  CoreObservable.TObservableValue<string>;

    strokeWidth:     CoreObservable.TObservableValue<number>;

    variant:         CoreObservable.TObservableValue<IconVariant>;

}
