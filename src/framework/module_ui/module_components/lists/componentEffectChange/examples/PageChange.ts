import * as CoreObservable from "@/core_observable";
import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {EffectChangeDirection, EffectChangeMode} from "../Props";
import {Keys} from "../../../../module_categories/languages";

export const PageChangeExample: ComponentExample = {
    id: "effect_change_page_change",
    name: Keys.category.components.effectChange.examples.pageChange.name,
    description: Keys.category.components.effectChange.examples.pageChange.description,
    render(): HTMLElement {
        const pages = ["Overview", "Settings", "Profile"];
        const pageIndex = new CoreObservable.App(0);
        const pageContent = pageIndex.map((index) => `${pages[index]} page`, undefined);
        const effect = UiCategory.UI.Effects.EffectChange({
            prop_content: pageContent,
            prop_mode: EffectChangeMode.SLIDE,
            prop_changeDirection: EffectChangeDirection.FORWARD,
            prop_duration: 300,
        });
        const previous = UiCategory.UI.Simples.Button({prop_btnTitle: "Previous", prop_btnClass: ["me-2"]}, {
            CLICK: () => pageIndex.set((pageIndex.get() - 1 + pages.length) % pages.length),
        });
        const next = UiCategory.UI.Simples.Button({prop_btnTitle: "Next"}, {
            CLICK: () => pageIndex.set((pageIndex.get() + 1) % pages.length),
        });
        const controls = document.createElement("div");
        controls.className = "mb-2";
        controls.append(previous.getElement() as HTMLElement, next.getElement() as HTMLElement);
        const container = document.createElement("div");
        container.append(controls, effect.getElement());
        return container;
    },
};
