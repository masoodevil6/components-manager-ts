import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export const Props = {
    prop_title: Define_ComponentProp<string>({
        prop: "prop_title",
        default: "",
        name: Keys.category.components.cardViewInfo.props.title.name,
        description: Keys.category.components.cardViewInfo.props.title.description,
    }),
    prop_content: Define_ComponentProp<string | HTMLElement>({
        prop: "prop_content",
        default: "",
        name: Keys.category.components.cardViewInfo.props.content.name,
        description: Keys.category.components.cardViewInfo.props.content.description,
    }),
} as const;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
