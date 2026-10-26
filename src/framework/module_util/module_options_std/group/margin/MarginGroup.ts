import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";
import {
    CreateMarginInputGroup,
    ParseMarginStyleValue,
    type MarginInputGroupComponents,
    type MarginInputGroupState,
} from "./MarginInputGroup";

export enum MarginDirection {
    TOP = "margin-top",
    RIGHT = "margin-right",
    BOTTOM = "margin-bottom",
    LEFT = "margin-left",
}

export const MarginDirectionSets = Object.freeze({
    ALL: [
        MarginDirection.TOP,
        MarginDirection.RIGHT,
        MarginDirection.BOTTOM,
        MarginDirection.LEFT,
    ] as const,
    HORIZONTAL: [MarginDirection.LEFT, MarginDirection.RIGHT] as const,
    VERTICAL: [MarginDirection.TOP, MarginDirection.BOTTOM] as const,
});

export type MarginDirectionSetName = keyof typeof MarginDirectionSets;
export type MarginGroupValue<T> = Partial<Record<MarginDirection, T>>;
export type MarginGroupValues = MarginGroupValue<UtilConsts.Sizes | string | number | null>;

export type MarginDirectionEditor = {
    direction: MarginDirection;
    component: any;
};

export type MarginDirectionEditorConfig = {
    directionTitles?: Partial<Record<MarginDirection, string>>;
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
        direction: MarginDirection,
        value: string | null,
        state: MarginInputGroupState,
    ) => void;
};

export type CreateMarginDirectionEditorsConfig = MarginDirectionEditorConfig & {
    components: MarginInputGroupComponents;
    directions?: readonly MarginDirection[];
};

export function CreateMarginGroup<T>(
    values: MarginGroupValue<T>,
): MarginGroupValue<T> {
    return {...values};
}

/** Convert configured margin sides into CSS values. */
export function CreateMarginCssStyles(
    group: MarginGroupValues,
): Partial<Record<string, string>> {
    const styles: Record<string, string> = {};
    for (const [direction, value] of Object.entries(group) as [MarginDirection, MarginGroupValues[MarginDirection]][]) {
        const key = direction.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
        if (value === UtilConsts.Sizes.DEFAULT) {
            styles[key] = "0px";
            continue;
        }
        if (value == null || value === "") continue;
        const cssValue = typeof value === "number"
            ? UtilStyles.Css_SizeUnit(value, UtilConsts.Units.PEXEL)
            : Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)
                ? UtilStyles.Css_Margin(value as UtilConsts.Sizes)
                : String(value);
        styles[key] = cssValue;
    }
    return styles;
}

/** Build one standard three-mode input group for each margin direction. */
export function CreateMarginDirectionEditors(
    values: MarginGroupValues,
    config: CreateMarginDirectionEditorsConfig,
): MarginDirectionEditor[] {
    return (config.directions ?? MarginDirectionSets.ALL).map((direction) => {
        const configuredValue = values[direction];
        const initial = ParseMarginStyleValue(configuredValue);
        const title = config.directionTitles?.[direction] ?? `Margin ${direction}`;
        const component = CreateMarginInputGroup(config.components, {
            inputGroupProps: {
                prop_name: direction,
                prop_labelTitle: title,
            },
            groupSelected: initial.mode,
            sizeValue: initial.sizeValue,
            numberValue: initial.numberValue,
            unitValue: initial.unitValue,
            customValue: initial.customValue,
            labels: config.labels,
            onChange: (value, state) => config.onChange?.(direction, value, state),
        });
        return {direction, component};
    });
}

export const Margin = Object.freeze({
    Key: "margin" as const,
    Title: "Margin",
    Direction: MarginDirection,
    Properties: Object.freeze(Object.values(MarginDirection)),
    DirectionSets: MarginDirectionSets,
    create: CreateMarginGroup,
    createCssStyles: CreateMarginCssStyles,
    createPropertyCssStyles: (property: MarginDirection, value: MarginGroupValues[MarginDirection]) =>
        CreateMarginCssStyles({[property]: value}),
    createDirectionEditors: CreateMarginDirectionEditors,
});
