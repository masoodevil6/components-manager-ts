import {ComponentExample} from "@/core_components";
import * as CoreObservable from "@/core_observable";
import * as CoreReactive from "@/core_reactive";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import type {LayoutContentItem} from "../Props";

export const ReactiveContent: ComponentExample = {
    id: "layout_reactive_content",
    name: Keys.category.components.layout.examples.reactiveContent.name,
    description: Keys.category.components.layout.examples.reactiveContent.description,
    render(): HTMLElement {
        const content = new CoreObservable.App<LayoutContentItem[] | null>([
            {content: "Initial reactive content", col: null},
        ]);
        const layout = UiCategory.UI.Basic.Layout({
            prop_layoutClass: ["border", "rounded", "p-3"],
            prop_layoutContent: content,
        });
        const update = CoreReactive.App.button({
            props: {type: "button", textContent: "Update content"},
            on: {click: () => content.set([{content: "Updated reactive content", col: null}])},
        });
        return CoreReactive.App.section({
            children: [layout.getReactiveElement() as CoreReactive.App, update],
        }).getElement() as HTMLElement;
    },
};
