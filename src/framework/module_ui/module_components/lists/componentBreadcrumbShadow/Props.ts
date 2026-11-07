import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys as KeysBreadcrumb} from "../../../module_categories/languages/keys/components/breadcrumb";
import {Keys as KeysBreadcrumbShadow} from "../../../module_categories/languages/keys/components/breadcrumbShadow";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type BreadcrumbShadowItem = {name: string; title: string};

export const Props = {
    prop_hasBtnBack: Define_ComponentProp<boolean>({
        prop: "prop_hasBtnBack", default: true,
        name: KeysBreadcrumb.category.components.breadcrumb.props.showBtn.name,
        description: KeysBreadcrumb.category.components.breadcrumb.props.showBtn.description,
    }),
    prop_pageTitle: Define_ComponentProp<string>({
        prop: "prop_pageTitle", default: "",
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.pageTitle.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.pageTitle.description,
    }),
    prop_pageNav: Define_ComponentProp<BreadcrumbShadowItem[]>({
        prop: "prop_pageNav", default: [],
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.pageNav.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.pageNav.description,
    }),
    prop_colorNav: Define_ComponentProp<string>({
        prop: "prop_colorNav", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.colorNav.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.colorNav.description,
    }),
    prop_backgroundColorNav: Define_ComponentProp<string>({
        prop: "prop_backgroundColorNav", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.backgroundColorNav.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.backgroundColorNav.description,
    }),
    prop_colorHeader: Define_ComponentProp<string>({
        prop: "prop_colorHeader", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.colorHeader.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.colorHeader.description,
    }),
    prop_backgroundColorRoot: Define_ComponentProp<string>({
        prop: "prop_backgroundColorRoot", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.backgroundColorRoot.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.backgroundColorRoot.description,
    }),
    prop_backIconPrimaryColor: Define_ComponentProp<string>({
        prop: "prop_backIconPrimaryColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.backIconPrimaryColor.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.backIconPrimaryColor.description,
    }),
    prop_backIconSecondaryColor: Define_ComponentProp<string>({
        prop: "prop_backIconSecondaryColor", default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.backIconSecondaryColor.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.backIconSecondaryColor.description,
    }),
    prop_hasDivider: Define_ComponentProp<boolean>({
        prop: "prop_hasDivider", default: true,
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.hasDivider.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.hasDivider.description,
    }),
    prop_widthTitle: Define_ComponentProp<string>({
        prop: "prop_widthTitle", default: "60%",
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.widthTitle.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.widthTitle.description,
    }),
    prop_hideNavigationBelow: Define_ComponentProp<number>({
        prop: "prop_hideNavigationBelow", default: 768,
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.hideNavigationBelow.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.hideNavigationBelow.description,
    }),
    prop_size: Define_ComponentProp<UtilConst.Sizes | null>({
        prop: "prop_size", default: null,
        name: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.size.name,
        description: KeysBreadcrumbShadow.category.components.breadcrumbShadow.props.size.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
