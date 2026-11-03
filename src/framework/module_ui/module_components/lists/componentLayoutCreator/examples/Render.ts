import * as Core from "@/core";
import type {ComponentExample} from "@/core_components";
import * as UtilOptionsStd from "@/util_options_std";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {LayoutColumn} from "../../componentLayout/Props";
import {LayoutCreatorMode} from "../Props";

export const Render: ComponentExample = {
    id: "layout_creator_render",
    name: Keys.category.components.basic.layoutCreator.examples.render.name,
    description: Keys.category.components.basic.layoutCreator.examples.render.description,
    render(): HTMLElement {
        const textAlignStyle = UtilOptionsStd.Group.Text.Align.createPropertyCssStyles(
            UtilOptionsStd.Group.Text.Align.Key,
            "center",
        );
        const primaryInput = UiCategory.UI.Inputs.Input({
            prop_name: "primaryInput",
            prop_value: "",
            prop_labelTitle: "Primary input",
            prop_placeholder: "Enter a value",
            prop_structureStyles: textAlignStyle,
        });
        const secondaryInput = UiCategory.UI.Inputs.Input({
            prop_name: "secondaryInput",
            prop_value: "",
            prop_labelTitle: "Secondary input",
            prop_placeholder: "Enter another value",
            prop_structureStyles: textAlignStyle,
        });
        const itemStyles = {
            ...textAlignStyle,
            ...UtilOptionsStd.Group.Layout.createPropertyCssStyles(
                UtilOptionsStd.Group.Layout.MinHeight.Key,
                "5rem",
            ),
            ...UtilOptionsStd.Group.Layout.createPropertyCssStyles(
                UtilOptionsStd.Group.Layout.Display.Key,
                UtilOptionsStd.DisplayValue.FLEX,
            ),
            ...UtilOptionsStd.Group.Layout.createPropertyCssStyles(
                UtilOptionsStd.Group.Layout.AlignItems.Key,
                UtilOptionsStd.AlignItemsValue.CENTER,
            ),
        };

        return UiCategory.UI.Basic.LayoutCreator({
            prop_mode: LayoutCreatorMode.RENDER,
            prop_initialLayoutContent: [
                {
                    content: primaryInput,
                    workflowChildName: Core.Dictionary.WorkflowNodeNames.primaryInput,
                    col: LayoutColumn.COL_6,
                    styles: itemStyles,
                },
                {
                    content: secondaryInput,
                    workflowChildName: Core.Dictionary.WorkflowNodeNames.secondaryInput,
                    col: LayoutColumn.COL_6,
                    styles: itemStyles,
                },
            ],
        }).getElement() as HTMLElement;
    },
};
