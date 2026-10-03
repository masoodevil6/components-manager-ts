import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentListSelectedScroller
 */
export const Schemas = {

    // --- Schema پایه (الزامی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    BORDER: {
        part:         "part-border",
        props: [
            Props.prop_borderBackgroundColor,
            Props.prop_borderColor,
            Props.prop_borderClass,
            Props.prop_borderStyles,
            Props.prop_borderWidth,
            Props.prop_borderRadius,
            Props.prop_borderTopLeftRadiusHas,
            Props.prop_borderTopRightRadiusHas,
            Props.prop_borderBottomLeftRadiusHas,
            Props.prop_borderBottomRightRadiusHas,
        ],
        name:         Keys.category.components.listSelectedScroller.schemas.border.name,
        description:  Keys.category.components.listSelectedScroller.schemas.border.description,
    },

    BORDER_LIST: {
        part:         "part-border-list",
        props: [
            Props.prop_value,
            Props.prop_list,
            Props.prop_listMaxShow,
            Props.prop_listType,
            Props.prop_listFreezeSeparator,
            Props.prop_listBorderBackgroundColor,
            Props.prop_listBorderColor,
            Props.prop_listBorderClass,
            Props.prop_listBorderStyles,
            Props.prop_listBorderWidth,
            Props.prop_listBorderRadius,
            Props.prop_listTitleColor,
            Props.prop_listTitleClass,
            Props.prop_listTitleStyles,
            Props.prop_listIconCloseClass,
            Props.prop_listIconCloseStyles,
        ],
        name:         Keys.category.components.listSelectedScroller.schemas.borderList.name,
        description:  Keys.category.components.listSelectedScroller.schemas.borderList.description,
    },

    BORDER_LIST_ITEM_BORDER: {
        part:         "part-border-list-item-border",
        props: [
            Props.prop_listBorderBackgroundColor,
            Props.prop_listBorderColor,
            Props.prop_listBorderClass,
            Props.prop_listBorderStyles,
            Props.prop_listBorderWidth,
            Props.prop_listBorderRadius,
        ],
        name:         Keys.category.components.listSelectedScroller.schemas.listItem.name,
        description:  Keys.category.components.listSelectedScroller.schemas.listItem.description,
    },

    BORDER_LIST_ITEM_BORDER_TITLE: {
        part:         "part-border-list-item-border-title",
        props: [
            Props.prop_listTitleColor,
            Props.prop_listTitleClass,
            Props.prop_listTitleStyles,
        ],
        name:         Keys.category.components.listSelectedScroller.schemas.itemTitle.name,
        description:  Keys.category.components.listSelectedScroller.schemas.itemTitle.description,
    },

    BORDER_LIST_ITEM_BORDER_ICON_CLOSE: {
        part:         "part-border-list-item-border-icon-close",
        props: [
            Props.prop_listIconCloseClass,
            Props.prop_listIconCloseStyles,
        ],
        name:         Keys.category.components.listSelectedScroller.schemas.itemIconClose.name,
        description:  Keys.category.components.listSelectedScroller.schemas.itemIconClose.description,
    },

} satisfies CoreComponents.ComponentSchemas;


export type SchemasType = ExtractSchemasType<typeof Schemas>;
