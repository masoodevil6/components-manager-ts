import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
// --------------------------------


/**
 * Schemas اختصاصی ComponentIcon
 * این Schemas به ۲ schema پایه (COMPONENT, STRUCTURE) اضافه می‌شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentIcon قرار دارد.
 */
export const Schemas = {

    ICON: {
        part:         "part-icon",
        props:        [
            Props.prop_icon,
            Props.prop_iconTitle,
            Props.prop_iconClass,
            Props.prop_iconStyles,
        ],
        name:         Keys.category.components.icon.schemas.icon.name,
        description:  Keys.category.components.icon.schemas.icon.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentIcon — برای استفاده در TSchemas
 */
export type SchemasType = {
    [K in keyof typeof Schemas]: typeof Schemas[K]["part"]
};
