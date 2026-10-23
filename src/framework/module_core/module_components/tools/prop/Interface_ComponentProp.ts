import * as UtilBrands         from "@/util_brands";
import type {ComponentConstructor} from "../../basic/manager/ComponentManager";
import type {Interface_ComponentPropGroup} from "../propGroup/Interface_ComponentPropGroup";
import type {Interface_ComponentRender} from "@/util_tools";
// --------------------------------

export interface Interface_ComponentProp<
    TPropTypes,
    TPropGroups extends Record<string, Interface_ComponentPropGroup> = Record<string, Interface_ComponentPropGroup>,
> extends Partial<Interface_ComponentRender<ComponentConstructor>> {
    prop:                      string;
    default:                   TPropTypes;
    value?:                    null;
    hasMultiTemplate?:         boolean;
    name?:                     UtilBrands.TranslationKey ,                    //CoreObservable.App<string> ,
    description?:              UtilBrands.TranslationKey ,                    //CoreObservable.App<string> ,
    OptionShow?:               boolean;                                       /// Settings UI should treat an omitted value as false.
    OptionGroup?:              TPropGroups[keyof TPropGroups] | null;         /// Group descriptor for this property; null or omitted means the default group.
}
