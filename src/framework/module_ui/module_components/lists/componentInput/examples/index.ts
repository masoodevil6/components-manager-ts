import * as CoreComponents from "@/core_components";
import {DefaultExample} from "./Default";
import {WithIconExample} from "./WithIcon";
import {WithAddButtonExample} from "./WithAddButton";
import {WithValidationExample} from "./WithValidation";

export const Examples = {
    Default: DefaultExample,
    WithIcon: WithIconExample,
    WithAddButton: WithAddButtonExample,
    WithValidation: WithValidationExample,
} satisfies Record<string, CoreComponents.ComponentExample>;
