import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {EffectiveMode} from "../Props";
import {Keys} from "../../../../module_categories/languages";

export const SeparateShowHideModesExample: ComponentExample = {
    id: "effective_separate_show_hide_modes",
    name: Keys.category.components.effective.examples.separateShowHideModes.name,
    description: Keys.category.components.effective.examples.separateShowHideModes.description,
    render(): HTMLElement {
        const effective = UiCategory.UI.Effects.Effective({
            prop_isVisible: true,
            prop_showMode: EffectiveMode.SCALE,
            prop_hideMode: EffectiveMode.SLIDE,
            prop_showDuration: 280,
            prop_hideDuration: 220,
            prop_content: "The parent controls this panel's visibility and border appearance.",
            prop_borderClass: ["shadow-sm", "position-relative", "p-3"],
            prop_borderColor: "var(--secondaryColor1)",
            prop_contentBackgroundColor: "var(--shanColor1)",
            prop_width: "100%",
        });
        const toggle = UiCategory.UI.Simples.Button({
            prop_btnTitle: "Toggle visibility",
            prop_btnClass: ["mb-2"],
        }, {
            CLICK: () => effective.set("prop_isVisible", !effective.get("prop_isVisible")),
        });

        const container = document.createElement("div");
        container.append(toggle.getElement() as HTMLElement, effective.getElement() as HTMLElement);
        return container;
    },
};
