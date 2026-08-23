
// --------------------------------
import {Interface_ComponentProp as PropInterface}     from "../../tools/prop/Interface_ComponentProp";
import {Type_ComponentProp      as PropType}          from "../../tools/prop/Type_ComponentProp";


export function Define_ComponentProp<TPropTypes>(patterns: { [K in PropType<TPropTypes>]: PropInterface<TPropTypes[K]> } ) : { [K in PropType<TPropTypes>]: PropInterface<TPropTypes[K]> } {
    return patterns;
}