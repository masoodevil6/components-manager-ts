import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";
import {
    CreatePaddingInputGroup,
    ParsePaddingStyleValue,
    type PaddingInputGroupComponents,
    type PaddingInputGroupState,
} from "./PaddingInputGroup";

export enum PaddingDirection {
    TOP = "padding-top",
    RIGHT = "padding-right",
    BOTTOM = "padding-bottom",
    LEFT = "padding-left",
}

export const PaddingDirectionSets = Object.freeze({
    ALL: [
        PaddingDirection.TOP,
        PaddingDirection.RIGHT,
        PaddingDirection.BOTTOM,
        PaddingDirection.LEFT,
    ] as const,
    HORIZONTAL: [PaddingDirection.LEFT, PaddingDirection.RIGHT] as const,
    VERTICAL: [PaddingDirection.TOP, PaddingDirection.BOTTOM] as const,
});

export type PaddingDirectionSetName = keyof typeof PaddingDirectionSets;
export type PaddingGroupValue<T> = Partial<Record<PaddingDirection, T>>;
export type PaddingGroupValues = PaddingGroupValue<UtilConsts.Sizes | string | number | null>;

export type PaddingDirectionEditor = {
    direction: PaddingDirection;
    component: any;
};

export type PaddingDirectionEditorConfig = {
    directionTitles?: Partial<Record<PaddingDirection, string>>;
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
        direction: PaddingDirection,
        value: string | null,
        state: PaddingInputGroupState,
    ) => void;
};

export type CreatePaddingDirectionEditorsConfig = PaddingDirectionEditorConfig & {
    components: PaddingInputGroupComponents;
    directions?: readonly PaddingDirection[];
};

export function CreatePaddingGroup<T>(
    values: PaddingGroupValue<T>,
): PaddingGroupValue<T> {
    return {...values};
}

/** Convert configured padding sides into CSS values. */
export function CreatePaddingCssStyles(
    group: PaddingGroupValues,
): Partial<Record<string, string>> {
    const styles: Record<string, string> = {};
    for (const [direction, value] of Object.entries(group) as [PaddingDirection, PaddingGroupValues[PaddingDirection]][]) {
        const key = direction.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
        if (value === UtilConsts.Sizes.DEFAULT) {
            styles[key] = "0px";
            continue;
        }
        if (value == null || value === "") continue;
        const cssValue = typeof value === "number"
            ? UtilStyles.Css_SizeUnit(value, UtilConsts.Units.PEXEL)
            : Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)
                ? UtilStyles.Css_Padding(value as UtilConsts.Sizes)
                : String(value);
        styles[key] = cssValue;
    }
    return styles;
}

/** Build one standard three-mode input group for each padding direction. */
export function CreatePaddingDirectionEditors(
    values: PaddingGroupValues,
    config: CreatePaddingDirectionEditorsConfig,
): PaddingDirectionEditor[] {
    return (config.directions ?? PaddingDirectionSets.ALL).map((direction) => {
        const configuredValue = values[direction];
        const initial = ParsePaddingStyleValue(configuredValue);
        const title = config.directionTitles?.[direction] ?? `Padding ${direction}`;
        const component = CreatePaddingInputGroup(config.components, {
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

export const Padding = Object.freeze({
    Key: "padding" as const,
    Title: "Padding",
    Direction: PaddingDirection,
    Properties: Object.freeze(Object.values(PaddingDirection)),
    DirectionSets: PaddingDirectionSets,
    create: CreatePaddingGroup,
    createCssStyles: CreatePaddingCssStyles,
    createPropertyCssStyles: (property: PaddingDirection, value: PaddingGroupValues[PaddingDirection]) =>
        CreatePaddingCssStyles({[property]: value}),
    createDirectionEditors: CreatePaddingDirectionEditors,
});
