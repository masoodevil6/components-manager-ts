import * as UtilConsts from "@/util_consts";
import * as UtilStyles from "@/util_styles";

export enum MarginInputGroupMode {
    SIZE = "SIZE",
    NUMBER_UNIT = "NUMBER_UNIT",
    CUSTOM = "CUSTOM",
}

export type MarginInputGroupValue = {
    size?: UtilConsts.Sizes | null;
    value?: number | string | null;
    unit?: UtilConsts.Units | null;
    custom?: string | null;
};

export type MarginInputGroupState = {
    mode: MarginInputGroupMode;
    values: MarginInputGroupValue;
};

export type MarginInputGroupOnChange = (
    cssValue: string | null,
    state: MarginInputGroupState,
) => void;

export type MarginInputGroupComponentCreator =
    | ((config?: Record<string, any>, methods?: Record<string, any>) => any)
    | (new (config?: Record<string, any>, methods?: Record<string, any>) => any);

export type MarginInputGroupComponents = {
    InputGroup: MarginInputGroupComponentCreator;
    InputSimple: MarginInputGroupComponentCreator;
    SelectCustomSimple: MarginInputGroupComponentCreator;
};

export type MarginInputGroupConfig = {
    inputGroupProps?: Record<string, any>;
    groupSelected?: MarginInputGroupMode | null;
    labels?: Partial<{
        title: string;
        size: string;
        numberUnit: string;
        custom: string;
        sizePlaceholder: string;
        numberPlaceholder: string;
        unitPlaceholder: string;
        customPlaceholder: string;
    }>;
    sizeValue?: UtilConsts.Sizes;
    numberValue?: number | string;
    unitValue?: UtilConsts.Units;
    customValue?: string;
    onChange?: MarginInputGroupOnChange;
};

export type MarginInputGroupInitialValue = {
    mode: MarginInputGroupMode;
    sizeValue?: UtilConsts.Sizes;
    numberValue?: number | string;
    unitValue?: UtilConsts.Units;
    customValue?: string;
};

const DEFAULT_LABELS = {
    title: "Margin",
    size: "Preset size",
    numberUnit: "Number + unit",
    custom: "Custom",
    sizePlaceholder: "Size",
    numberPlaceholder: "Number",
    unitPlaceholder: "Unit",
    customPlaceholder: "CSS margin value",
};

const createComponent = (
    creator: MarginInputGroupComponentCreator,
    config: Record<string, any>,
    methods?: Record<string, any>,
): any => {
    const factory = creator as any;
    try {
        const instance = factory(config, methods);
        if (instance != null) return instance;
    } catch {
        // Component classes require `new`; category factories are callable.
    }
    return new factory(config, methods);
};

const readComponentProp = (component: any, propName: string): any => {
    if (typeof component?.get === "function") return component.get(propName);
    return component?._COMPONENT_PROPS_BIND?.[propName]?.get?.();
};

export function ResolveMarginStyleValue(
    mode: MarginInputGroupMode | string | null,
    values: MarginInputGroupValue,
): string | null {
    if (mode === MarginInputGroupMode.SIZE) {
        const size = values?.size;
        if (size === UtilConsts.Sizes.DEFAULT) return "0px";
        if (size != null && Object.values(UtilConsts.Sizes).includes(size)) {
            return UtilStyles.Css_Margin(size);
        }
        return null;
    }

    if (mode === MarginInputGroupMode.NUMBER_UNIT) {
        if (values?.value == null || String(values.value).trim() === "") return null;
        const numericValue = Number(values.value);
        if (!Number.isFinite(numericValue)) return null;
        const unit = values.unit ?? UtilConsts.Units.PEXEL;
        if (!Object.values(UtilConsts.Units).includes(unit)) return null;
        return UtilStyles.Css_SizeUnit(numericValue, unit);
    }

    if (mode === MarginInputGroupMode.CUSTOM) {
        const customValue = values?.custom;
        return typeof customValue === "string" && customValue.trim() !== ""
            ? customValue.trim()
            : null;
    }

    return null;
}

/** Parse a configured margin value so its editor opens in the matching mode. */
export function ParseMarginStyleValue(value: unknown): MarginInputGroupInitialValue {
    if (value == null || value === "") {
        return {mode: MarginInputGroupMode.SIZE, sizeValue: UtilConsts.Sizes.DEFAULT};
    }

    if (Object.values(UtilConsts.Sizes).includes(value as UtilConsts.Sizes)) {
        return {mode: MarginInputGroupMode.SIZE, sizeValue: value as UtilConsts.Sizes};
    }

    if (typeof value === "number" && Number.isFinite(value)) {
        return {mode: MarginInputGroupMode.NUMBER_UNIT, numberValue: value, unitValue: UtilConsts.Units.PEXEL};
    }

    if (typeof value !== "string") {
        return {mode: MarginInputGroupMode.CUSTOM, customValue: String(value)};
    }

    const cssValue = value.trim();
    const preset = Object.values(UtilConsts.Sizes).find(
        (size) => UtilStyles.Css_Margin(size) === cssValue,
    );
    if (preset) return {mode: MarginInputGroupMode.SIZE, sizeValue: preset};
    if (cssValue === "0px" || cssValue === "0") {
        return {mode: MarginInputGroupMode.SIZE, sizeValue: UtilConsts.Sizes.DEFAULT};
    }

    const numberUnit = cssValue.match(/^([+-]?(?:\d+\.?\d*|\.\d+))(%|px|pt|vh)$/i);
    if (numberUnit) {
        const unit = Object.values(UtilConsts.Units).find(
            (candidate) => candidate.toLowerCase() === numberUnit[2].toLowerCase(),
        );
        if (unit) {
            return {
                mode: MarginInputGroupMode.NUMBER_UNIT,
                numberValue: numberUnit[1],
                unitValue: unit,
            };
        }
    }

    return {mode: MarginInputGroupMode.CUSTOM, customValue: cssValue};
}

