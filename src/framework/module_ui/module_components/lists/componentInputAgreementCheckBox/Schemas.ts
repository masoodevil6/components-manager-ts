import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentInputAgreementCheckBox
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-input-agreement-checkbox> + <section>
 * به‌صورت خودکار رندر شوند.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    MAIN: {
        part:         "part-main",
        props:        [],
        name:         Keys.category.components.inputAgreementCheckBox.schemas.main.name,
        description:  Keys.category.components.inputAgreementCheckBox.schemas.main.description,
    },

    MAIN_INPUT_ORDER: {
        part:         "part-input-order",
        props:        [
            Props.prop_checkBoxList,
            Props.prop_checkBoxOrder,
            Props.prop_value,
        ],
        name:         Keys.category.components.inputAgreementCheckBox.schemas.mainInputOrder.name,
        description:  Keys.category.components.inputAgreementCheckBox.schemas.mainInputOrder.description,
    },

    MAIN_CHECK_BOX_ALL: {
        part:         "part-main-check-box-all",
        props:        [
            Props.prop_isDisable,
            Props.prop_value,
            Props.prop_checkBoxAllTitle,
            Props.prop_checkBoxList,
            Props.prop_labelShow,
            Props.prop_labelTooltipDescription,
        ],
        name:         Keys.category.components.inputAgreementCheckBox.schemas.mainCheckBoxAll.name,
        description:  Keys.category.components.inputAgreementCheckBox.schemas.mainCheckBoxAll.description,
    },

    MAIN_CHECK_BOX_LIST: {
        part:         "part-main-check-box-list",
        props:        [
            Props.prop_checkBoxList,
            Props.prop_checkBoxOrderStatus,
            Props.prop_checkBoxOrder,
            Props.prop_maxHeightItems,
        ],
        name:         Keys.category.components.inputAgreementCheckBox.schemas.mainCheckBoxList.name,
        description:  Keys.category.components.inputAgreementCheckBox.schemas.mainCheckBoxList.description,
    },

    MAIN_CHECK_BOX_LIST_CHECK_BOX_ITEM: {
        part:         "part-main-check-box-list-check-box-item",
        props:        [
            Props.prop_isDisable,
            Props.prop_value,
        ],
        name:         Keys.category.components.inputAgreementCheckBox.schemas.mainCheckBoxListCheckBoxItem.name,
        description:  Keys.category.components.inputAgreementCheckBox.schemas.mainCheckBoxListCheckBoxItem.description,
    },

} satisfies CoreComponents.ComponentSchemas;


export type SchemasType = ExtractSchemasType<typeof Schemas>;
