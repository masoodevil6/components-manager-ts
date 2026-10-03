import * as CoreComponents from "@/core_components";
import {DefaultExample} from "./Default";
import {WithBoundsExample} from "./WithBounds";
import {WithIconExample} from "./WithIcon";
import {WithValidationExample} from "./WithValidation";

export const Examples = {Default: DefaultExample, WithBounds: WithBoundsExample, WithIcon: WithIconExample, WithValidation: WithValidationExample} satisfies Record<string, CoreComponents.ComponentExample>;
