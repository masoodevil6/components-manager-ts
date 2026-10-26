import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys} from "../../../module_categories/languages";
import * as ComponentInput from "../componentInput";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

const translation = Keys.category.components.basic.elementCreator;

type ElementCreatorPropGroupsType = {
    header: CoreComponents.PropGroupInterface;
    settingsWindow: CoreComponents.PropGroupInterface;
};

export const PropGroups = CoreComponents.DefinePropGroup<ElementCreatorPropGroupsType>({
    header: {
        name: translation.groups.header.name,
        description: translation.groups.header.description,
        col: 3,
    },
    settingsWindow: {
        name: translation.groups.settingsWindow.name,
        description: translation.groups.settingsWindow.description,
        col: 2,
    },
});

export enum ElementCreatorMode {
    RENDER = "RENDER",
    EDIT = "EDIT",
    SETTING_CREATE = "SETTING_CREATE",
    SETTING_EDIT = "SETTING_EDIT",
}

export const Props = {
    prop_mode: Define_ComponentProp<ElementCreatorMode>({
        prop: "prop_mode",
        default: ElementCreatorMode.RENDER,
        name: translation.props.mode.name,
        description: translation.props.mode.description,
    }),
    prop_component: Define_ComponentProp<Function | null>({
        prop: "prop_component",
        default: ComponentInput.Component,
        name: translation.props.component.name,
        description: translation.props.component.description,
    }),
    prop_components: Define_ComponentProp<Function[] | null>({
        prop: "prop_components",
        default: null,
        name: translation.props.components.name,
        description: translation.props.components.description,
    }),
    prop_componentProperties: Define_ComponentProp<Record<string, any>>({
        prop: "prop_componentProperties",
        default: {
            prop_labelTitle: "Input component",
            prop_placeholder: "Type something",
        },
        name: translation.props.componentProperties.name,
        description: translation.props.componentProperties.description,
    }),
    prop_hasHeaderSetting: Define_ComponentProp<boolean>({
        prop: "prop_hasHeaderSetting",
        default: true,
        name: translation.props.hasHeaderSetting.name,
        description: translation.props.hasHeaderSetting.description,
        OptionShow: true,
        OptionGroup: PropGroups.header,
    }),
    prop_hasHeaderDelete: Define_ComponentProp<boolean>({
        prop: "prop_hasHeaderDelete",
        default: true,
        name: translation.props.hasHeaderDelete.name,
        description: translation.props.hasHeaderDelete.description,
        OptionShow: true,
        OptionGroup: PropGroups.header,
    }),
    prop_hasHeaderColumn: Define_ComponentProp<boolean>({
        prop: "prop_hasHeaderColumn",
        default: true,
        name: translation.props.hasHeaderColumn.name,
        description: translation.props.hasHeaderColumn.description,
        OptionShow: true,
        OptionGroup: PropGroups.header,
    }),
    prop_hasTabComponent: Define_ComponentProp<boolean>({
        prop: "prop_hasTabComponent",
        default: true,
        name: translation.props.hasTabComponent.name,
        description: translation.props.hasTabComponent.description,
        OptionShow: true,
        OptionGroup: PropGroups.settingsWindow,
    }),
    prop_hasTabProps: Define_ComponentProp<boolean>({
        prop: "prop_hasTabProps",
        default: true,
        name: translation.props.hasTabProps.name,
        description: translation.props.hasTabProps.description,
        OptionShow: true,
        OptionGroup: PropGroups.settingsWindow,
    }),
    prop_settingsUsePageSetting: Define_ComponentProp<boolean>({
        prop: "prop_settingsUsePageSetting",
        default: false,
        name: translation.props.settingsUsePageSetting.name,
        description: translation.props.settingsUsePageSetting.description,
    }),
    prop_settingsUseExternalPageSetting: Define_ComponentProp<boolean>({
        prop: "prop_settingsUseExternalPageSetting",
        default: false,
        name: translation.props.settingsUsePageSetting.name,
        description: translation.props.settingsUsePageSetting.description,
    }),
} satisfies CoreComponents.ComponentProps;

export type PropsType = ExtractPropsType<typeof Props>;
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
