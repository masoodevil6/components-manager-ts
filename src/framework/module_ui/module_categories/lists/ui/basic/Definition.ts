import * as UICategories                from "@/ui_categories"
import * as UIComponents               from "@/ui_components"
import {Keys}                          from "../../../languages"


/**
 * ComponentStructure — به عنوان یک component قابل instantiate در category basic ثبت می‌شود
 *
 * پلن 5.11 — Componentهای جدید مستقل:
 *   ComponentStructure  → Structure عمومی + Composition Point
 *   ComponentButton     → دکمه مستقل
 *   ComponentCollapse   → آکاردئون (State validation)
 */
export const ComponentStructureTotality = UICategories.CreateCategoryComponent(
    UIComponents.Lists.ComponentStructure.Definition,
    UIComponents.Lists.ComponentStructure.Component as any
);

export const ComponentButtonTotality = UICategories.CreateCategoryComponent(
    {
        id:       "component_button",
        name:     "componentButton",
        version:  "v1.0.0",
    },
    UIComponents.Lists.ComponentButton.Component as any
);

export const ComponentCollapseTotality = UICategories.CreateCategoryComponent(
    {
        id:       "component_collapse",
        name:     "componentCollapse",
        version:  "v1.0.0",
    },
    UIComponents.Lists.ComponentCollapse.Component as any
);


export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "basic",
    name:        Keys.category.components.basic.name,
    description: Keys.category.components.basic.description,

    components: [
        ComponentStructureTotality,
        ComponentButtonTotality,
        ComponentCollapseTotality,
    ]
}