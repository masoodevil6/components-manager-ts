import * as CoreComponents from "@/core_components";
import * as CoreReactive from "@/core_reactive";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export const Props = {
    prop_header: Define_ComponentProp<CoreReactive.App | string | null>({
        prop: "prop_header",
        default: null,
        name: Keys.category.components.page.props.header.name,
        description: Keys.category.components.page.props.header.description,
    }),
    prop_navigation: Define_ComponentProp<CoreReactive.App | string | null>({
        prop: "prop_navigation",
        default: null,
        name: Keys.category.components.page.props.navigation.name,
        description: Keys.category.components.page.props.navigation.description,
    }),
    prop_content: Define_ComponentProp<CoreReactive.App | string | null>({
        prop: "prop_content",
        default: "",
        name: Keys.category.components.page.props.content.name,
        description: Keys.category.components.page.props.content.description,
    }),
    prop_contentBackgroundColor: Define_ComponentProp<string>({
        prop: "prop_contentBackgroundColor",
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_5),
        name: Keys.category.components.page.props.contentBackgroundColor.name,
        description: Keys.category.components.page.props.contentBackgroundColor.description,
    }),
    prop_isFullHeight: Define_ComponentProp<boolean>({
        prop: "prop_isFullHeight",
        default: true,
        name: Keys.category.components.page.props.isFullHeight.name,
        description: Keys.category.components.page.props.isFullHeight.description,
    }),
    prop_aside: Define_ComponentProp<CoreReactive.App | string | null>({
        prop: "prop_aside",
        default: null,
        name: Keys.category.components.page.props.aside.name,
        description: Keys.category.components.page.props.aside.description,
    }),
    prop_asideWidth: Define_ComponentProp<ReturnType<typeof UtilStyle.Css_SizeUnit>>({
        prop: "prop_asideWidth",
        default: UtilStyle.Css_SizeUnit(25, UtilConst.Units.PERCENT),
        name: Keys.category.components.page.props.asideWidth.name,
        description: Keys.category.components.page.props.asideWidth.description,
    }),
    prop_footer: Define_ComponentProp<CoreReactive.App | string | null>({
        prop: "prop_footer",
        default: null,
        name: Keys.category.components.page.props.footer.name,
        description: Keys.category.components.page.props.footer.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
