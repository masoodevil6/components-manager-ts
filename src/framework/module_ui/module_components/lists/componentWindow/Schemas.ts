import * as CoreComponents from "@/core_components";
import {Keys}              from "../../../module_categories/languages";
import {Props}             from "./Props";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * Schemas اختصاصی ComponentWindow
 *
 * Plan 11.2 — Schema پایه (COMPONENT + STRUCTURE) از ComponentStructureTrait
 * به‌عنوان اولین ورودی‌ها اضافه شده‌اند تا لایه <component-window> + <section>
 * به‌صورت خودکار رندر شوند.
 *
 * Schema فقط تعریف می‌کند Part چیست — نه چگونه رندر شود.
 * Rendering در خود ComponentWindow قرار دارد.
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    WINDOW_STRUCTURE: {
        part:         "part-structure",
        props:        [],
        name:         Keys.category.components.window.schemas.structure.name,
        description:  Keys.category.components.window.schemas.structure.description,
    },

    BLUR: {
        part:         "part-blur",
        props:        [
            Props.prop_blurBackgroundColor,
            Props.prop_closeOnOverlay,
        ],
        name:         Keys.category.components.window.schemas.blur.name,
        description:  Keys.category.components.window.schemas.blur.description,
    },

    WINDOW: {
        part:         "part-window",
        props:        [
            Props.prop_windowBackgroundColor,
            Props.prop_windowWidth,
            Props.prop_windowHeight,
            Props.prop_windowRound,
        ],
        name:         Keys.category.components.window.schemas.window.name,
        description:  Keys.category.components.window.schemas.window.description,
    },

    WINDOW_HEADER: {
        part:         "part-window-header",
        props:        [
            Props.prop_headerBackgroundColor,
        ],
        name:         Keys.category.components.window.schemas.windowHeader.name,
        description:  Keys.category.components.window.schemas.windowHeader.description,
    },

    WINDOW_HEADER_TITLE: {
        part:         "part-window-header-title",
        props:        [
            Props.prop_header,
            Props.prop_title,
            Props.prop_headerTitleColor,
        ],
        name:         Keys.category.components.window.schemas.windowHeaderTitle.name,
        description:  Keys.category.components.window.schemas.windowHeaderTitle.description,
    },

    WINDOW_HEADER_ICONS: {
        part:         "part-window-header-icons",
        props:        [],
        name:         Keys.category.components.window.schemas.windowHeaderIcons.name,
        description:  Keys.category.components.window.schemas.windowHeaderIcons.description,
    },

    WINDOW_HEADER_ICONS_CLOSE: {
        part:         "part-window-header-icons-close",
        props:        [
            Props.prop_showBtnClose,
        ],
        name:         Keys.category.components.window.schemas.windowHeaderIconsClose.name,
        description:  Keys.category.components.window.schemas.windowHeaderIconsClose.description,
    },

    WINDOW_HEADER_ICONS_RESIZE: {
        part:         "part-window-header-icons-resize",
        props:        [
            Props.prop_showBtnResize,
        ],
        name:         Keys.category.components.window.schemas.windowHeaderIconsResize.name,
        description:  Keys.category.components.window.schemas.windowHeaderIconsResize.description,
    },

    WINDOW_BODY: {
        part:         "part-window-body",
        props:        [
            Props.prop_body,
            Props.prop_content,
        ],
        name:         Keys.category.components.window.schemas.windowBody.name,
        description:  Keys.category.components.window.schemas.windowBody.description,
    },

    WINDOW_FOOTER: {
        part:         "part-window-footer",
        props:        [
            Props.prop_footer,
            Props.prop_acceptText,
            Props.prop_cancelText,
            Props.prop_showCancel,
            Props.prop_showAccept,
        ],
        name:         Keys.category.components.window.schemas.windowFooter.name,
        description:  Keys.category.components.window.schemas.windowFooter.description,
    },

} satisfies CoreComponents.ComponentSchemas;


/**
 * نوع schemaهای ComponentWindow — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;
