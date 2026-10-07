import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilStyle from "@/util_styles";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export enum ElementPositionTypes {
    STATIC = "static",
    FIX = "fix",
    RELATIVE = "relative",
    ABSOLUTE = "absolute",
}

type CssLength = UtilStyle.TSizeExp | UtilStyle.TSizeExp[] | string | number | null;

export const Props = {
    prop_content: Define_ComponentProp<any>({prop: "prop_content", default: null, name: Keys.category.components.elementPosition.props.content.name, description: Keys.category.components.elementPosition.props.content.description}),
    prop_positionClass: Define_ComponentProp<string | string[] | null>({prop: "prop_positionClass", default: null, name: Keys.category.components.elementPosition.props.positionClass.name, description: Keys.category.components.elementPosition.props.positionClass.description}),
    prop_positionStyles: Define_ComponentProp<Record<string, any>>({prop: "prop_positionStyles", default: {}, name: Keys.category.components.elementPosition.props.positionStyles.name, description: Keys.category.components.elementPosition.props.positionStyles.description}),
    prop_positionWidth: Define_ComponentProp<CssLength>({prop: "prop_positionWidth", default: "100%", name: Keys.category.components.elementPosition.props.positionWidth.name, description: Keys.category.components.elementPosition.props.positionWidth.description}),
    prop_positionHeight: Define_ComponentProp<CssLength>({prop: "prop_positionHeight", default: null, name: Keys.category.components.elementPosition.props.positionHeight.name, description: Keys.category.components.elementPosition.props.positionHeight.description}),
    prop_positionBackgroundColor: Define_ComponentProp<string | null>({prop: "prop_positionBackgroundColor", default: null, name: Keys.category.components.elementPosition.props.positionBackgroundColor.name, description: Keys.category.components.elementPosition.props.positionBackgroundColor.description}),
    prop_positionType: Define_ComponentProp<ElementPositionTypes>({prop: "prop_positionType", default: ElementPositionTypes.ABSOLUTE, name: Keys.category.components.elementPosition.props.positionType.name, description: Keys.category.components.elementPosition.props.positionType.description}),
    prop_positionTop: Define_ComponentProp<CssLength>({prop: "prop_positionTop", default: null, name: Keys.category.components.elementPosition.props.positionTop.name, description: Keys.category.components.elementPosition.props.positionTop.description}),
    prop_positionBottom: Define_ComponentProp<CssLength>({prop: "prop_positionBottom", default: null, name: Keys.category.components.elementPosition.props.positionBottom.name, description: Keys.category.components.elementPosition.props.positionBottom.description}),
    prop_positionRight: Define_ComponentProp<CssLength>({prop: "prop_positionRight", default: null, name: Keys.category.components.elementPosition.props.positionRight.name, description: Keys.category.components.elementPosition.props.positionRight.description}),
    prop_positionLeft: Define_ComponentProp<CssLength>({prop: "prop_positionLeft", default: null, name: Keys.category.components.elementPosition.props.positionLeft.name, description: Keys.category.components.elementPosition.props.positionLeft.description}),
    prop_positionStart: Define_ComponentProp<CssLength>({prop: "prop_positionStart", default: null, name: Keys.category.components.elementPosition.props.positionStart.name, description: Keys.category.components.elementPosition.props.positionStart.description}),
    prop_positionEnd: Define_ComponentProp<CssLength>({prop: "prop_positionEnd", default: null, name: Keys.category.components.elementPosition.props.positionEnd.name, description: Keys.category.components.elementPosition.props.positionEnd.description}),
    prop_positionTranslate: Define_ComponentProp<string | null>({prop: "prop_positionTranslate", default: null, name: Keys.category.components.elementPosition.props.positionTranslate.name, description: Keys.category.components.elementPosition.props.positionTranslate.description}),
    prop_positionZIndex: Define_ComponentProp<number | string | null>({prop: "prop_positionZIndex", default: null, name: Keys.category.components.elementPosition.props.positionZIndex.name, description: Keys.category.components.elementPosition.props.positionZIndex.description}),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
