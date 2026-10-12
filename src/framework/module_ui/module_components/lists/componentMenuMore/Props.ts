import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import type * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export enum MenuMoreOrientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

export enum MenuMoreDirection {
    AUTO = "auto",
    LTR = "ltr",
    RTL = "rtl",
    TOP_TO_BOTTOM = "ttb",
    BOTTOM_TO_TOP = "btt",
}

export type MenuMoreItem = {
    id: string;
    title?: string;
    icon?: UiIcons.IIconDefinition | null;
    action?: string;
    openOn?: "click" | "hover";
    disabled?: boolean;
    separator?: boolean;
    children?: MenuMoreEntry[];
};

/** A bordered group can organize menu entries at the root or inside a submenu. */
export type MenuMoreGroup = {
    type: "group";
    id: string;
    items: MenuMoreEntry[];
    /** Defaults to true; set false when the group should only control layout. */
    border?: boolean;
};

export type MenuMoreEntry = MenuMoreItem | MenuMoreGroup;

export const Props = {
    prop_orientation: Define_ComponentProp<MenuMoreOrientation>({
        prop: "prop_orientation", default: MenuMoreOrientation.HORIZONTAL,
        name: Keys.category.components.menuMore.props.orientation.name,
        description: Keys.category.components.menuMore.props.orientation.description,
    }),
    prop_direction: Define_ComponentProp<MenuMoreDirection>({
        prop: "prop_direction", default: MenuMoreDirection.AUTO,
        name: Keys.category.components.menuMore.props.direction.name,
        description: Keys.category.components.menuMore.props.direction.description,
    }),
    prop_items: Define_ComponentProp<MenuMoreEntry[]>({
        prop: "prop_items", default: [],
        name: Keys.category.components.menuMore.props.items.name,
        description: Keys.category.components.menuMore.props.items.description,
    }),
    prop_menuBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_menuBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.menuMore.props.backgroundColor.name,
        description: Keys.category.components.menuMore.props.backgroundColor.description,
    }),
    prop_itemBackgroundColorHover: Define_ComponentProp<string>({
        prop: "prop_itemBackgroundColorHover",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
        name: Keys.category.components.menuMore.props.itemBackgroundColorHover.name,
        description: Keys.category.components.menuMore.props.itemBackgroundColorHover.description,
    }),
    prop_menuIconColor: Define_ComponentProp<string>({
        prop: "prop_menuIconColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.menuMore.props.iconColor.name,
        description: Keys.category.components.menuMore.props.iconColor.description,
    }),
    prop_menuIconSecondaryColor: Define_ComponentProp<string | null>({
        prop: "prop_menuIconSecondaryColor", default: null,
        name: Keys.category.components.menuMore.props.iconSecondaryColor.name,
        description: Keys.category.components.menuMore.props.iconSecondaryColor.description,
    }),
    prop_menuBorderRadius: Define_ComponentProp<UtilConst.Sizes | null>({
        prop: "prop_menuBorderRadius",
        default: null,
        name: Keys.category.components.menuMore.props.borderRadius.name,
        description: Keys.category.components.menuMore.props.borderRadius.description,
    }),
    prop_menuBorderWidth: Define_ComponentProp<UtilConst.Sizes | null>({
        prop: "prop_menuBorderWidth",
        default: null,
        name: Keys.category.components.menuMore.props.borderWidth.name,
        description: Keys.category.components.menuMore.props.borderWidth.description,
    }),
    prop_menuBorder: Define_ComponentProp<boolean>({
        prop: "prop_menuBorder",
        default: false,
        name: Keys.category.components.menuMore.props.border.name,
        description: Keys.category.components.menuMore.props.border.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
