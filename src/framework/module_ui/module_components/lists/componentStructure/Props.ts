import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import type {ExtractPropsType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * کلیدهای propهای پایه ComponentStructure
 * هر کامپوننت فرزند این ۷ prop را به صورت خودکار دریافت می‌کند
 *
 * هر prop شامل:
 *   prop         — کلید prop
 *   default      — مقدار پیش‌فرض
 *   name         — کلید ترجمه برای نام نمایشی
 *   description  — کلید ترجمه برای توضیحات
 */
export const Props = {
    selector: {
        prop:         "selector",
        default:      null as string | null,
        name:         Keys.category.components.basic.props.selector.name,
        description:  Keys.category.components.basic.props.selector.description,
    },
    append: {
        prop:         "append",
        default:      false,
        name:         Keys.category.components.basic.props.append.name,
        description:  Keys.category.components.basic.props.append.description,
    },
    classList: {
        prop:         "classList",
        default:      [] as string[],
        name:         Keys.category.components.basic.props.classList.name,
        description:  Keys.category.components.basic.props.classList.description,
    },
    styles: {
        prop:         "styles",
        default:      {} as Record<string, any>,
        name:         Keys.category.components.basic.props.styles.name,
        description:  Keys.category.components.basic.props.styles.description,
    },
    prop_show: {
        prop:         "prop_show",
        default:      true,
        name:         Keys.category.components.basic.props.prop_show.name,
        description:  Keys.category.components.basic.props.prop_show.description,
    },
    prop_structureClass: {
        prop:         "prop_structureClass",
        default:      [] as string[],
        name:         Keys.category.components.basic.props.prop_structureClass.name,
        description:  Keys.category.components.basic.props.prop_structureClass.description,
    },
    prop_structureStyles: {
        prop:         "prop_structureStyles",
        default:      {} as Record<string, any>,
        name:         Keys.category.components.basic.props.prop_structureStyles.name,
        description:  Keys.category.components.basic.props.prop_structureStyles.description,
    },
} satisfies CoreComponents.ComponentProps;


/**
 * نوع propهای پایه — برای استفاده در TProp کامپوننت‌های فرزند
 *
 * @example
 *   import {PropsType} from "@/ui_components/lists/componentStructure/Props"
 *   class ComponentButton extends ComponentStructure<PropsType, ...>
 */
export type PropsType = ExtractPropsType<typeof Props>;
