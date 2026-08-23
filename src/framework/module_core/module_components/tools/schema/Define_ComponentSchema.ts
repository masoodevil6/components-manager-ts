
// --------------------------------
import {Interface_ComponentSchema as SchemaInterface}     from "../../tools/schema/Interface_ComponentSchema";
import {Type_ComponentSchema      as SchemaType}          from "../../tools/schema/Type_ComponentSchema";

export function Define_ComponentSchema<TSchema , TPropTypes>(props: { [K in  SchemaType<TSchema>]: SchemaInterface<TSchema[K] , TPropTypes> }) :  { [K in  SchemaType<TSchema>]: SchemaInterface<TSchema[K] , TPropTypes> } {
    return props ;
}