import * as UICategories                from "@/ui_categories"
import * as UIComponents               from "@/ui_components"
import {Keys}                          from "../../../languages"


/**
 * ComponentStructure — به عنوان یک component قابل instantiate در category basic ثبت می‌شود
 * قابل دسترسی از طریق: UiCategory.UI.Basic.ComponentStructure(config, methods, identity)
 *
 * نکته: callable برمی‌گرداند ComponentStructure instance (نه HTMLElement)
 *   — consumer می‌تواند set/get/executeMethod را صدا بزند
 *   — برای افزودن به DOM: instance.getElement()
 */

const ComponentStructureCallable = (
    config?:   Record<string, any>,
    methods?:  Record<string, any>,
    identity?: {
        unique?: any;
        emit?:   any;
        events?: Record<string, any>;
    },
): UIComponents.Lists.ComponentStructure.Component => {
    const { content, ...props } = config ?? {};

    const instance = new UIComponents.Lists.ComponentStructure.Component(
        "structure",
        null,
        identity as any,
    );

    if (typeof content === "function") {
        instance._CONTENT_RENDERER = content;
    }

    instance.renderComponent(
        props as any,
        methods as any,
    );

    return instance;
};

export const ComponentStructureTotality = Object.assign(
    ComponentStructureCallable,
    { info: UIComponents.Lists.ComponentStructure.Definition }
);


export const Definition : UICategories.TCategoryComponentDefinition = {
    id:          "basic",
    name:        Keys.category.components.basic.name,
    description: Keys.category.components.basic.description,

    components: [
        ComponentStructureTotality
    ]
}
