import * as CoreComponents from "@/core_components";
import {DefaultExample} from "./Default";
import {DisabledExample} from "./Disabled";
import {WithValidationExample} from "./WithValidation";

export const Examples = {
    Default: DefaultExample,
    Disabled: DisabledExample,
    WithValidation: WithValidationExample,
} satisfies Record<string, CoreComponents.ComponentExample>;
