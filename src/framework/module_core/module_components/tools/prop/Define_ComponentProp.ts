
// --------------------------------
import {Interface_ComponentProp as PropInterface}     from "../../tools/prop/Interface_ComponentProp";
import {Type_ComponentProp      as PropType}          from "../../tools/prop/Type_ComponentProp";


// Overload 1: existing whole-object API (MUST be first for `as any` compatibility)
export function Define_ComponentProp<TPropTypes>(patterns: { [K in PropType<TPropTypes>]: PropInterface<TPropTypes[K]> } ) : { [K in PropType<TPropTypes>]: PropInterface<TPropTypes[K]> };
// Overload 2: new per-entry API (second, for explicit single-entry calls)
export function Define_ComponentProp<T>(entry: PropInterface<T>): PropInterface<T>;
// Implementation
export function Define_ComponentProp(entry: any): any {
    return entry;
}