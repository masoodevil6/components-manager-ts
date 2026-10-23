import * as CoreComponents from "@/core_components";
import {DefineProp as Define_ComponentProp} from "@/core_components";
import {Keys}                from "../../../module_categories/languages";
import * as UtilStyle        from "@/util_styles";
import * as UtilConst        from "@/util_consts";
import * as UiIcons          from "@/ui_icons";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../../tools/type/TypeHelpers";
import type {ComponentConstructor} from "@/core_components";
import type {Interface_ComponentRender} from "@/util_tools";
// --------------------------------
import {TooltipDirectionTypes} from "../componentTooltip/Props";
export {TooltipDirectionTypes} from "../componentTooltip/Props";

export type LabelGroup = {
    id: string;
    title: string;
    action?: string;
};

type LabelPropGroupsType = {
    content: CoreComponents.PropGroupInterface;
    appearance: CoreComponents.PropGroupInterface;
    tooltip: CoreComponents.PropGroupInterface;
};

export const PropGroups = CoreComponents.DefinePropGroup<LabelPropGroupsType>({
    content: {
        name: Keys.category.components.label.groups.content.name,
        description: Keys.category.components.label.groups.content.description,
        col: 2,
    },
    appearance: {
        name: Keys.category.components.label.groups.appearance.name,
        description: Keys.category.components.label.groups.appearance.description,
        col: 2,
    },
    tooltip: {
        name: Keys.category.components.label.groups.tooltip.name,
        description: Keys.category.components.label.groups.tooltip.description,
        col: 2,
    },
});


/**
 * Props اختصاصی ComponentLabel (۱۵ prop — بازیابی کامل Legacy)
 *
 * این Props به propهای پایه ComponentStructure اضافه می‌شوند.
 *
 * تغییرات نسبت به Legacy (جدول ۱.۲ پلن):
 *   - رنگ‌ها به string (خروجی Css_Color — سازگار با CSS vars)
 *   - IconsType (widget instance) → UiIcons.IIconDefinition (data-only descriptor)
 *   - prop_labelStyle نام singular حفظ شد (شکستن نام = breaking change بی‌دلیل)
 */
