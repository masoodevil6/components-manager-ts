import * as CoreComponent from "../../index";

export function Define_ComponentSchema<TSchema , TPropTypes>(props: { [K in  CoreComponent.Tools.Schema.Type<TSchema>]: CoreComponent.Tools.Schema.Interface<TSchema[K] , TPropTypes> }) :  { [K in  CoreComponent.Tools.Schema.Type<TSchema>]: CoreComponent.Tools.Schema.Interface<TSchema[K] , TPropTypes> } {
    return props ;
}