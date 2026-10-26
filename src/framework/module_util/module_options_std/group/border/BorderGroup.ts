import {
    CreateBorderInputGroup,
    ParseBorderStyleValue,
    type BorderInputGroupComponents,
    type BorderInputGroupState,
} from "./BorderInputGroup";

/** Logical sides used when applying one border value to selected sides. */
export enum BorderDirection {
    TOP = "border-top-width",
    RIGHT = "border-right-width",
    BOTTOM = "border-bottom-width",
    LEFT = "border-left-width",
}

/** CSS color properties for each physical border side. */
export enum BorderColorDirection {
    TOP = "border-top-color",
    RIGHT = "border-right-color",
    BOTTOM = "border-bottom-color",
    LEFT = "border-left-color",
}

/** CSS line styles, selected independently for each border side. */
export enum BorderLineStyle {
    NONE = "none",
    HIDDEN = "hidden",
    DOTTED = "dotted",
    DASHED = "dashed",
    SOLID = "solid",
    DOUBLE = "double",
    GROOVE = "groove",
    RIDGE = "ridge",
    INSET = "inset",
    OUTSET = "outset",
}

/** CSS style properties for each physical border side. */
export enum BorderStyleDirection {
    TOP = "border-top-style",
    RIGHT = "border-right-style",
    BOTTOM = "border-bottom-style",
    LEFT = "border-left-style",
}

export const BorderLineStyleValues = Object.freeze(Object.values(BorderLineStyle));

export const BorderDirectionSets = Object.freeze({
    ALL: [
        BorderDirection.TOP,
        BorderDirection.RIGHT,
        BorderDirection.BOTTOM,
        BorderDirection.LEFT,
    ] as const,
    HORIZONTAL: [BorderDirection.LEFT, BorderDirection.RIGHT] as const,
    VERTICAL: [BorderDirection.TOP, BorderDirection.BOTTOM] as const,
});

export type BorderDirectionSetName = keyof typeof BorderDirectionSets;
export type BorderDirectionSelection =
    | BorderDirectionSetName
    | readonly BorderDirection[]
    | null;

/** A value assigned only to the selected border directions. */
export type BorderGroupValue<T> = Partial<Record<BorderDirection, T>>;
export type BorderColorGroupValue<T> = Partial<Record<BorderColorDirection, T>>;
export type BorderStyleGroupValue<T> = Partial<Record<BorderStyleDirection, T>>;
export type BorderProperty = BorderDirection | BorderColorDirection | BorderStyleDirection;

export type BorderStyleInput = string | number | null;
export type BorderStyleInputs = Partial<Record<BorderDirection, BorderStyleInput>>;

export type BorderDirectionEditor = {
    direction: BorderDirection;
    component: any;
};

export type BorderDirectionEditorConfig = {
    directions?: readonly BorderDirection[];
    directionTitles?: Partial<Record<BorderDirection, string>>;
    labels?: Partial<{
        size: string;
        numberUnit: string;
        custom: string;
        sizePlaceholder: string;
        numberPlaceholder: string;
        unitPlaceholder: string;
        customPlaceholder: string;
    }>;
    onChange?: (
        direction: BorderDirection,
        value: string | null,
        state: BorderInputGroupState,
    ) => void;
};

export type CreateBorderGroupConfig<T> = {
    directions?: BorderDirectionSelection;
} & (
    | {
        /** Fallback value applied to every selected direction. */
        value: T;
        /** Optional per-direction overrides. */
        values?: Partial<Record<BorderDirection, T>>;
    }
    | {
        /** Per-direction values; selected directions default to these keys. */
        value?: never;
        values: Partial<Record<BorderDirection, T>>;
    }
);

/**
 * Assign one shared value or separate values to border directions. The result
 * is keyed by logical direction, so it can be combined with other grouped
 * style values before converting it to CSS properties.
 */
export function CreateBorderGroup<T>(
    config: CreateBorderGroupConfig<T>,
): BorderGroupValue<T> {
    const hasSharedValue = Object.prototype.hasOwnProperty.call(config, "value");
    const selection = config.directions ?? (
        hasSharedValue
            ? "ALL"
            : Object.keys(config.values ?? {}) as BorderDirection[]
    );
    const directions = Array.isArray(selection)
        ? selection
        : BorderDirectionSets[selection as BorderDirectionSetName];
    const values = config.values ?? {};

    return directions.reduce<BorderGroupValue<T>>((group, direction) => {
        if (Object.prototype.hasOwnProperty.call(values, direction)) {
            const value = values[direction];
            if (value !== undefined) group[direction] = value;
        } else if (hasSharedValue) {
            group[direction] = config.value as T;
        }
        return group;
    }, {});
}

export type BorderCssProperty = "border" | "borderWidth" | "borderColor" | "borderStyle";

