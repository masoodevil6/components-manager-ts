import * as CoreObservable from "@/core_observable";
import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "effect_change_default",
    name: Keys.category.components.effectChange.examples.default.name,
    description: Keys.category.components.effectChange.examples.default.description,
    render(): HTMLElement {
        const content = new CoreObservable.App("First content");
        const effect = UiCategory.UI.Effects.EffectChange({
            prop_content: content,
            prop_mode: "fade" as any,
            prop_duration: 350,
        });
        let next = false;
        const button = UiCategory.UI.Simples.Button({prop_btnTitle: "Change content", prop_btnClass: ["mb-2"]}, {
            CLICK: () => {
                next = !next;
                content.set(next ? "Second content" : "First content");
            },
        });
        const container = document.createElement("div");
        container.append(button.getElement() as HTMLElement, effect.getElement() as HTMLElement);
        return container;
    },
};
