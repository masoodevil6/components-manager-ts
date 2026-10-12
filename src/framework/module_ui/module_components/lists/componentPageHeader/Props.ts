import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys} from "../../../module_categories/languages";
import type {MenuMoreDirection, MenuMoreEntry, MenuMoreOrientation} from "../componentMenuMore/Props";
import type {BreadcrumbShadowItem} from "../componentBreadcrumbShadow/Props";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const label = (key: any) => ({name: key.name, description: key.description});

export const Props = {
    prop_size: Define_ComponentProp<UtilConst.Sizes | null>({prop: "prop_size", default: null, ...label(Keys.category.components.pageHeader.props.size)}),
    prop_backgroundForm: Define_ComponentProp<string>({prop: "prop_backgroundForm", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), ...label(Keys.category.components.pageHeader.props.backgroundForm)}),
    prop_formClass: Define_ComponentProp<string[]>({prop: "prop_formClass", default: [], ...label(Keys.category.components.pageHeader.props.formClass)}),
    prop_formStyles: Define_ComponentProp<Record<string, any>>({prop: "prop_formStyles", default: {}, ...label(Keys.category.components.pageHeader.props.formStyles)}),
    prop_colorIcon_primary: Define_ComponentProp<string>({prop: "prop_colorIcon_primary", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), ...label(Keys.category.components.pageHeader.props.colorIconPrimary)}),
    prop_colorIcon_secondary: Define_ComponentProp<string>({prop: "prop_colorIcon_secondary", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3), ...label(Keys.category.components.pageHeader.props.colorIconSecondary)}),
    prop_hasIconBack: Define_ComponentProp<boolean>({prop: "prop_hasIconBack", default: true, ...label(Keys.category.components.pageHeader.props.hasIconBack)}),
    prop_pageTitle: Define_ComponentProp<string>({prop: "prop_pageTitle", default: "", ...label(Keys.category.components.pageHeader.props.pageTitle)}),
    prop_pageNav: Define_ComponentProp<BreadcrumbShadowItem[]>({prop: "prop_pageNav", default: [], ...label(Keys.category.components.pageHeader.props.pageNav)}),
    prop_colorNav: Define_ComponentProp<string>({prop: "prop_colorNav", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1), ...label(Keys.category.components.pageHeader.props.colorNav)}),
    prop_backgroundColorNav: Define_ComponentProp<string>({prop: "prop_backgroundColorNav", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), ...label(Keys.category.components.pageHeader.props.backgroundColorNav)}),
    prop_colorHeader: Define_ComponentProp<string>({prop: "prop_colorHeader", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1), ...label(Keys.category.components.pageHeader.props.colorHeader)}),
    prop_optionsList: Define_ComponentProp<MenuMoreEntry[]>({prop: "prop_optionsList", default: [], ...label(Keys.category.components.pageHeader.props.optionsList)}),

    // BreadcrumbShadow pass-through and compatibility aliases.
    prop_hasBtnBack: Define_ComponentProp<boolean | null>({prop: "prop_hasBtnBack", default: null, ...label(Keys.category.components.pageHeader.props.hasBtnBack)}),
    prop_hasDivider: Define_ComponentProp<boolean | null>({prop: "prop_hasDivider", default: null, ...label(Keys.category.components.pageHeader.props.hasDivider)}),
    prop_widthTitle: Define_ComponentProp<string | null>({prop: "prop_widthTitle", default: null, ...label(Keys.category.components.pageHeader.props.widthTitle)}),
    prop_hideNavigationBelow: Define_ComponentProp<number | null>({prop: "prop_hideNavigationBelow", default: null, ...label(Keys.category.components.pageHeader.props.hideNavigationBelow)}),
    prop_backgroundColorRoot: Define_ComponentProp<string | null>({prop: "prop_backgroundColorRoot", default: null, ...label(Keys.category.components.pageHeader.props.backgroundColorRoot)}),
    prop_backIconPrimaryColor: Define_ComponentProp<string | null>({prop: "prop_backIconPrimaryColor", default: null, ...label(Keys.category.components.pageHeader.props.backIconPrimaryColor)}),
    prop_backIconSecondaryColor: Define_ComponentProp<string | null>({prop: "prop_backIconSecondaryColor", default: null, ...label(Keys.category.components.pageHeader.props.backIconSecondaryColor)}),

    // MenuMore pass-through props.
    prop_menuOrientation: Define_ComponentProp<MenuMoreOrientation>({prop: "prop_menuOrientation", default: "horizontal" as MenuMoreOrientation, ...label(Keys.category.components.pageHeader.props.menuOrientation)}),
    prop_menuDirection: Define_ComponentProp<MenuMoreDirection>({prop: "prop_menuDirection", default: "auto" as MenuMoreDirection, ...label(Keys.category.components.pageHeader.props.menuDirection)}),
    prop_menuItems: Define_ComponentProp<MenuMoreEntry[] | null>({prop: "prop_menuItems", default: null, ...label(Keys.category.components.pageHeader.props.menuItems)}),
    prop_menuBackgroundColor: Define_ComponentProp<string | null>({prop: "prop_menuBackgroundColor", default: null, ...label(Keys.category.components.pageHeader.props.menuBackgroundColor)}),
    prop_menuItemBackgroundColorHover: Define_ComponentProp<string | null>({prop: "prop_menuItemBackgroundColorHover", default: null, ...label(Keys.category.components.pageHeader.props.menuItemBackgroundColorHover)}),
    prop_menuIconColor: Define_ComponentProp<string | null>({prop: "prop_menuIconColor", default: null, ...label(Keys.category.components.pageHeader.props.menuIconColor)}),
    prop_menuIconSecondaryColor: Define_ComponentProp<string | null>({prop: "prop_menuIconSecondaryColor", default: null, ...label(Keys.category.components.pageHeader.props.menuIconSecondaryColor)}),
    prop_menuBorderRadius: Define_ComponentProp<UtilConst.Sizes | null>({prop: "prop_menuBorderRadius", default: null, ...label(Keys.category.components.pageHeader.props.menuBorderRadius)}),
    prop_menuBorderWidth: Define_ComponentProp<UtilConst.Sizes | null>({prop: "prop_menuBorderWidth", default: null, ...label(Keys.category.components.pageHeader.props.menuBorderWidth)}),
    prop_menuBorder: Define_ComponentProp<boolean>({prop: "prop_menuBorder", default: false, ...label(Keys.category.components.pageHeader.props.menuBorder)}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
