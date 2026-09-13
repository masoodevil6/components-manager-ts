import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentWebCode
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-web-code> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentWebCode قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    CONTENT: {
        part:         "part-content",
        props:        [],
        name:         Keys.category.components.webCode.schemas.content.name,
        description:  Keys.category.components.webCode.schemas.content.description,
    },

    CONTENT_BLUR: {
        part:         "part-content-blur",
        props:        [
            Props.prop_background,
        ],
        name:         Keys.category.components.webCode.schemas.contentBlur.name,
        description:  Keys.category.components.webCode.schemas.contentBlur.description,
    },

    CONTENT_BLUR_POSITION: {
        part:         "part-content-blur-position",
        props:        [
            Props.prop_icon,
            Props.prop_iconClass,
            Props.prop_iconStyles,
        ],
        name:         Keys.category.components.webCode.schemas.contentBlurPosition.name,
        description:  Keys.category.components.webCode.schemas.contentBlurPosition.description,
    },

    CONTENT_BLUR_POSITION_ICON: {
        part:         "part-content-blur-position-icon",
        props:        [
            Props.prop_icon,
            Props.prop_iconClass,
            Props.prop_iconStyles,
        ],
        name:         Keys.category.components.webCode.schemas.contentBlurPositionIcon.name,
        description:  Keys.category.components.webCode.schemas.contentBlurPositionIcon.description,
    },

    CONTENT_BLUR_POSITION_RETRY: {
        part:         "part-content-blur-position-retry",
        props:        [
            Props.prop_btnRetryHas,
            Props.prop_btnRetryTitle,
            Props.prop_btnRetryClass,
            Props.prop_btnRetryIcon,
        ],
        name:         Keys.category.components.webCode.schemas.contentBlurPositionRetry.name,
        description:  Keys.category.components.webCode.schemas.contentBlurPositionRetry.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentWebCode — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;
