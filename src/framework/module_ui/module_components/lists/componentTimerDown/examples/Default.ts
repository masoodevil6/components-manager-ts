import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "timer_down_default",
    name: Keys.category.components.timerDown.examples.default.name,
    description: Keys.category.components.timerDown.examples.default.description,
    render: (): HTMLElement => {
        const timer = UiCategory.UI.Contents.TimerDown(
            { prop_description: "Request a new code when the timer finishes." },
            { CLICK_RETRY: () => timer.call_startCountdown(Date.now() + 60_000) },
        );
        timer.call_startCountdown(Date.now() + 60_000);
        return timer.getElement() as HTMLElement;
    },
};
