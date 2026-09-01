import * as CoreComponents from "@/core_components";
import * as UtilBrands     from "@/util_brands";
import {Keys}              from "../../../module_categories/languages";
// --------------------------------


/**
 * Props اختصاصی ComponentIcon
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    prop_icon: {
        prop:         "prop_icon",
        default:      null as UtilBrands.Icons | null,
        name:         Keys.category.components.icon.props.icon.name,
        description:  Keys.category.components.icon.props.icon.description,
    },

    prop_iconTitle: {
        prop:         "prop_iconTitle",
        default:      "" as string,
        name:         Keys.category.components.icon.props.iconTitle.name,
        description:  Keys.category.components.icon.props.iconTitle.description,
    },

    prop_iconClass: {
        prop:         "prop_iconClass",
        default:      [] as string[],
        name:         Keys.category.components.icon.props.iconClass.name,
        description:  Keys.category.components.icon.props.iconClass.description,
    },

    prop_iconStyles: {
        prop:         "prop_iconStyles",
        default:      {} as Record<string, string>,
        name:         Keys.category.components.icon.props.iconStyles.name,
        description:  Keys.category.components.icon.props.iconStyles.description,
    },

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentIcon — برای استفاده در TProp
 */
export type PropsType = {
    [K in keyof typeof Props]: typeof Props[K]["default"]
};
