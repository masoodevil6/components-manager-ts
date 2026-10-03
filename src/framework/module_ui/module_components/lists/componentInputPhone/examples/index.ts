import * as CoreComponents from "@/core_components";
import {DefaultExample} from "./Default";
import {WithoutLocationSelectorsExample} from "./WithoutLocationSelectors";

export const Examples = {Default: DefaultExample, WithoutLocationSelectors: WithoutLocationSelectorsExample} satisfies Record<string, CoreComponents.ComponentExample>;
