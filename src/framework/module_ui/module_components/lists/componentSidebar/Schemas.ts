import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {Keys}                    from "../../../module_categories/languages";
import {Props}                  from "./Props";
import type {ExtractSchemasType} from "../../tools/type/TypeHelpers";
// --------------------------------


/**
 * ComponentSidebar — Schemas
 *
 * تعریف بخش‌های (parts) کامپوننت Sidebar
 * base schemas از ComponentStructureTrait
 */
export const Schemas = {

    // --- Plan 11.2: Schema پایه (الزامی — اولین ورودی) ---
    COMPONENT: ComponentStructureTrait.schemas.COMPONENT,
    STRUCTURE: ComponentStructureTrait.schemas.STRUCTURE,

    // --- Schema اختصاصی ---
    CONTENT: {
        part:          "part-content",
        titleKey:      Keys.category.components.sidebar.schemas.content.name,
        descriptionKey: Keys.category.components.sidebar.schemas.content.description,
        props: [
            Props.prop_sidebarDirection,
        ],
    },

    CONTENT_BLUR: {
        part:          "part-content-blur",
        titleKey:      Keys.category.components.sidebar.schemas.contentBlur.name,
        descriptionKey: Keys.category.components.sidebar.schemas.contentBlur.description,
        props: [
            Props.prop_blurBackground,
            Props.prop_blurHas,
        ],
    },

    CONTENT_SIDEBAR: {
        part:          "part-content-sidebar",
        titleKey:      Keys.category.components.sidebar.schemas.contentSidebar.name,
        descriptionKey: Keys.category.components.sidebar.schemas.contentSidebar.description,
        props: [
            Props.prop_sidebarBackground,
            Props.prop_sidebarBorderRadius,
            Props.prop_sidebarWidth,
            Props.prop_sidebarIsOpen,
            Props.prop_sidebarDirection,
            Props.prop_sidebarDuration,
            Props.prop_sidebarPositionStart,
            Props.prop_sidebarPositionEnd,
            Props.prop_sidebarMargin,
            Props.prop_sidebarOpacity,
        ],
    },

    CONTENT_SIDEBAR_CONTENT: {
        part:          "part-content-sidebar-content",
        titleKey:      Keys.category.components.sidebar.schemas.contentSidebarContent.name,
        descriptionKey: Keys.category.components.sidebar.schemas.contentSidebarContent.description,
        props: [
            Props.prop_sidebarBtnOpenHas,
            Props.prop_sidebarContent,
        ],
    },

    CONTENT_SIDEBAR_CONTENT_POSITION: {
        part:          "part-content-sidebar-content-position",
        titleKey:      Keys.category.components.sidebar.schemas.contentSidebarContentPosition.name,
        descriptionKey: Keys.category.components.sidebar.schemas.contentSidebarContentPosition.description,
        props: [
            Props.prop_sidebarBtnOpenSize,
            Props.prop_sidebarDirection,
            Props.prop_sidebarIsOpen,
        ],
    },

    CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON: {
        part:          "part-content-sidebar-content-position-button",
        titleKey:      Keys.category.components.sidebar.schemas.contentSidebarContentPositionButton.name,
        descriptionKey: Keys.category.components.sidebar.schemas.contentSidebarContentPositionButton.description,
        props: [
            Props.prop_sidebarBtnOpenSize,
        ],
    },

    CONTENT_SIDEBAR_CONTENT_POSITION_BUTTON_ICON: {
        part:          "part-content-sidebar-content-position-button-icon",
        titleKey:      Keys.category.components.sidebar.schemas.contentSidebarContentPositionButtonIcon.name,
        descriptionKey: Keys.category.components.sidebar.schemas.contentSidebarContentPositionButtonIcon.description,
        props: [
            Props.prop_sidebarBtnOpenSize,
            Props.prop_sidebarIsOpen,
            Props.prop_sidebarBtnColor,
            Props.prop_sidebarDirection,
        ],
    },
} as const;


/**
 * نوع schemaهای ComponentSidebar — برای استفاده در TSchemas
 */
export type SchemasType = ExtractSchemasType<typeof Schemas>;