export const Props = {

    /// --- Show ---

    prop_labelShow: Define_ComponentProp<boolean>({
        prop:         "prop_labelShow",
        default:      true,
        name:         Keys.category.components.label.props.labelShow.name,
        description:  Keys.category.components.label.props.labelShow.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.content,
    }),

    /// --- Border ---

    prop_labelBackground: Define_ComponentProp<string | null>({
        prop:         "prop_labelBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.label.props.labelBackground.name,
        description:  Keys.category.components.label.props.labelBackground.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.appearance,
    }),

    prop_labelRadius: Define_ComponentProp<UtilConst.Sizes | null>({
        prop:         "prop_labelRadius",
        default:      UtilConst.Sizes.M,
        name:         Keys.category.components.label.props.labelRadius.name,
        description:  Keys.category.components.label.props.labelRadius.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.appearance,
    }),

    prop_labelBorderTopLeftRadiusHas: Define_ComponentProp<boolean>({
        prop: "prop_labelBorderTopLeftRadiusHas",
        default: true,
        name: Keys.category.components.label.props.labelBorderTopLeftRadiusHas.name,
        description: Keys.category.components.label.props.labelBorderTopLeftRadiusHas.description,
    }),
    prop_labelBorderTopRightRadiusHas: Define_ComponentProp<boolean>({
        prop: "prop_labelBorderTopRightRadiusHas",
        default: true,
        name: Keys.category.components.label.props.labelBorderTopRightRadiusHas.name,
        description: Keys.category.components.label.props.labelBorderTopRightRadiusHas.description,
    }),
    prop_labelBorderBottomLeftRadiusHas: Define_ComponentProp<boolean>({
        prop: "prop_labelBorderBottomLeftRadiusHas",
        default: true,
        name: Keys.category.components.label.props.labelBorderBottomLeftRadiusHas.name,
        description: Keys.category.components.label.props.labelBorderBottomLeftRadiusHas.description,
    }),
    prop_labelBorderBottomRightRadiusHas: Define_ComponentProp<boolean>({
        prop: "prop_labelBorderBottomRightRadiusHas",
        default: true,
        name: Keys.category.components.label.props.labelBorderBottomRightRadiusHas.name,
        description: Keys.category.components.label.props.labelBorderBottomRightRadiusHas.description,
    }),

    prop_labelMinWidth: Define_ComponentProp<string | null>({
        prop:         "prop_labelMinWidth",
        default:      null,
        name:         Keys.category.components.label.props.labelMinWidth.name,
        description:  Keys.category.components.label.props.labelMinWidth.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.appearance,
    }),

    /// --- Title ---

    prop_labelTitle: Define_ComponentProp<string | null>({
        prop:         "prop_labelTitle",
        default:      null,
        name:         Keys.category.components.label.props.labelTitle.name,
        description:  Keys.category.components.label.props.labelTitle.description,
        OptionShow:   true,
        OptionComponentOption: {},
        OptionGroup:  PropGroups.content,
    }),

    prop_labelFor: Define_ComponentProp<string | null>({
        prop:         "prop_labelFor",
        default:      null,
        name:         Keys.category.components.label.props.labelFor.name,
        description:  Keys.category.components.label.props.labelFor.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.content,
    }),

    prop_labelGroups: Define_ComponentProp<LabelGroup[] | null>({
        prop:         "prop_labelGroups",
        default:      null,
        name:         Keys.category.components.label.props.labelGroups.name,
        description:  Keys.category.components.label.props.labelGroups.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.content,
    }),

    prop_labelGroupSelected: Define_ComponentProp<string | null>({
        prop:         "prop_labelGroupSelected",
        default:      null,
        name:         Keys.category.components.label.props.labelGroupSelected.name,
        description:  Keys.category.components.label.props.labelGroupSelected.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.content,
    }),

    prop_labelStyle: Define_ComponentProp<Record<string, string>>({
        prop:         "prop_labelStyle",
        default:      {},
        name:         Keys.category.components.label.props.labelStyle.name,
        description:  Keys.category.components.label.props.labelStyle.description,
    }),

    prop_labelClass: Define_ComponentProp<string[]>({
        prop:         "prop_labelClass",
        default:      [],
        name:         Keys.category.components.label.props.labelClass.name,
        description:  Keys.category.components.label.props.labelClass.description,
    }),

    prop_labelColor: Define_ComponentProp<string | null>({
        prop:         "prop_labelColor",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.label.props.labelColor.name,
        description:  Keys.category.components.label.props.labelColor.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.appearance,
    }),

    /// --- Tooltip ---

    prop_labelTooltipIcon: Define_ComponentProp<UiIcons.IIconDefinition | null>({
        prop:         "prop_labelTooltipIcon",
        default:      UiIcons.Src.SymbolExclumationSquare.Definition,
        name:         Keys.category.components.label.props.labelTooltipIcon.name,
        description:  Keys.category.components.label.props.labelTooltipIcon.description,
    }),

    prop_labelTooltipDescription: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipDescription",
        default:      null,
        name:         Keys.category.components.label.props.labelTooltipDescription.name,
        description:  Keys.category.components.label.props.labelTooltipDescription.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.tooltip,
    }),

    prop_labelTooltipBackground: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipBackground",
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.label.props.labelTooltipBackground.name,
        description:  Keys.category.components.label.props.labelTooltipBackground.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.tooltip,
    }),

    prop_labelTooltipColor: Define_ComponentProp<string | null>({
        prop:         "prop_labelTooltipColor",
        // Plan 13.1.2 — رنگ متن tooltip: SHAN GRADE_1 (روی پس‌زمینه SECONDARY کنتراست داره)
        default:      UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
        name:         Keys.category.components.label.props.labelTooltipColor.name,
        description:  Keys.category.components.label.props.labelTooltipColor.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.tooltip,
    }),

    prop_labelTooltipPosition: Define_ComponentProp<ReturnType<typeof UtilStyle.Css_SizeUnit>>({
        prop:         "prop_labelTooltipPosition",
        default:      UtilStyle.Css_SizeUnit(2.5, UtilConst.Units.PERCENT),
        name:         Keys.category.components.label.props.labelTooltipPosition.name,
        description:  Keys.category.components.label.props.labelTooltipPosition.description,
    }),

    prop_labelTooltipDirection: Define_ComponentProp<TooltipDirectionTypes>({
        prop:         "prop_labelTooltipDirection",
        default:      TooltipDirectionTypes.BOTTOM,
        name:         Keys.category.components.label.props.labelTooltipDirection.name,
        description:  Keys.category.components.label.props.labelTooltipDirection.description,
        OptionShow:   true,
        OptionGroup:  PropGroups.tooltip,
    }),

} satisfies CoreComponents.ComponentProps;

/** Inject the text editor after ComponentInput is initialized, avoiding a module cycle. */
export function RegisterLabelTitleOptionEditor(component: ComponentConstructor): void {
    Props.prop_labelTitle.OptionComponentSelector = component;
}

export function RegisterLabelColorOptionEditor(
    component: ComponentConstructor,
    options: Record<string, any> = {},
): void {
    for (const prop of [
        Props.prop_labelBackground,
        Props.prop_labelColor,
        Props.prop_labelTooltipBackground,
        Props.prop_labelTooltipColor,
    ]) {
        prop.OptionComponentSelector = component;
        prop.OptionComponentOption = options;
    }
}

export function RegisterLabelRadiusOptionEditor(render: Interface_ComponentRender<ComponentConstructor>): void {
    Props.prop_labelRadius.OptionComponentSelector = render.OptionComponentSelector;
    Props.prop_labelRadius.OptionComponentOption = render.OptionComponentOption;
}


/**
 * نوع propهای ComponentLabel — برای استفاده در TProp
 */
export type PropsType = ExtractPropsType<typeof Props>;


/**
 * نوع config قابل‌قبول constructor — هر prop می‌تواند:
 *   - مقدار خام (مطابق default)
 *   - یا Observable همان مقدار (ClObservable<T>)
 */
export type PropsConfigType = ExtractPropsConfigType<typeof Props>;
