import * as CoreComponents   from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UtilConst        from "@/util_consts";
import * as UtilStyle        from "@/util_styles";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Enums اختصاصی ComponentListSelectedScroller
 */
export enum ListTypes {
    ACTIVE = "active",
    FREEZE = "freeze",
}


/**
 * نوع آیتم لیست
 */
export type ListItemType = {
    id: string | number;
    title?: string | null;
    canDelete?: boolean;
};


/**
 * Props اختصاصی ComponentListSelectedScroller
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 *
 * شامل:
 *   - prop_value, prop_name (از FormInput_Value قدیم)
 *   - propهای border بیرونی (backgroundColor, color, class, styles, width, radius)
 *   - propهای list (list, listMaxShow, listType, listFreezeSeparator)
 *   - propهای listBorder (backgroundColor, color, class, styles, width, radius)
 *   - propهای listTitle (color, class, styles)
 *   - propهای listIconClose (class, styles)
 */
export const Props = {

    /// --- FormInput Value ---
    prop_value: Define_ComponentProp<any>({
        prop:         "prop_value",
        default:      [],
        name:         Keys.category.components.listSelectedScroller.props.value.name,
        description:  Keys.category.components.listSelectedScroller.props.value.description,
    }),

    prop_name: Define_ComponentProp<string>({
        prop:         "prop_name",
        default:      "",
        name:         Keys.category.components.listSelectedScroller.props.name.name,
        description:  Keys.category.components.listSelectedScroller.props.name.description,
    }),

    /// --- Outer Border ---
    prop_borderBackgroundColor: Define_ComponentProp<string | null>({
        prop:         "prop_borderBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.listSelectedScroller.props.borderBackgroundColor.name,
        description:  Keys.category.components.listSelectedScroller.props.borderBackgroundColor.description,
    }),

    prop_borderColor: Define_ComponentProp<string | null>({
        prop:         "prop_borderColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.listSelectedScroller.props.borderColor.name,
        description:  Keys.category.components.listSelectedScroller.props.borderColor.description,
    }),

    prop_borderClass: Define_ComponentProp<string[]>({
        prop:         "prop_borderClass",
        default:      ["px-1"],
        name:         Keys.category.components.listSelectedScroller.props.borderClass.name,
        description:  Keys.category.components.listSelectedScroller.props.borderClass.description,
    }),

    prop_borderStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_borderStyles",
        default:      { display: "flow-root" },
        name:         Keys.category.components.listSelectedScroller.props.borderStyles.name,
        description:  Keys.category.components.listSelectedScroller.props.borderStyles.description,
    }),

    prop_borderWidth: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_borderWidth",
        default:      UtilConst.Sizes.S,
        name:         Keys.category.components.listSelectedScroller.props.borderWidth.name,
        description:  Keys.category.components.listSelectedScroller.props.borderWidth.description,
    }),

    prop_borderRadius: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_borderRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.listSelectedScroller.props.borderRadius.name,
        description:  Keys.category.components.listSelectedScroller.props.borderRadius.description,
    }),

    /// --- List Props ---
    prop_list: Define_ComponentProp<ListItemType[]>({
        prop:         "prop_list",
        default:      [],
        name:         Keys.category.components.listSelectedScroller.props.list.name,
        description:  Keys.category.components.listSelectedScroller.props.list.description,
    }),

    prop_listMaxShow: Define_ComponentProp<number | null>({
        prop:         "prop_listMaxShow",
        default:      null,
        name:         Keys.category.components.listSelectedScroller.props.listMaxShow.name,
        description:  Keys.category.components.listSelectedScroller.props.listMaxShow.description,
    }),

    prop_listType: Define_ComponentProp<ListTypes>({
        prop:         "prop_listType",
        default:      ListTypes.ACTIVE,
        name:         Keys.category.components.listSelectedScroller.props.listType.name,
        description:  Keys.category.components.listSelectedScroller.props.listType.description,
    }),

    prop_listFreezeSeparator: Define_ComponentProp<string>({
        prop:         "prop_listFreezeSeparator",
        default:      "/",
        name:         Keys.category.components.listSelectedScroller.props.listFreezeSeparator.name,
        description:  Keys.category.components.listSelectedScroller.props.listFreezeSeparator.description,
    }),

    /// --- List Border ---
    prop_listBorderBackgroundColor: Define_ComponentProp<string | null>({
        prop:         "prop_listBorderBackgroundColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_5),
        name:         Keys.category.components.listSelectedScroller.props.listBorderBackgroundColor.name,
        description:  Keys.category.components.listSelectedScroller.props.listBorderBackgroundColor.description,
    }),

    prop_listBorderColor: Define_ComponentProp<string | null>({
        prop:         "prop_listBorderColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.listSelectedScroller.props.listBorderColor.name,
        description:  Keys.category.components.listSelectedScroller.props.listBorderColor.description,
    }),

    prop_listBorderClass: Define_ComponentProp<string[]>({
        prop:         "prop_listBorderClass",
        default:      [],
        name:         Keys.category.components.listSelectedScroller.props.listBorderClass.name,
        description:  Keys.category.components.listSelectedScroller.props.listBorderClass.description,
    }),

    prop_listBorderStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_listBorderStyles",
        default:      {},
        name:         Keys.category.components.listSelectedScroller.props.listBorderStyles.name,
        description:  Keys.category.components.listSelectedScroller.props.listBorderStyles.description,
    }),

    prop_listBorderWidth: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_listBorderWidth",
        default:      UtilConst.Sizes.XS,
        name:         Keys.category.components.listSelectedScroller.props.listBorderWidth.name,
        description:  Keys.category.components.listSelectedScroller.props.listBorderWidth.description,
    }),

    prop_listBorderRadius: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_listBorderRadius",
        default:      UtilConst.Sizes.S,
        name:         Keys.category.components.listSelectedScroller.props.listBorderRadius.name,
        description:  Keys.category.components.listSelectedScroller.props.listBorderRadius.description,
    }),

    /// --- List Title ---
    prop_listTitleColor: Define_ComponentProp<string | null>({
        prop:         "prop_listTitleColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.listSelectedScroller.props.listTitleColor.name,
        description:  Keys.category.components.listSelectedScroller.props.listTitleColor.description,
    }),

    prop_listTitleClass: Define_ComponentProp<string[]>({
        prop:         "prop_listTitleClass",
        default:      [],
        name:         Keys.category.components.listSelectedScroller.props.listTitleClass.name,
        description:  Keys.category.components.listSelectedScroller.props.listTitleClass.description,
    }),

    prop_listTitleStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_listTitleStyles",
        default:      {},
        name:         Keys.category.components.listSelectedScroller.props.listTitleStyles.name,
        description:  Keys.category.components.listSelectedScroller.props.listTitleStyles.description,
    }),

    /// --- List Icon Close ---
    prop_listIconCloseClass: Define_ComponentProp<string[]>({
        prop:         "prop_listIconCloseClass",
        default:      [],
        name:         Keys.category.components.listSelectedScroller.props.listIconCloseClass.name,
        description:  Keys.category.components.listSelectedScroller.props.listIconCloseClass.description,
    }),

    prop_listIconCloseStyles: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_listIconCloseStyles",
        default:      {},
        name:         Keys.category.components.listSelectedScroller.props.listIconCloseStyles.name,
        description:  Keys.category.components.listSelectedScroller.props.listIconCloseStyles.description,
    }),

} satisfies CoreComponents.ComponentProps;


export type PropsType = ExtractPropsType<typeof Props>;

export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
