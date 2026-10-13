import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import {Props as BorderProps, BorderTypes, ArrowTypes} from "../componentBorder/Props";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type SubmitButtonConfig = {
    prop_title?: string;
    prop_btnClass?: string[];
    prop_btnStyles?: Record<string, string>;
};

const defineFormProp = <T,>(prop: string, defaultValue: T, name: any, description: any) => Define_ComponentProp<T>({
    prop,
    default: defaultValue,
    name,
    description,
});

const defineBorderAlias = <T,>(prop: string, source: any) => Define_ComponentProp<T>({
    prop,
    default: source.default,
    name: source.name,
    description: source.description,
});

const formKeys = Keys.category.components.fetch.form.props;
const basicKeys = Keys.category.components.basic.props;

export const Props = {
    prop_forms: defineFormProp<any>("prop_forms", null, formKeys.forms.name, formKeys.forms.description),
    prop_formClass: defineFormProp<string[]>("prop_formClass", ["m-2", "d-block", "p-0"], formKeys.formClass.name, formKeys.formClass.description),
    prop_formStyles: defineFormProp<Record<string, string>>("prop_formStyles", {}, formKeys.formStyles.name, formKeys.formStyles.description),
    prop_formsMinHeight: defineFormProp<string | null>("prop_formsMinHeight", null, formKeys.formsMinHeight.name, formKeys.formsMinHeight.description),
    prop_btnformClass: defineFormProp<string[]>("prop_btnformClass", [], formKeys.btnformClass.name, formKeys.btnformClass.description),
    prop_btnformStyles: defineFormProp<Record<string, string>>("prop_btnformStyles", {display: "flow-root"}, formKeys.btnformStyles.name, formKeys.btnformStyles.description),
    prop_btnSubmit: defineFormProp<SubmitButtonConfig>("prop_btnSubmit", {prop_title: "Submit", prop_btnClass: []}, formKeys.btnSubmit.name, formKeys.btnSubmit.description),
    prop_btnSubmitBackground: defineFormProp<string | null>("prop_btnSubmitBackground", null, formKeys.btnSubmitBackground.name, formKeys.btnSubmitBackground.description),
    prop_btnSubmitBackgroundHover: defineFormProp<string | null>("prop_btnSubmitBackgroundHover", null, formKeys.btnSubmitBackgroundHover.name, formKeys.btnSubmitBackgroundHover.description),
    prop_btnSubmitColor: defineFormProp<string | null>("prop_btnSubmitColor", null, formKeys.btnSubmitColor.name, formKeys.btnSubmitColor.description),
    prop_url: defineFormProp<string>("prop_url", "", formKeys.url.name, formKeys.url.description),
    prop_data: defineFormProp<any>("prop_data", [], formKeys.data.name, formKeys.data.description),
    prop_showErrorStepper: defineFormProp<boolean>("prop_showErrorStepper", true, formKeys.showErrorStepper.name, formKeys.showErrorStepper.description),
    prop_runFetch: defineFormProp<boolean>("prop_runFetch", true, formKeys.runFetch.name, formKeys.runFetch.description),

    // Legacy names retained: borderClass maps to ComponentBorder structureClass.
    prop_borderClass: defineFormProp<string[]>("prop_borderClass", ["d-block", "bg-white", "px-3", "py-3", "m-2"], basicKeys.prop_structureClass.name, basicKeys.prop_structureClass.description),
    prop_borderStyles: defineBorderAlias<Record<string, string>>("prop_borderStyles", BorderProps.prop_borderStyles),

    // ComponentBorder host and ComponentStructure passthroughs.
    prop_componentBorderSelector: defineFormProp<string | null>("prop_componentBorderSelector", null, basicKeys.selector.name, basicKeys.selector.description),
    prop_componentBorderAppend: defineFormProp<boolean>("prop_componentBorderAppend", false, basicKeys.append.name, basicKeys.append.description),
    prop_componentBorderClassList: defineFormProp<string[]>("prop_componentBorderClassList", [], basicKeys.classList.name, basicKeys.classList.description),
    prop_componentBorderElementStyles: defineFormProp<Record<string, any>>("prop_componentBorderElementStyles", {}, basicKeys.styles.name, basicKeys.styles.description),
    prop_componentBorderShow: defineFormProp<boolean>("prop_componentBorderShow", true, basicKeys.prop_show.name, basicKeys.prop_show.description),
    prop_componentBorderStructureClass: defineFormProp<string[] | null>("prop_componentBorderStructureClass", null, basicKeys.prop_structureClass.name, basicKeys.prop_structureClass.description),
    prop_componentBorderStructureStyles: defineFormProp<Record<string, string>>("prop_componentBorderStructureStyles", {}, basicKeys.prop_structureStyles.name, basicKeys.prop_structureStyles.description),

    // ComponentBorder visual properties, with explicit names to avoid colliding with ComponentForm props.
    prop_componentBorderContentSize: defineBorderAlias<UtilConst.Sizes>("prop_componentBorderContentSize", BorderProps.prop_contentSize),
    prop_componentBorderContentColor: defineBorderAlias<string | null>("prop_componentBorderContentColor", BorderProps.prop_contentColor),
    prop_componentBorderContentColorHover: defineBorderAlias<string | null>("prop_componentBorderContentColorHover", BorderProps.prop_contentColor_hover),
    prop_componentBorderContentBackgroundColor: defineBorderAlias<string | null>("prop_componentBorderContentBackgroundColor", BorderProps.prop_contentBackgroundColor),
    prop_componentBorderContentBackgroundColorHover: defineBorderAlias<string | null>("prop_componentBorderContentBackgroundColorHover", BorderProps.prop_contentBackgroundColor_hover),
    prop_componentBorderColor: defineBorderAlias<string | null>("prop_componentBorderColor", BorderProps.prop_borderColor),
    prop_componentBorderColorHover: defineBorderAlias<string | null>("prop_componentBorderColorHover", BorderProps.prop_borderColor_hover),
    prop_componentBorderClass: defineBorderAlias<string[]>("prop_componentBorderClass", BorderProps.prop_borderClass),
    prop_componentBorderStyles: defineBorderAlias<Record<string, string>>("prop_componentBorderStyles", BorderProps.prop_borderStyles),
    prop_componentBorderType: defineBorderAlias<BorderTypes>("prop_componentBorderType", BorderProps.prop_borderType),
    prop_componentBorderOpacity: defineBorderAlias<number | null>("prop_componentBorderOpacity", BorderProps.prop_borderOpacity),
    prop_componentBorderArrowType: defineBorderAlias<ArrowTypes | null>("prop_componentBorderArrowType", BorderProps.prop_borderArrowType),
    prop_componentBorderArrowWidth: defineBorderAlias<number>("prop_componentBorderArrowWidth", BorderProps.prop_borderArrowWidth),
    prop_componentBorderArrowPosition: defineBorderAlias<string | null>("prop_componentBorderArrowPosition", BorderProps.prop_borderArrowPosition),
    prop_componentBorderMinWidth: defineBorderAlias<string | null>("prop_componentBorderMinWidth", BorderProps.prop_minWidth),
    prop_componentBorderWidth: defineBorderAlias<string | null>("prop_componentBorderWidth", BorderProps.prop_width),
    prop_componentBorderTopLeftRadiusHas: defineBorderAlias<boolean>("prop_componentBorderTopLeftRadiusHas", BorderProps.prop_borderTopLeftRadiusHas),
    prop_componentBorderTopRightRadiusHas: defineBorderAlias<boolean>("prop_componentBorderTopRightRadiusHas", BorderProps.prop_borderTopRightRadiusHas),
    prop_componentBorderBottomLeftRadiusHas: defineBorderAlias<boolean>("prop_componentBorderBottomLeftRadiusHas", BorderProps.prop_borderBottomLeftRadiusHas),
    prop_componentBorderBottomRightRadiusHas: defineBorderAlias<boolean>("prop_componentBorderBottomRightRadiusHas", BorderProps.prop_borderBottomRightRadiusHas),
    prop_componentBorderTopHas: defineBorderAlias<boolean>("prop_componentBorderTopHas", BorderProps.prop_borderTopHas),
    prop_componentBorderRightHas: defineBorderAlias<boolean>("prop_componentBorderRightHas", BorderProps.prop_borderRightHas),
    prop_componentBorderBottomHas: defineBorderAlias<boolean>("prop_componentBorderBottomHas", BorderProps.prop_borderBottomHas),
    prop_componentBorderLeftHas: defineBorderAlias<boolean>("prop_componentBorderLeftHas", BorderProps.prop_borderLeftHas),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
