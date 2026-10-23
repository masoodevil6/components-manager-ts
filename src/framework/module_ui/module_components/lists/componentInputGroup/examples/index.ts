import * as CoreComponents from "@/core_components";
import { Default } from "./Default";

export const Examples = {
  Default,
} satisfies Record<string, CoreComponents.ComponentExample>;

export type ComponentInputGroupExamplesType = typeof Examples;
