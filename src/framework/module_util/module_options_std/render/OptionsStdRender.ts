import type {ComponentConstructor} from "@/core_components";
import * as UtilConsts from "@/util_consts";
import * as UtilTools from "@/util_tools";
import type {Interface_ComponentRender} from "@/util_tools";

/** Create the standard ComponentInputSelectOption metadata for project sizes. */
export function CreateSizesRender(
    selector: ComponentConstructor,
    options: Record<string, any> = {},
): Interface_ComponentRender<ComponentConstructor> {
    return UtilTools.Render.ComponentRender.inputSelectOption(
        selector,
        Object.values(UtilConsts.Sizes),
        options,
    );
}

export type SizesInputSelectOptionCreator =
    | ((config?: Record<string, any>, methods?: Record<string, any>) => any)
    | (new (config?: Record<string, any>, methods?: Record<string, any>) => any);

/** Create a size selector using the same standard options as prop editors. */
export function CreateSizesInputSelectOption(
    selector: SizesInputSelectOptionCreator,
    componentProps: Record<string, any>,
    methods?: Record<string, any>,
    options: Record<string, any> = {},
): any {
    const standard = CreateSizesRender(selector as ComponentConstructor, options);
    const props = {...standard.OptionComponentOption, ...componentProps};
    const component = selector as any;

    return typeof component?.prototype?.getElement === "function"
        ? new component(props, methods)
        : component(props, methods);
}

/** Named presets for standard property option editors. */
export const Render = Object.freeze({
    Sizes: CreateSizesRender,
    SizesInputSelectOption: CreateSizesInputSelectOption,
});
