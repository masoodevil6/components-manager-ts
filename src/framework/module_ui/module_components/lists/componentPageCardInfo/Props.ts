import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as CoreLanguage from "@/core_languages";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const labels = Keys.category.components.pageCardInfo.props;

export const Props = {
    prop_formClass: Define_ComponentProp<string[]>({
        prop: "prop_formClass",
        default: [],
        name: labels.formClass.name,
        description: labels.formClass.description,
    }),
    prop_formStyles: Define_ComponentProp<Record<string, any>>({
        prop: "prop_formStyles",
        default: {},
        name: labels.formStyles.name,
        description: labels.formStyles.description,
    }),
    prop_description: Define_ComponentProp<string>({
        prop: "prop_description",
        default: "",
        name: labels.description.name,
        description: labels.description.description,
    }),
    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop: "prop_icon",
        default: null,
        name: labels.icon.name,
        description: labels.icon.description,
    }),
    prop_iconColor: Define_ComponentProp<string>({
        prop: "prop_iconColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.INFO, UtilConst.ColorGrad.GRADE_1),
        name: labels.iconColor.name,
        description: labels.iconColor.description,
    }),
    prop_iconSize: Define_ComponentProp<number>({
        prop: "prop_iconSize",
        default: 120,
        name: labels.iconSize.name,
        description: labels.iconSize.description,
    }),
    prop_hasBtn: Define_ComponentProp<boolean>({
        prop: "prop_hasBtn",
        default: true,
        name: labels.hasBtn.name,
        description: labels.hasBtn.description,
    }),
    prop_titleBtn: Define_ComponentProp<string>({
        prop: "prop_titleBtn",
        default: CoreLanguage.App.translate(Keys.category.components.pageCardInfo.texts.newOrder) as any,
        name: labels.titleBtn.name,
        description: labels.titleBtn.description,
    }),
    prop_iconBtn: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop: "prop_iconBtn",
        default: UiIcons.Src.CalcPlus.Definition,
        name: labels.iconBtn.name,
        description: labels.iconBtn.description,
    }),
    prop_colorIconBtn: Define_ComponentProp<string>({
        prop: "prop_colorIconBtn",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: labels.colorIconBtn.name,
        description: labels.colorIconBtn.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
