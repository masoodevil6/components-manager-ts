import {Border} from "./border";
import {Margin} from "./margin";
import {Padding} from "./padding";
import {BorderRadius} from "./borderRadius";
import {Colors} from "./colors";
import {ElementSize} from "./elementSize";
import {Text} from "./text";
import {Layout, type LayoutStyleProperty} from "./layout";

type CamelCase<Property extends string> = Property extends `${infer Start}-${infer Next}`
    ? `${Start}${Capitalize<CamelCase<Next>>}`
    : Property;

type StandardCssProperty =
    | typeof Border.Properties[number]
    | typeof Margin.Properties[number]
    | typeof Padding.Properties[number]
    | typeof BorderRadius.Properties[number]
    | typeof Colors.Properties[number]
    | typeof ElementSize.Properties[number]
    | typeof Text.Properties[number]
    | LayoutStyleProperty;

/** React-style property names currently defined by module_options_std. */
export type StandardStyleProperty = CamelCase<StandardCssProperty>;

/** CSS values for the standardized property names. */
export type StandardStyles = Partial<Record<StandardStyleProperty, string | number>>;

const STANDARD_PROPERTIES = new Set<string>([
    ...Border.Properties,
    ...Margin.Properties,
    ...Padding.Properties,
    ...BorderRadius.Properties,
    ...Colors.Properties,
    ...ElementSize.Properties,
    ...Text.Properties,
    ...Layout.Properties,
]);

function toCssProperty(property: string): string {
    return property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

function toStyleProperty(property: string): string {
    return property.replace(/-([a-z])/g, (_match, letter: string) => letter.toUpperCase());
}

/** Return whether the supplied CSS/React-style key exists in a standard group. */
export function IsStandardStyleProperty(property: string): boolean {
    return STANDARD_PROPERTIES.has(toCssProperty(property));
}

/** Validate layout item styles and preserve their React-style property names. */
export function ValidateStandardStyles(styles: unknown, context = "styles"): StandardStyles {
    if (styles == null) return {};
    if (typeof styles !== "object" || Array.isArray(styles)) {
        throw new TypeError(`[module_options_std] ${context} must be a style object.`);
    }

    const result: Record<string, string | number> = {};
    for (const [property, value] of Object.entries(styles)) {
        const cssProperty = toCssProperty(property);
        if (!STANDARD_PROPERTIES.has(cssProperty)) {
            throw new TypeError(`[module_options_std] ${context}.${property} is not a standardized style property.`);
        }
        if (cssProperty === Layout.Property.MIN_HEIGHT || cssProperty === Layout.Property.DISPLAY || cssProperty === Layout.Property.ALIGN_ITEMS) {
            const layoutProperty = Layout.resolve(property);
            if (!layoutProperty || !Layout.isValidValue(layoutProperty, value)) {
                throw new TypeError(`[module_options_std] ${context}.${property} has an unsupported value.`);
            }
        } else if (typeof value !== "string" && typeof value !== "number") {
            throw new TypeError(`[module_options_std] ${context}.${property} must be a string or number.`);
        }
        result[toStyleProperty(cssProperty)] = value as string | number;
    }
    return result as StandardStyles;
}
