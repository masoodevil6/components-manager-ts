import type {ComponentConstructor} from "@/core_components";
import type {
    ComponentRenderSelectOption,
    ComponentRenderSelectValue,
    Interface_ComponentRender,
} from "./Interface_ComponentRender";

export function CreateComponentRender(
    selector: ComponentConstructor | null,
    options: Record<string, any> = {},
): Interface_ComponentRender<ComponentConstructor> {
    return {
        OptionComponentSelector: selector,
        OptionComponentOption: {...options},
    };
}

export function CreateInputSelectOptionRender<T extends ComponentRenderSelectValue>(
    selector: ComponentConstructor,
    values: readonly T[] | readonly ComponentRenderSelectOption[],
    options: Record<string, any> = {},
): Interface_ComponentRender<ComponentConstructor> {
    const propOptions = values.map((value) => {
        if (typeof value === "object" && value !== null) return {...value};
        return {id: value, name: value};
    });

    return CreateComponentRender(selector, {
        prop_options: propOptions,
        ...options,
    });
}

/** Public helpers for defining a component property editor and its options. */
export const ComponentRender = Object.freeze({
    create: CreateComponentRender,
    inputSelectOption: CreateInputSelectOptionRender,
});
