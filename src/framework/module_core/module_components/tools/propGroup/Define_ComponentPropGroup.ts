import type {Interface_ComponentPropGroup} from "./Interface_ComponentPropGroup";
import type {Type_ComponentPropGroup} from "./Type_ComponentPropGroup";

export function Define_ComponentPropGroup<TPropGroups>(
    groups: {[K in Type_ComponentPropGroup<TPropGroups>]: Interface_ComponentPropGroup},
): {[K in Type_ComponentPropGroup<TPropGroups>]: Interface_ComponentPropGroup} {
    return groups;
}
