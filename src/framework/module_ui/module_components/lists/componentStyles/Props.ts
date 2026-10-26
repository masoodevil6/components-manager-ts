import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export type ComponentStyleGroups = string[];
export type ComponentStyleValues = Record<string, string | number | null | undefined>;

const translation = Keys.category.components.basic.styles;

export const Props = {
    prop_styleGroups: Define_ComponentProp<ComponentStyleGroups>({
        prop: "prop_styleGroups",
        default: [],
        name: translation.props.styleGroups.name,
        description: translation.props.styleGroups.description,
    }),
    prop_value: Define_ComponentProp<ComponentStyleValues>({
        prop: "prop_value",
        default: {},
        name: translation.props.value.name,
        description: translation.props.value.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
