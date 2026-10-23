import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UtilConst from "@/util_consts";
import * as UtilTools from "@/util_tools";
import {Keys} from "../../../module_categories/languages";
import * as ComponentInputSelectOption from "../componentInputSelectOption";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

type ComponentStylesPropGroupsType = {
    margin: CoreComponents.PropGroupInterface;
};

const translation = Keys.category.components.basic.styles;

export const PropGroups = CoreComponents.DefinePropGroup<ComponentStylesPropGroupsType>({
    margin: {
        name: translation.groups.margin.name,
        description: translation.groups.margin.description,
        col: 2,
    },
});

const marginSizeEditor = UtilTools.Render.ComponentRender.inputSelectOption(
    ComponentInputSelectOption.Component as any,
    Object.values(UtilConst.Sizes),
);

export const Props = {
    prop_marginTop: Define_ComponentProp<UtilConst.Sizes>({
        prop: "prop_marginTop",
        default: UtilConst.Sizes.DEFAULT,
        name: translation.props.marginTop.name,
        description: translation.props.marginTop.description,
        OptionShow: true,
        OptionComponentSelector: marginSizeEditor.OptionComponentSelector,
        OptionComponentOption: marginSizeEditor.OptionComponentOption,
        OptionGroup: PropGroups.margin,
    }),
    prop_marginRight: Define_ComponentProp<UtilConst.Sizes>({
        prop: "prop_marginRight",
        default: UtilConst.Sizes.DEFAULT,
        name: translation.props.marginRight.name,
        description: translation.props.marginRight.description,
        OptionShow: true,
        OptionComponentSelector: marginSizeEditor.OptionComponentSelector,
        OptionComponentOption: marginSizeEditor.OptionComponentOption,
        OptionGroup: PropGroups.margin,
    }),
    prop_marginBottom: Define_ComponentProp<UtilConst.Sizes>({
        prop: "prop_marginBottom",
        default: UtilConst.Sizes.DEFAULT,
        name: translation.props.marginBottom.name,
        description: translation.props.marginBottom.description,
        OptionShow: true,
        OptionComponentSelector: marginSizeEditor.OptionComponentSelector,
        OptionComponentOption: marginSizeEditor.OptionComponentOption,
        OptionGroup: PropGroups.margin,
    }),
    prop_marginLeft: Define_ComponentProp<UtilConst.Sizes>({
        prop: "prop_marginLeft",
        default: UtilConst.Sizes.DEFAULT,
        name: translation.props.marginLeft.name,
        description: translation.props.marginLeft.description,
        OptionShow: true,
        OptionComponentSelector: marginSizeEditor.OptionComponentSelector,
        OptionComponentOption: marginSizeEditor.OptionComponentOption,
        OptionGroup: PropGroups.margin,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
