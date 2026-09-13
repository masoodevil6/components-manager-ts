import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UiIcons          from "@/ui_icons";
import * as UtilConst        from "@/util_consts";
import type {ValidatorRule} from "@/util_validators";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Props اختصاصی ComponentValidate (Plan 15.1.0 — بازیابی کامل ۱۰ prop Legacy)
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * تغییرات نسبت به Legacy:
 *   - IconsType (widget instance) → UiIcons.IIconDefinition (data-only descriptor)
 *   - prop_value نوع: string | CoreObservable.App<string> (Observable → CoreObservable.App)
 *   - prop_listRules نوع: AbstractValidatorRule[] (کلاس‌های اعتبارسنجی پروژه)
 */
export const Props = {

    prop_listRules: Define_ComponentProp<ValidatorRule[]>({
        prop:         "prop_listRules",
        default:      [],
        name:         Keys.category.components.validate.props.listRules.name,
        description:  Keys.category.components.validate.props.listRules.description,
    }),

    prop_msgRules: Define_ComponentProp<Record<string, string> | null>({
        prop:         "prop_msgRules",
        default:      null,
        name:         Keys.category.components.validate.props.msgRules.name,
        description:  Keys.category.components.validate.props.msgRules.description,
    }),

    prop_reference: Define_ComponentProp<string>({
        prop:         "prop_reference",
        default:      "",
        name:         Keys.category.components.validate.props.reference.name,
        description:  Keys.category.components.validate.props.reference.description,
    }),

    prop_referenceComponent: Define_ComponentProp<any>({
        prop:         "prop_referenceComponent",
        default:      null,
        name:         Keys.category.components.validate.props.referenceComponent.name,
        description:  Keys.category.components.validate.props.referenceComponent.description,
    }),

    prop_isAbsolute: Define_ComponentProp<boolean>({
        prop:         "prop_isAbsolute",
        default:      false,
        name:         Keys.category.components.validate.props.isAbsolute.name,
        description:  Keys.category.components.validate.props.isAbsolute.description,
    }),

    prop_title: Define_ComponentProp<string>({
        prop:         "prop_title",
        default:      "---",
        name:         Keys.category.components.validate.props.title.name,
        description:  Keys.category.components.validate.props.title.description,
    }),

    prop_iconSuccess: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_iconSuccess",
        default:      null,
        name:         Keys.category.components.validate.props.iconSuccess.name,
        description:  Keys.category.components.validate.props.iconSuccess.description,
    }),

    prop_iconError: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_iconError",
        default:      null,
        name:         Keys.category.components.validate.props.iconError.name,
        description:  Keys.category.components.validate.props.iconError.description,
    }),

    prop_size: Define_ComponentProp<UtilConst.Sizes>({
        prop:         "prop_size",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.validate.props.size.name,
        description:  Keys.category.components.validate.props.size.description,
    }),

    prop_value: Define_ComponentProp<string>({
        prop:         "prop_value",
        default:      "",
        name:         Keys.category.components.validate.props.value.name,
        description:  Keys.category.components.validate.props.value.description,
    }),

} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای ComponentValidate — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
