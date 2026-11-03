import * as CoreComponents from "@/core_components";
import * as UiIcons from "@/ui_icons";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import type {MenuMoreEntry} from "../componentMenuMore/Props";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type CardRowInfoRow = {
    id: string | number;
    icon?: UiIcons.IIconDefinition | null;
    iconColor?: string | null;
    iconSize?: number;
    content?: string;
    title?: string;
};

export const Props = {
    prop_borderClass: Define_ComponentProp<string[]>({
        prop: "prop_borderClass",
        default: ["border", "rounded", "shadow-sm"],
        name: Keys.category.components.cardRowInfo.props.borderClass.name,
        description: Keys.category.components.cardRowInfo.props.borderClass.description,
    }),
    prop_borderStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_borderStyles",
        default: {},
        name: Keys.category.components.cardRowInfo.props.borderStyles.name,
        description: Keys.category.components.cardRowInfo.props.borderStyles.description,
    }),
    prop_titleWidth: Define_ComponentProp<string>({
        prop: "prop_titleWidth",
        default: "120px",
        name: Keys.category.components.cardRowInfo.props.titleWidth.name,
        description: Keys.category.components.cardRowInfo.props.titleWidth.description,
    }),
    prop_rows: Define_ComponentProp<CardRowInfoRow[]>({
        prop: "prop_rows",
        default: [],
        name: Keys.category.components.cardRowInfo.props.rows.name,
        description: Keys.category.components.cardRowInfo.props.rows.description,
    }),
    prop_options: Define_ComponentProp<MenuMoreEntry[]>({
        prop: "prop_options",
        default: [],
        name: Keys.category.components.cardRowInfo.props.options.name,
        description: Keys.category.components.cardRowInfo.props.options.description,
    }),
    prop_optionsOpacity: Define_ComponentProp<number>({
        prop: "prop_optionsOpacity",
        default: 45,
        name: Keys.category.components.cardRowInfo.props.optionsOpacity.name,
        description: Keys.category.components.cardRowInfo.props.optionsOpacity.description,
    }),
    prop_menuBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_menuBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.cardRowInfo.props.menuBackgroundColor.name,
        description: Keys.category.components.cardRowInfo.props.menuBackgroundColor.description,
    }),
    prop_itemBackgroundColorHover: Define_ComponentProp<string>({
        prop: "prop_itemBackgroundColorHover",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_4),
        name: Keys.category.components.cardRowInfo.props.itemBackgroundColorHover.name,
        description: Keys.category.components.cardRowInfo.props.itemBackgroundColorHover.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
