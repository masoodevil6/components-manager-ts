/** Create a focused factory with the same constructor contract as its component class. */
export type FocusedComponentConstructor = new (...args: any[]) => any;

export type FocusedComponentFactory<
    TConstructor extends FocusedComponentConstructor,
    TDefinition,
> = ((...args: ConstructorParameters<TConstructor>) => InstanceType<TConstructor>) & {
    info: TDefinition;
};

export function MtCreateFocusedComponent<
    TConstructor extends FocusedComponentConstructor,
    TDefinition,
>(
    definition: TDefinition,
    ComponentClass: TConstructor,
): FocusedComponentFactory<TConstructor, TDefinition> {
    const factory = (...args: ConstructorParameters<TConstructor>): InstanceType<TConstructor> =>
        new ComponentClass(...args);

    return Object.assign(factory, {info: definition}) as FocusedComponentFactory<TConstructor, TDefinition>;
}
