import * as CoreObservable from "@/core_observable";
import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {EffectChangeDirection, EffectChangeMode} from "../Props";
import {Keys} from "../../../../module_categories/languages";

export const SliderExample: ComponentExample = {
    id: "effect_change_slider",
    name: Keys.category.components.effectChange.examples.slider.name,
    description: Keys.category.components.effectChange.examples.slider.description,
    render(): HTMLElement {
        const slides = ["Slide 1", "Slide 2", "Slide 3"];
        const index = new CoreObservable.App(0);
        const direction = new CoreObservable.App(EffectChangeDirection.FORWARD);
        const content = index.map((value) => slides[value]);
        const effect = UiCategory.UI.Effects.EffectChange({
            prop_content: content,
            prop_mode: EffectChangeMode.SLIDE,
            prop_changeDirection: direction,
            prop_duration: 400,
        });
        const previous = UiCategory.UI.Simples.Button({prop_btnTitle: "Previous", prop_btnClass: ["me-2"]}, {
            CLICK: () => {
                direction.set(EffectChangeDirection.BACKWARD);
                index.set((index.get() - 1 + slides.length) % slides.length);
            },
        });
        const next = UiCategory.UI.Simples.Button({prop_btnTitle: "Next"}, {
            CLICK: () => {
                direction.set(EffectChangeDirection.FORWARD);
                index.set((index.get() + 1) % slides.length);
            },
        });
        const controls = document.createElement("div");
        controls.className = "mb-2";
        controls.append(previous.getElement() as HTMLElement, next.getElement() as HTMLElement);
        const container = document.createElement("div");
        container.append(controls, effect.getElement());
        return container;
    },
};
