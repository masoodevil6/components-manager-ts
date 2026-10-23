import type {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {LayoutCreatorMode} from "../Props";

export const Render: ComponentExample = {
    id: "layout_creator_render",
    name: Keys.category.components.basic.layoutCreator.examples.render.name,
    description: Keys.category.components.basic.layoutCreator.examples.render.description,
    render(): HTMLElement {
        return UiCategory.UI.Basic.LayoutCreator({
            prop_mode: LayoutCreatorMode.RENDER,
        }).getElement() as HTMLElement;
    },
};
