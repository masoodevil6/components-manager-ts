import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UtilConst        from "@/util_consts";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Props اختصاصی ComponentPositionMenu
 *
 * این Props به ۷ prop پایه ComponentStructure اضافه می‌شوند.
 */
export const Props = {

    /// --- Menu Colors ---

    prop_menuBackgroundColor: Define_ComponentProp<string | null>({
        prop:         "prop_menuBackgroundColor",
        default:      null,
        name:         Keys.category.components.positionMenu.props.menuBackgroundColor.name,
        description:  Keys.category.components.positionMenu.props.menuBackgroundColor.description,
    }),

    prop_menuBorderColor: Define_ComponentProp<string | null>({
        prop:         "prop_menuBorderColor",
        default:      null,
        name:         Keys.category.components.positionMenu.props.menuBorderColor.name,
        description:  Keys.category.components.positionMenu.props.menuBorderColor.description,
    }),

    /// --- Menu Content ---

    prop_menuSelector: Define_ComponentProp<string | any>({
        prop:         "prop_menuSelector",
        default:      "",
        name:         Keys.category.components.positionMenu.props.menuSelector.name,
        description:  Keys.category.components.positionMenu.props.menuSelector.description,
    }),

    prop_menuBody: Define_ComponentProp<string | any>({
        prop:         "prop_menuBody",
        default:      "",
        name:         Keys.category.components.positionMenu.props.menuBody.name,
        description:  Keys.category.components.positionMenu.props.menuBody.description,
    }),

    prop_menuBodyWidth: Define_ComponentProp<string | null>({
        prop:         "prop_menuBodyWidth",
        default:      null,
        name:         Keys.category.components.positionMenu.props.menuBodyWidth.name,
        description:  Keys.category.components.positionMenu.props.menuBodyWidth.description,
    }),

    prop_menuBodyHeight: Define_ComponentProp<string | null>({
        prop:         "prop_menuBodyHeight",
        default:      null,
        name:         Keys.category.components.positionMenu.props.menuBodyHeight.name,
        description:  Keys.category.components.positionMenu.props.menuBodyHeight.description,
    }),

    prop_menuBorderWidth: Define_ComponentProp<UtilConst.Sizes | number>({
        prop:         "prop_menuBorderWidth",
        default:      UtilConst.Sizes.S,
        name:         Keys.category.components.positionMenu.props.menuBorderWidth.name,
        description:  Keys.category.components.positionMenu.props.menuBorderWidth.description,
    }),

    /// --- Reject Button ---

    prop_menuBtnRejectHas: Define_ComponentProp<boolean>({
        prop:         "prop_menuBtnRejectHas",
        default:      true,
        name:         Keys.category.components.positionMenu.props.menuBtnRejectHas.name,
        description:  Keys.category.components.positionMenu.props.menuBtnRejectHas.description,
    }),

    prop_menuBtnRejectIcon: Define_ComponentProp<any | null>({
        prop:         "prop_menuBtnRejectIcon",
        default:      null,
        name:         Keys.category.components.positionMenu.props.menuBtnRejectIcon.name,
        description:  Keys.category.components.positionMenu.props.menuBtnRejectIcon.description,
    }),

    prop_menuBtnRejectTitle: Define_ComponentProp<string | null>({
        prop:         "prop_menuBtnRejectTitle",
        default:      null,
        name:         Keys.category.components.positionMenu.props.menuBtnRejectTitle.name,
        description:  Keys.category.components.positionMenu.props.menuBtnRejectTitle.description,
    }),

    /// --- Accept Button ---

    prop_menuBtnAcceptHas: Define_ComponentProp<boolean>({
        prop:         "prop_menuBtnAcceptHas",
        default:      true,
        name:         Keys.category.components.positionMenu.props.menuBtnAcceptHas.name,
        description:  Keys.category.components.positionMenu.props.menuBtnAcceptHas.description,
    }),

    prop_menuBtnAcceptIcon: Define_ComponentProp<any | null>({
        prop:         "prop_menuBtnAcceptIcon",
        default:      null,
        name:         Keys.category.components.positionMenu.props.menuBtnAcceptIcon.name,
        description:  Keys.category.components.positionMenu.props.menuBtnAcceptIcon.description,
    }),

    prop_menuBtnAcceptTitle: Define_ComponentProp<string | null>({
        prop:         "prop_menuBtnAcceptTitle",
        default:      null,
        name:         Keys.category.components.positionMenu.props.menuBtnAcceptTitle.name,
        description:  Keys.category.components.positionMenu.props.menuBtnAcceptTitle.description,
    }),

    /// --- State ---

    prop_menuIsOpen: Define_ComponentProp<boolean>({
        prop:         "prop_menuIsOpen",
        default:      false,
        name:         Keys.category.components.positionMenu.props.menuIsOpen.name,
        description:  Keys.category.components.positionMenu.props.menuIsOpen.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentPositionMenu — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
