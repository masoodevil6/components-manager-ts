import * as CoreComponents from "@/core_components";
import * as CoreObservable from "@/core_observable";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import * as UiIcons from "@/ui_icons";
import * as UtilConst from "@/util_consts";
import {Keys} from "../../../module_categories/languages";
import {ButtonSemantic} from "../componentButton/Props";
import {ComponentLabelTrait, ComponentLabelPropsType} from "../../traits/componentLabelTrait";
import type {ExtractPropsType, ExtractPropsConfigType} from "../../tools/type/TypeHelpers";

export interface InputSelectOptionItem {
    id: string | number;
    name: string | number;
}

export type InputSelectOptionValue = string | number | null;

const translation = Keys.category.components.inputSelectOption;

export const Props = {
    prop_name: Define_ComponentProp<string | null>({prop: "prop_name", default: null, name: translation.props.name.name, description: translation.props.name.description}),
    prop_itemSelected: Define_ComponentProp<InputSelectOptionValue>({prop: "prop_itemSelected", default: null, name: translation.props.itemSelected.name, description: translation.props.itemSelected.description}),
    prop_options: Define_ComponentProp<InputSelectOptionItem[]>({prop: "prop_options", default: [], name: translation.props.options.name, description: translation.props.options.description}),
    prop_placeholder: Define_ComponentProp<string | null>({prop: "prop_placeholder", default: null, name: translation.props.placeholder.name, description: translation.props.placeholder.description}),
    prop_isDisable: Define_ComponentProp<boolean>({prop: "prop_isDisable", default: false, name: translation.props.isDisable.name, description: translation.props.isDisable.description}),
    prop_backgroundColorForm: Define_ComponentProp<string>({prop: "prop_backgroundColorForm", default: "var(--secondaryColor1)", name: Keys.category.components.input.props.backgroundColorForm.name, description: Keys.category.components.input.props.backgroundColorForm.description}),
    prop_formBorderRadius: Define_ComponentProp<UtilConst.Sizes>({prop: "prop_formBorderRadius", default: UtilConst.Sizes.M, name: Keys.category.components.input.props.formBorderRadius.name, description: Keys.category.components.input.props.formBorderRadius.description}),
    prop_icon: Define_ComponentProp<UiIcons.IIconDefinition | null>({prop: "prop_icon", default: null, name: Keys.category.components.input.props.icon.name, description: Keys.category.components.input.props.icon.description}),
    prop_colorIcon: Define_ComponentProp<string | null>({prop: "prop_colorIcon", default: null, name: Keys.category.components.input.props.colorIcon.name, description: Keys.category.components.input.props.colorIcon.description}),
    prop_btnAddStatus: Define_ComponentProp<boolean>({prop: "prop_btnAddStatus", default: false, name: Keys.category.components.input.props.btnAddStatus.name, description: Keys.category.components.input.props.btnAddStatus.description}),
    prop_btnAddWidth: Define_ComponentProp<number>({prop: "prop_btnAddWidth", default: 120, name: Keys.category.components.input.props.btnAddWidth.name, description: Keys.category.components.input.props.btnAddWidth.description}),
    prop_btnAddTitle: Define_ComponentProp<string>({prop: "prop_btnAddTitle", default: "add item", name: Keys.category.components.input.props.btnAddTitle.name, description: Keys.category.components.input.props.btnAddTitle.description}),
    prop_btnAddClass: Define_ComponentProp<string[]>({prop: "prop_btnAddClass", default: [], name: Keys.category.components.input.props.btnAddClass.name, description: Keys.category.components.input.props.btnAddClass.description}),
    prop_btnColor: Define_ComponentProp<ButtonSemantic>({prop: "prop_btnColor", default: ButtonSemantic.SUBMIT, name: Keys.category.components.input.props.btnColor.name, description: Keys.category.components.input.props.btnColor.description}),
    prop_inputClass: Define_ComponentProp<string[]>({prop: "prop_inputClass", default: ["form-control"], name: translation.props.inputClass.name, description: translation.props.inputClass.description}),
    prop_inputStyles: Define_ComponentProp<Record<string, string>>({prop: "prop_inputStyles", default: {}, name: translation.props.inputStyles.name, description: translation.props.inputStyles.description}),
    ...ComponentLabelTrait.props,
} satisfies CoreComponents.ComponentProps;

export type PropsType = Omit<ExtractPropsType<typeof Props>, "prop_itemSelected" | "prop_options"> & {
    prop_itemSelected: InputSelectOptionValue | CoreObservable.App<InputSelectOptionValue>;
    prop_options: InputSelectOptionItem[] | CoreObservable.App<InputSelectOptionItem[]>;
} & ComponentLabelPropsType;

export type PropsConfigType = Omit<ExtractPropsConfigType<typeof Props> & ExtractPropsConfigType<typeof ComponentLabelTrait.props>, "prop_itemSelected" | "prop_options"> & {
    prop_itemSelected?: InputSelectOptionValue | CoreObservable.App<InputSelectOptionValue>;
    prop_options?: InputSelectOptionItem[] | CoreObservable.App<InputSelectOptionItem[]>;
};
