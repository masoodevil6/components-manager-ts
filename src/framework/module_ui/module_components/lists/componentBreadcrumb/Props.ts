import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type BreadcrumbItem = {
    id: string | number;
    title: string;
};

export const Props = {
    prop_breadcrumbs: Define_ComponentProp<Array<BreadcrumbItem | null>>({
        prop: "prop_breadcrumbs",
        default: [],
        name: Keys.category.components.breadcrumb.props.breadcrumbs.name,
        description: Keys.category.components.breadcrumb.props.breadcrumbs.description,
    }),
    prop_stepSelected: Define_ComponentProp<string | number | null>({
        prop: "prop_stepSelected",
        default: 1,
        name: Keys.category.components.breadcrumb.props.stepSelected.name,
        description: Keys.category.components.breadcrumb.props.stepSelected.description,
    }),
    prop_showBtn: Define_ComponentProp<boolean>({
        prop: "prop_showBtn",
        default: true,
        name: Keys.category.components.breadcrumb.props.showBtn.name,
        description: Keys.category.components.breadcrumb.props.showBtn.description,
    }),
    prop_unactiveBreadcrumb: Define_ComponentProp<string>({
        prop: "prop_unactiveBreadcrumb",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.breadcrumb.props.unactiveBreadcrumb.name,
        description: Keys.category.components.breadcrumb.props.unactiveBreadcrumb.description,
    }),
    prop_colorUnactive: Define_ComponentProp<string>({
        prop: "prop_colorUnactive",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.breadcrumb.props.colorUnactive.name,
        description: Keys.category.components.breadcrumb.props.colorUnactive.description,
    }),
    prop_activeBreadcrumb: Define_ComponentProp<string>({
        prop: "prop_activeBreadcrumb",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.breadcrumb.props.activeBreadcrumb.name,
        description: Keys.category.components.breadcrumb.props.activeBreadcrumb.description,
    }),
    prop_colorActive: Define_ComponentProp<string>({
        prop: "prop_colorActive",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.DARK, UtilConst.ColorGrad.GRADE_1),
        name: Keys.category.components.breadcrumb.props.colorActive.name,
        description: Keys.category.components.breadcrumb.props.colorActive.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
