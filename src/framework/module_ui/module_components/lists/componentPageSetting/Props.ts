import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.basic.pageSetting;

export const Props = {
    prop_content: Define_ComponentProp<CoreReactive.App | string | HTMLElement | null>({
        prop: "prop_content",
        default: "",
        name: translation.props.content.name,
        description: translation.props.content.description,
    }),
    prop_contentScrollY: Define_ComponentProp<boolean>({
        prop: "prop_contentScrollY",
        default: true,
        name: translation.props.contentScrollY.name,
        description: translation.props.contentScrollY.description,
    }),
    prop_sidebarWidth: Define_ComponentProp<number | string>({
        prop: "prop_sidebarWidth",
        default: 320,
        name: translation.props.sidebarWidth.name,
        description: translation.props.sidebarWidth.description,
    }),
    prop_sidebarIsOpen: Define_ComponentProp<boolean>({
        prop: "prop_sidebarIsOpen",
        default: false,
        name: translation.props.sidebarIsOpen.name,
        description: translation.props.sidebarIsOpen.description,
    }),
    prop_sidebarHasOpenIcon: Define_ComponentProp<boolean>({
        prop: "prop_sidebarHasOpenIcon",
        default: true,
        name: translation.props.sidebarHasOpenIcon.name,
        description: translation.props.sidebarHasOpenIcon.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
