import {ComponentExample} from "@/core_components";
import {DefaultExample} from "./Default";
import {WithIconAndButtonExample} from "./WithIconAndButton";
import {WithIconExample} from "./WithIcon";
import {WithButtonExample} from "./WithButton";

export const Examples = {
    DEFAULT: DefaultExample,
    WITH_ICON_AND_BUTTON: WithIconAndButtonExample,
    WITH_ICON: WithIconExample,
    WITH_BUTTON: WithButtonExample,
} satisfies Record<string, ComponentExample>;
export type ComponentInputSelectOptionExamplesType = typeof Examples;
