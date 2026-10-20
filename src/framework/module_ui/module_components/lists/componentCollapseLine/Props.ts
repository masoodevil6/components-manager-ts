import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.collapseLine;

export const Props = {
    prop_collapseLineCanCollapse: Define_ComponentProp<boolean>({
        prop: "prop_collapseLineCanCollapse",
        default: false,
        name: translation.props.canCollapse.name,
        description: translation.props.canCollapse.description,
    }),
    prop_collapseLineBodyIsOpen: Define_ComponentProp<boolean>({
        prop: "prop_collapseLineBodyIsOpen",
        default: false,
        name: translation.props.bodyIsOpen.name,
        description: translation.props.bodyIsOpen.description,
    }),
    prop_collapseLineTitle: Define_ComponentProp<string | null>({
        prop: "prop_collapseLineTitle",
        default: null,
        name: translation.props.title.name,
        description: translation.props.title.description,
    }),
    prop_collapseLineBody: Define_ComponentProp<unknown | null>({
        prop: "prop_collapseLineBody",
        default: null,
        name: translation.props.body.name,
        description: translation.props.body.description,
    }),
    prop_lineBackground: Define_ComponentProp<string | null>({
        prop: "prop_lineBackground",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name: translation.props.lineBackground.name,
        description: translation.props.lineBackground.description,
    }),
    prop_isCenter: Define_ComponentProp<boolean>({
        prop: "prop_isCenter",
        default: true,
        name: translation.props.isCenter.name,
        description: translation.props.isCenter.description,
    }),
    prop_collapseLineThickness: Define_ComponentProp<number | string>({
        prop: "prop_collapseLineThickness",
        default: 1,
        name: translation.props.thickness.name,
        description: translation.props.thickness.description,
    }),
    prop_collapseLineClass: Define_ComponentProp<string[]>({
        prop: "prop_collapseLineClass",
        default: [],
        name: translation.props.class.name,
        description: translation.props.class.description,
    }),
    prop_collapseLineStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_collapseLineStyles",
        default: {},
        name: translation.props.styles.name,
        description: translation.props.styles.description,
    }),
    prop_collapseLineTitleClass: Define_ComponentProp<string[]>({
        prop: "prop_collapseLineTitleClass",
        default: [],
        name: translation.props.titleClass.name,
        description: translation.props.titleClass.description,
    }),
    prop_collapseLineTitleStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_collapseLineTitleStyles",
        default: {},
        name: translation.props.titleStyles.name,
        description: translation.props.titleStyles.description,
    }),
    prop_collapseLineBodyClass: Define_ComponentProp<string[]>({
        prop: "prop_collapseLineBodyClass",
        default: [],
        name: translation.props.bodyClass.name,
        description: translation.props.bodyClass.description,
    }),
    prop_collapseLineBodyStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_collapseLineBodyStyles",
        default: {},
        name: translation.props.bodyStyles.name,
        description: translation.props.bodyStyles.description,
    }),
    prop_collapseLineArrowClass: Define_ComponentProp<string[]>({
        prop: "prop_collapseLineArrowClass",
        default: [],
        name: translation.props.arrowClass.name,
        description: translation.props.arrowClass.description,
    }),
    prop_collapseLineArrowStyles: Define_ComponentProp<Record<string, string>>({
        prop: "prop_collapseLineArrowStyles",
        default: {},
        name: translation.props.arrowStyles.name,
        description: translation.props.arrowStyles.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
