import * as CoreComponents   from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UtilConst        from "@/util_consts";
import * as UtilStyle        from "@/util_styles";
import * as CoreObservable    from "@/core_observable";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Type برای آیتم‌های لیست چک‌باکس توافق
 */
export type AgreementCheckBoxItem = {
    id:               string | number;
    title?:           CoreObservable.App<string> | string | null;
    isPin?:           boolean;
};


/**
 * Props اختصاصی ComponentInputAgreementCheckBox
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * شامل:
 *   - prop_value, prop_isDisable, prop_name (از FormInput_Value قدیم)
 *   - prop_labelTitle, prop_labelTooltipDescription (از FormInput_Label قدیم)
 *   - prop_checkBoxAllTitle, prop_checkBoxList, prop_checkBoxOrderStatus, prop_checkBoxOrder, prop_maxHeightItems
 */
export const Props = {

    /// --- FormInput Value ---
    prop_value: Define_ComponentProp<any>({
        prop:         "prop_value",
        default:      [],
        name:         Keys.category.components.inputAgreementCheckBox.props.value.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.value.description,
    }),

    prop_isDisable: Define_ComponentProp<boolean>({
        prop:         "prop_isDisable",
        default:      false,
        name:         Keys.category.components.inputAgreementCheckBox.props.isDisable.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.isDisable.description,
    }),

    prop_name: Define_ComponentProp<string>({
        prop:         "prop_name",
        default:      "",
        name:         Keys.category.components.inputAgreementCheckBox.props.name.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.name.description,
    }),

    /// --- FormInput Label ---
    prop_labelShow: Define_ComponentProp<boolean>({
        prop:         "prop_labelShow",
        default:      true,
        name:         Keys.category.components.inputAgreementCheckBox.props.labelShow.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.labelShow.description,
    }),

    prop_labelTitle: Define_ComponentProp<string>({
        prop:         "prop_labelTitle",
        default:      "",
        name:         Keys.category.components.inputAgreementCheckBox.props.labelTitle.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.labelTitle.description,
    }),

    prop_labelTooltipDescription: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipDescription",
        default:      null,
        name:         Keys.category.components.inputAgreementCheckBox.props.labelTooltipDescription.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.labelTooltipDescription.description,
    }),

    /// --- AgreementCheckBox ---
    prop_checkBoxAllTitle: Define_ComponentProp<CoreObservable.App<string> | string | null>({
        prop:         "prop_checkBoxAllTitle",
        default:      null,
        name:         Keys.category.components.inputAgreementCheckBox.props.checkBoxAllTitle.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.checkBoxAllTitle.description,
    }),

    prop_checkBoxList: Define_ComponentProp<AgreementCheckBoxItem[]>({
        prop:         "prop_checkBoxList",
        default:      [],
        name:         Keys.category.components.inputAgreementCheckBox.props.checkBoxList.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.checkBoxList.description,
    }),

    prop_checkBoxOrderStatus: Define_ComponentProp<boolean>({
        prop:         "prop_checkBoxOrderStatus",
        default:      true,
        name:         Keys.category.components.inputAgreementCheckBox.props.checkBoxOrderStatus.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.checkBoxOrderStatus.description,
    }),

    prop_checkBoxOrder: Define_ComponentProp<(string | number)[]>({
        prop:         "prop_checkBoxOrder",
        default:      [],
        name:         Keys.category.components.inputAgreementCheckBox.props.checkBoxOrder.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.checkBoxOrder.description,
    }),

    prop_maxHeightItems: Define_ComponentProp<string | null>({
        prop:         "prop_maxHeightItems",
        default:      UtilStyle.Css_SizeUnit(200, UtilConst.Units.PEXEL),
        name:         Keys.category.components.inputAgreementCheckBox.props.maxHeightItems.name,
        description:  Keys.category.components.inputAgreementCheckBox.props.maxHeightItems.description,
    }),

} satisfies CoreComponents.ComponentProps;


export type PropsType = ExtractPropsType<typeof Props>;


export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
