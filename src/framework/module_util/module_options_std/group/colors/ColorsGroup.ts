export const ColorProperty = Object.freeze({
    BACKGROUND_COLOR: "background-color" as const,
    TEXT_COLOR: "color" as const,
});

export type ColorProperty = typeof ColorProperty[keyof typeof ColorProperty];
export type ColorsGroupValue = Partial<Record<ColorProperty, string | null>>;

function toStyleProperty(property: ColorProperty): "backgroundColor" | "color" {
    return property === ColorProperty.BACKGROUND_COLOR ? "backgroundColor" : "color";
}

export function CreateColorsGroup(value: ColorsGroupValue): ColorsGroupValue {
    return {...value};
}

export function CreateColorsCssStyles(value: ColorsGroupValue): Partial<Record<"backgroundColor" | "color", string>> {
    const styles: Partial<Record<"backgroundColor" | "color", string>> = {};
    for (const property of Object.values(ColorProperty)) {
        const color = value[property];
        if (color == null || color === "") continue;
        styles[toStyleProperty(property)] = color;
    }
    return styles;
}

export function CreateColorPropertyCssStyles(
    property: ColorProperty,
    value: string | null,
): Partial<Record<"backgroundColor" | "color", string>> {
    if (value == null || value === "") return {};
    return {[toStyleProperty(property)]: value};
}

export const Colors = Object.freeze({
    Key: "colors" as const,
    Title: "Colors",
    BackgroundColor: Object.freeze({Key: ColorProperty.BACKGROUND_COLOR, Title: "Background color"}),
    TextColor: Object.freeze({Key: ColorProperty.TEXT_COLOR, Title: "Text color"}),
    Properties: Object.freeze(Object.values(ColorProperty)),
    create: CreateColorsGroup,
    createCssStyles: CreateColorsCssStyles,
    createPropertyCssStyles: CreateColorPropertyCssStyles,
});
