import * as CoreComponents from "@/core_components";
import {DefaultExample} from "./Default";
import {WithValidationExample} from "./WithValidation";

export const Examples = {Default: DefaultExample, WithValidation: WithValidationExample} satisfies Record<string, CoreComponents.ComponentExample>;
