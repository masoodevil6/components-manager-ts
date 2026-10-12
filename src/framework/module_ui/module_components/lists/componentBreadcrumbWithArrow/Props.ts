import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type BreadcrumbArrowItem = {title: string; [key: string]: unknown};

export const Props = {
    prop_breadcrumbs: Define_ComponentProp<Array<BreadcrumbArrowItem | null>>({
        prop: "prop_breadcrumbs", default: [],
        name: Keys.category.components.breadcrumbWithArrow.props.breadcrumbs.name,
        description: Keys.category.components.breadcrumbWithArrow.props.breadcrumbs.description,
    }),
    prop_stepSelected: Define_ComponentProp<number>({
        prop: "prop_stepSelected", default: 1,
        name: Keys.category.components.breadcrumbWithArrow.props.stepSelected.name,
        description: Keys.category.components.breadcrumbWithArrow.props.stepSelected.description,
    }),
    prop_side: Define_ComponentProp<number>({
        prop: "prop_side", default: 20,
        name: Keys.category.components.breadcrumbWithArrow.props.side.name,
        description: Keys.category.components.breadcrumbWithArrow.props.side.description,
    }),
    prop_length: Define_ComponentProp<number>({
        prop: "prop_length", default: 120,
        name: Keys.category.components.breadcrumbWithArrow.props.length.name,
        description: Keys.category.components.breadcrumbWithArrow.props.length.description,
    }),
    prop_gap: Define_ComponentProp<number>({
        prop: "prop_gap", default: 6,
        name: Keys.category.components.breadcrumbWithArrow.props.gap.name,
        description: Keys.category.components.breadcrumbWithArrow.props.gap.description,
    }),
    prop_height: Define_ComponentProp<number>({
        prop: "prop_height", default: 25,
        name: Keys.category.components.breadcrumbWithArrow.props.height.name,
        description: Keys.category.components.breadcrumbWithArrow.props.height.description,
    }),
    prop_marginMinPerent: Define_ComponentProp<number>({
        prop: "prop_marginMinPerent", default: 10,
        name: Keys.category.components.breadcrumbWithArrow.props.marginMinPerent.name,
        description: Keys.category.components.breadcrumbWithArrow.props.marginMinPerent.description,
    }),
    prop_unactiveBreadcrumb: Define_ComponentProp<string>({
        prop: "prop_unactiveBreadcrumb",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.breadcrumbWithArrow.props.unactiveBreadcrumb.name,
        description: Keys.category.components.breadcrumbWithArrow.props.unactiveBreadcrumb.description,
    }),
    prop_colorUnactive: Define_ComponentProp<string>({
        prop: "prop_colorUnactive",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.breadcrumbWithArrow.props.colorUnactive.name,
        description: Keys.category.components.breadcrumbWithArrow.props.colorUnactive.description,
    }),
    prop_activeBreadcrumb: Define_ComponentProp<string>({
        prop: "prop_activeBreadcrumb",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.breadcrumbWithArrow.props.activeBreadcrumb.name,
        description: Keys.category.components.breadcrumbWithArrow.props.activeBreadcrumb.description,
    }),
    prop_colorActive: Define_ComponentProp<string>({
        prop: "prop_colorActive",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.breadcrumbWithArrow.props.colorActive.name,
        description: Keys.category.components.breadcrumbWithArrow.props.colorActive.description,
    }),
    prop_colorShadow: Define_ComponentProp<string>({
        prop: "prop_colorShadow",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHADOW, UtilConst.ColorGrad.GRADE_2),
        name: Keys.category.components.breadcrumbWithArrow.props.colorShadow.name,
        description: Keys.category.components.breadcrumbWithArrow.props.colorShadow.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