/** Create a reusable editor with preset, number + unit, and custom CSS modes. */
export function CreateMarginInputGroup(
    components: MarginInputGroupComponents,
    config: MarginInputGroupConfig = {},
): any {
    const labels = {...DEFAULT_LABELS, ...config.labels};
    const sizeInput = createComponent(components.SelectCustomSimple, {
        prop_selectName: "size",
        prop_selectValue: config.sizeValue ?? UtilConsts.Sizes.DEFAULT,
        prop_selectPlaceholder: labels.sizePlaceholder,
        prop_selectTypeShow: "just_name",
        prop_selectOptions: Object.values(UtilConsts.Sizes).map((size) => ({
            id: size,
            name: size,
            prefix: "",
        })),
    });
    const numberInput = createComponent(components.InputSimple, {
        prop_inputName: "value",
        prop_inputValue: String(config.numberValue ?? 1),
        prop_inputPlaceholder: labels.numberPlaceholder,
        prop_inputType: "number",
    });
    const unitInput = createComponent(components.SelectCustomSimple, {
        prop_selectName: "unit",
        prop_selectValue: config.unitValue ?? UtilConsts.Units.PEXEL,
        prop_selectPlaceholder: labels.unitPlaceholder,
        prop_selectTypeShow: "just_name",
        prop_selectOptions: Object.values(UtilConsts.Units).map((unit) => ({
            id: unit,
            name: unit,
            prefix: "",
        })),
    });
    const customInput = createComponent(components.InputSimple, {
        prop_inputName: "custom",
        prop_inputValue: config.customValue ?? "",
        prop_inputPlaceholder: labels.customPlaceholder,
        prop_inputType: "string",
    });

    const groupDefinitions = [
        {
            id: MarginInputGroupMode.SIZE,
            title: labels.size,
            inputs: [{type: "INPUT", input: sizeInput, width: "COL_12"}],
        },
        {
            id: MarginInputGroupMode.NUMBER_UNIT,
            title: labels.numberUnit,
            inputs: [
                {type: "INPUT", input: numberInput, width: "COL_8"},
                {type: "INPUT", input: unitInput, width: "COL_4"},
            ],
        },
        {
            id: MarginInputGroupMode.CUSTOM,
            title: labels.custom,
            inputs: [{type: "INPUT", input: customInput, width: "COL_12"}],
        },
    ];

    const readValues = (mode: MarginInputGroupMode): MarginInputGroupValue => {
        switch (mode) {
            case MarginInputGroupMode.SIZE:
                return {size: readComponentProp(sizeInput, "prop_selectValue")};
            case MarginInputGroupMode.NUMBER_UNIT:
                return {
                    value: readComponentProp(numberInput, "prop_inputValue"),
                    unit: readComponentProp(unitInput, "prop_selectValue"),
                };
            case MarginInputGroupMode.CUSTOM:
                return {custom: readComponentProp(customInput, "prop_inputValue")};
        }
    };

    const notifyChange = function(this: any): void {
        if (!config.onChange) return;
        const mode = this.get("prop_groupSelected") as MarginInputGroupMode;
        const state = {mode, values: readValues(mode)};
        config.onChange(ResolveMarginStyleValue(mode, state.values), state);
    };

    const inputGroupProps = config.inputGroupProps ?? {};
    return createComponent(
        components.InputGroup,
        {
            ...inputGroupProps,
            prop_name: inputGroupProps.prop_name ?? "margin",
            prop_labelTitle: inputGroupProps.prop_labelTitle ?? labels.title,
            prop_groupSelected: config.groupSelected !== undefined
                ? config.groupSelected
                : inputGroupProps.prop_groupSelected ?? MarginInputGroupMode.SIZE,
            prop_inputs: groupDefinitions,
        },
        {
            INPUT_CHANGE: notifyChange,
            CHANGE_GROUP: notifyChange,
        },
    );
}

export const Margin = Object.freeze({
    Mode: MarginInputGroupMode,
    createInputGroup: CreateMarginInputGroup,
    resolve: ResolveMarginStyleValue,
    parse: ParseMarginStyleValue,
});
