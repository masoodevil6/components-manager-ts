/** CSS layout properties accepted by standard layout item style maps. */
export const LayoutStyleProperties = Object.freeze({
    MIN_HEIGHT: "min-height" as const,
    DISPLAY: "display" as const,
    ALIGN_ITEMS: "align-items" as const,
});

export type LayoutStyleProperty = typeof LayoutStyleProperties[keyof typeof LayoutStyleProperties];

export const DisplayValue = Object.freeze({
    BLOCK: "block",
    FLEX: "flex",
    GRID: "grid",
    INLINE: "inline",
    INLINE_BLOCK: "inline-block",
    INLINE_FLEX: "inline-flex",
    INLINE_GRID: "inline-grid",
    NONE: "none",
} as const);

export const AlignItemsValue = Object.freeze({
    BASELINE: "baseline",
    CENTER: "center",
    FLEX_END: "flex-end",
    FLEX_START: "flex-start",
    NORMAL: "normal",
    STRETCH: "stretch",
} as const);

const LAYOUT_PROPERTY_VALUES: Partial<Record<LayoutStyleProperty, readonly string[]>> = {
    [LayoutStyleProperties.DISPLAY]: Object.freeze(Object.values(DisplayValue)),
    [LayoutStyleProperties.ALIGN_ITEMS]: Object.freeze(Object.values(AlignItemsValue)),
};

function toStyleName(property: LayoutStyleProperty): string {
    return property.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase());
}

export const Layout = Object.freeze({
    Key: "layout" as const,
    Title: "Layout",
    Property: LayoutStyleProperties,
    Display: Object.freeze({Key: LayoutStyleProperties.DISPLAY, Values: Object.freeze(Object.values(DisplayValue))}),
    AlignItems: Object.freeze({Key: LayoutStyleProperties.ALIGN_ITEMS, Values: Object.freeze(Object.values(AlignItemsValue))}),
    MinHeight: Object.freeze({Key: LayoutStyleProperties.MIN_HEIGHT}),
    Properties: Object.freeze(Object.values(LayoutStyleProperties)),
    resolve(property: string): LayoutStyleProperty | null {
        const normalized = property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
        return (Object.values(LayoutStyleProperties) as string[]).includes(normalized)
            ? normalized as LayoutStyleProperty
            : null;
    },
    isValidValue(property: LayoutStyleProperty, value: unknown): boolean {
        if (typeof value !== "string" && typeof value !== "number") return false;
        const values = LAYOUT_PROPERTY_VALUES[property];
        return !values || values.includes(String(value));
    },
    createPropertyCssStyles(property: LayoutStyleProperty, value: string | number): Record<string, string | number> {
        return {[toStyleName(property)]: value};
    },
});