/** Convert a direction-to-value group into a CSS style object. */
export function CreateBorderCssStyles<T>(
    group: BorderGroupValue<T>,
    property: BorderCssProperty = "borderWidth",
): Partial<Record<string, T>> {
    const suffix = property === "border" ? "" : property.slice("border".length);
    const styles: Record<string, T> = {};

    for (const [direction, value] of Object.entries(group) as [BorderDirection, T][]) {
        if (value === undefined) continue;
        const side = direction.split("-")[1];
        const cssProperty = property === "border"
            ? `border-${side}`
            : `border-${side}-${suffix ? suffix[0].toLowerCase() + suffix.slice(1).replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`) : "width"}`;
        const key = cssProperty.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
        styles[key] = value;
    }

    return styles;
}

/** Create a per-side border-color value map. */
export function CreateBorderColorGroup<T>(values: BorderColorGroupValue<T>): BorderColorGroupValue<T> {
    return {...values};
}

/** Create an independent CSS border-style value for each selected side. */
export function CreateBorderStyleGroup<T>(values: BorderStyleGroupValue<T>): BorderStyleGroupValue<T> {
    return {...values};
}

/** Convert border-color properties into their corresponding CSS style names. */
export function CreateBorderColorCssStyles<T>(group: BorderColorGroupValue<T>): Partial<Record<string, T>> {
    const styles: Record<string, T> = {};
    for (const [property, value] of Object.entries(group) as [BorderColorDirection, T][]) {
        if (value === undefined) continue;
        const styleName = property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
        styles[styleName] = value;
    }
    return styles;
}

/** Convert per-side border-style values into inline CSS style names. */
export function CreateBorderStyleCssStyles<T>(group: BorderStyleGroupValue<T>): Partial<Record<string, T>> {
    const styles: Record<string, T> = {};
    for (const [property, value] of Object.entries(group) as [BorderStyleDirection, T][]) {
        if (value == null || value === "") continue;
        const styleName = property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
        styles[styleName] = value;
    }
    return styles;
}

export type BorderStyleDirectionEditor = {
    direction: BorderStyleDirection;
    component: any;
};

export type BorderStyleSelectComponentCreator =
    | ((config?: Record<string, any>, methods?: Record<string, any>) => any)
    | (new (config?: Record<string, any>, methods?: Record<string, any>) => any);

export type BorderStyleDirectionEditorConfig = {
    selector: BorderStyleSelectComponentCreator;
    directions?: readonly BorderStyleDirection[];
    directionTitles?: Partial<Record<BorderStyleDirection, string>>;
    options?: Array<{id: string | number; name: string | number}>;
    onChange?: (direction: BorderStyleDirection, value: string | null) => void;
};

/** Create one standard select editor for each configured border side. */
export function CreateBorderStyleDirectionEditors(
    values: BorderStyleGroupValue<string | null | undefined>,
    config: BorderStyleDirectionEditorConfig,
): BorderStyleDirectionEditor[] {
    const selector = config.selector as any;
    const options = config.options ?? BorderLineStyleValues.map((style) => ({id: style, name: style}));
    return (config.directions ?? Object.values(BorderStyleDirection)).map((direction) => {
        const title = config.directionTitles?.[direction] ?? direction;
        const componentOptions = {
            prop_name: direction,
            prop_itemSelected: values[direction] ?? null,
            prop_options: options.map((option) => ({...option})),
            prop_labelShow: true,
            prop_labelTitle: title,
            prop_structureStyles: {width: "100%"},
        };
        const methods = {
            SELECT_CHANGE: (_event: Event, _dataArgs: unknown, componentArgs: any) => {
                const value = componentArgs?.VALUE == null ? null : String(componentArgs.VALUE);
                config.onChange?.(direction, value);
            },
        };
        const component = typeof selector?.prototype?.getElement === "function"
            ? new selector(componentOptions, methods)
            : selector(componentOptions, methods);
        return {direction, component};
    });
}

function CreateBorderPropertyCssStyles(property: BorderProperty, value: BorderStyleInput): Partial<Record<string, BorderStyleInput>> {
    if (value == null || value === "") return {};
    const styleName = property.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
    return {[styleName]: value};
}

/** Build the standard editor for each side in a border style group. */
export function CreateBorderDirectionEditors(
    components: BorderInputGroupComponents,
    values: BorderStyleInputs = {},
    config: BorderDirectionEditorConfig = {},
): BorderDirectionEditor[] {
    return (config.directions ?? BorderDirectionSets.ALL).map((direction) => {
        const initial = ParseBorderStyleValue(values[direction]);
        const title = config.directionTitles?.[direction] ?? `Border ${direction}`;
        const component = CreateBorderInputGroup(components, {
            inputGroupProps: {
                prop_name: direction,
                prop_labelTitle: title,
            },
            labels: config.labels,
            groupSelected: initial.mode,
            sizeValue: initial.sizeValue,
            numberValue: initial.numberValue,
            unitValue: initial.unitValue,
            customValue: initial.customValue,
            onChange: (value, state) => config.onChange?.(direction, value, state),
        });

        return {direction, component};
    });
}

export const Border = Object.freeze({
    Key: "border" as const,
    Title: "Border",
    Direction: BorderDirection,
    Color: BorderColorDirection,
    Style: Object.freeze({
        Direction: BorderStyleDirection,
        Value: BorderLineStyle,
        Values: BorderLineStyleValues,
        Properties: Object.freeze(Object.values(BorderStyleDirection)),
        create: CreateBorderStyleGroup,
        createCssStyles: CreateBorderStyleCssStyles,
        createDirectionEditors: CreateBorderStyleDirectionEditors,
    }),
    Properties: Object.freeze([
        ...Object.values(BorderDirection),
        ...Object.values(BorderColorDirection),
        ...Object.values(BorderStyleDirection),
    ]),
    DirectionSets: BorderDirectionSets,
    create: CreateBorderGroup,
    createCssStyles: CreateBorderCssStyles,
    createColorGroup: CreateBorderColorGroup,
    createColorCssStyles: CreateBorderColorCssStyles,
    createStyleGroup: CreateBorderStyleGroup,
    createStyleCssStyles: CreateBorderStyleCssStyles,
    createPropertyCssStyles: CreateBorderPropertyCssStyles,
    createDirectionEditors: CreateBorderDirectionEditors,
});
