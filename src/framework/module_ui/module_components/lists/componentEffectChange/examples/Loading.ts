import * as CoreObservable from "@/core_observable";
import * as CoreLanguage from "@/core_languages";
import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {EffectChangeMode} from "../Props";
import {Keys} from "../../../../module_categories/languages";

export const LoadingExample: ComponentExample = {
    id: "effect_change_loading",
    name: Keys.category.components.effectChange.examples.loading.name,
    description: Keys.category.components.effectChange.examples.loading.description,
    render(): HTMLElement {
        const content = new CoreObservable.App("Ready to load content.");
        const mode = new CoreObservable.App(EffectChangeMode.FADE);
        const effect = UiCategory.UI.Effects.EffectChange({
            prop_content: content,
            prop_mode: mode,
        });

        let loadCount = 0;
        const startButton = UiCategory.UI.Simples.Button({
            prop_btnTitle: CoreLanguage.App.translate(Keys.category.components.effectChange.examples.loading.start) as any,
            prop_btnClass: ["me-2"],
        }, {
            CLICK: () => {
                mode.set(EffectChangeMode.LOADING);
            },
        });
        const finishButton = UiCategory.UI.Simples.Button({
            prop_btnTitle: CoreLanguage.App.translate(Keys.category.components.effectChange.examples.loading.finish) as any,
        }, {
            CLICK: () => {
                mode.set(EffectChangeMode.FADE);
                content.set(`Loaded content ${++loadCount}`);
            },
        });

        const container = document.createElement("div");
        container.append(
            startButton.getElement() as HTMLElement,
            finishButton.getElement() as HTMLElement,
            effect.getElement() as HTMLElement,
        );
        return container;
    },
};
