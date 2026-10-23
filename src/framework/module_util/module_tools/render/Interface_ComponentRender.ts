/** Standard metadata consumed by component property settings renderers. */
export interface Interface_ComponentRender<TSelector = any> {
    OptionComponentSelector: TSelector | null;       /// Editor component constructor.
    OptionComponentOption: Record<string, any>;       /// Configuration passed to that editor.
}

export type ComponentRenderSelectValue = string | number;

export interface ComponentRenderSelectOption {
    id: ComponentRenderSelectValue;
    name: ComponentRenderSelectValue;
}
