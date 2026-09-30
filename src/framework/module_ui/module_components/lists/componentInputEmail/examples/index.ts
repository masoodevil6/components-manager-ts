import * as CoreComponents from "@/core_components";
import {DefaultExample} from "./Default";
import {ValidationExample} from "./Validation";

export const Examples = {Default: DefaultExample, Validation: ValidationExample} satisfies Record<string, CoreComponents.ComponentExample>;
