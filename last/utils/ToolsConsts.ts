export type Brand<T , B> = T & {__brand: B};


export const styleImportant = function (value){
    return {
        value,
        important: true
    };
}

export class StyleValue {

    constructor(
        public value: any,
        public important = false
    ) {}

    static important(value: any) {
        return new StyleValue(value, true);
    }

}




export const COLORS_GRAD = {
    GRADE_1:       1 ,
    GRADE_2:       2 ,
    GRADE_3:       3 ,
    GRADE_4:       4 ,
    GRADE_5:       5 ,
} as const


export const COLORS_MAIN = {
    PRIMARY:        "primary" ,
    SECONDARY:      "secondary" ,
    ERROR:          "error" ,
    WARNING:        "warning" ,
    INFO:           "info" ,
    SUCCESS:        "success" ,
    SHADOW:         "shadow" ,
    DARK:           "dark" ,
    SHAN:           "shan" ,
} as const

type ColorsMainType = typeof COLORS_MAIN[keyof typeof COLORS_MAIN];
type colorsGradeType = typeof COLORS_GRAD[keyof typeof COLORS_GRAD];
export type CssColorVar = `var(--${ColorsMainType}Color${colorsGradeType})`
export const Color = (color: ColorsMainType = COLORS_MAIN.PRIMARY , grade: colorsGradeType= COLORS_GRAD.GRADE_1) : CssColorVar => {
    return `var(--${color}Color${grade})` as CssColorVar
}





export const OPERATION = {
    ADD:    "+" ,
    MINUS:  "-" ,
    MUL:    "*" ,
    DIV:    "/" ,
}
type OperationType = typeof OPERATION[keyof typeof OPERATION];

export const UNITS = {
    PERCENT:        "%" ,
    PEXEL:          "px" ,
    POINT:          "pt" ,
} as const
type UnitsType = typeof UNITS[keyof typeof UNITS];

export type SizeUnitVar = `${number}${UnitsType}`
export const SizeUnit = (number: number  , unit: UnitsType= UNITS.PEXEL) : SizeUnitVar=> {
    return `${number}${unit}` as SizeUnitVar
}


export type CalcSizeUnitVar = `calc(${string})`
type CalcSizeParts = OperationType | SizeUnitVar
export const SizeCalc = (...parts : CalcSizeParts[]) : CalcSizeUnitVar=> {
    let partStr = ""
    if (parts){
        for (let i = 0; i < parts.length; i++) {
            const itemPart = parts[i];
            if (itemPart){
                partStr += ` ${itemPart} `
            }
        }
    }
    return `calc(${partStr})` as CalcSizeUnitVar
}


export type TransformUnitVar = `translate(${SizeUnitVar} , ${SizeUnitVar})`
export const TranslateUnit = (transitionX: SizeUnitVar, transitionY: SizeUnitVar) : TransformUnitVar=> {
    return `translate(${transitionX} , ${transitionY})` as TransformUnitVar
}







import {IconString, ToolsIcons} from "../tools/icons/index";
export type IconsType = IconString //ReturnType<typeof ToolsIcons[keyof typeof ToolsIcons]>;
export type IconsSourceType = typeof ToolsIcons[keyof typeof ToolsIcons];







export enum SIZES {
    DEFAULT=        'default',
    XS=             'x-s',
    S=              's',
    M=              'm',
    L=              'l',
    XL=             'x-l',
    XXL=            'xx-l',
}
export type SizesType = typeof SIZES[keyof typeof SIZES];



export const ToolsComponents_BorderRadius = {
    [SIZES.XS]:      "var(--borderRadiusXSmall)",
    [SIZES.S]:       "var(--borderRadiusSmall)",
    [SIZES.M]:       "var(--borderRadiusMedium)",
    [SIZES.L]:       "var(--borderRadiusLarge)",
    [SIZES.XL]:      "var(--borderRadiusXLarge)",
    [SIZES.XXL]:     "var(--borderRadiusXXLarge)",
} as const;
export type BorderRadiusType = typeof ToolsComponents_BorderRadius[keyof typeof ToolsComponents_BorderRadius];



export const ToolsComponents_BorderWidth = {
    [SIZES.XS]:      "var(--borderWidthXSmall)",
    [SIZES.S]:       "var(--borderWidthSmall)",
    [SIZES.M]:       "var(--borderWidthMedium)",
    [SIZES.L]:       "var(--borderWidthLarge)",
    [SIZES.XL]:      "var(--borderWidthXLarge)",
    [SIZES.XXL]:     "var(--borderWidthXXLarge)",
} as const;
export type BorderWidthType = typeof ToolsComponents_BorderWidth[keyof typeof ToolsComponents_BorderWidth];



export const ToolsComponents_Margin = {
    [SIZES.XS]:      "var(--marginXSmall)",
    [SIZES.S]:       "var(--marginSmall)",
    [SIZES.M]:       "var(--marginMedium)",
    [SIZES.L]:       "var(--marginLarge)",
    [SIZES.XL]:      "var(--marginXLarge)",
    [SIZES.XXL]:     "var(--marginXXLarge)",
} as const;
export type MarginType = typeof ToolsComponents_Margin[keyof typeof ToolsComponents_Margin];


export const ToolsComponents_Padding = {
    [SIZES.XS]:      "var(--paddingXSmall)",
    [SIZES.S]:       "var(--paddingSmall)",
    [SIZES.M]:       "var(--paddingMedium)",
    [SIZES.L]:       "var(--paddingLarge)",
    [SIZES.XL]:      "var(--paddingXLarge)",
    [SIZES.XXL]:     "var(--paddingXXLarge)",
} as const;
export type PaddingType = typeof ToolsComponents_Padding[keyof typeof ToolsComponents_Padding];



export const ToolsComponents_Height = {
    [SIZES.XS]:      "var(--heightXSmall)",
    [SIZES.S]:       "var(--heightSmall)",
    [SIZES.M]:       "var(--heightMedium)",
    [SIZES.L]:       "var(--heightLarge)",
    [SIZES.XL]:      "var(--heightXLarge)",
    [SIZES.XXL]:     "var(--heightXXLarge)",
} as const;
export type HeightType = typeof ToolsComponents_Height[keyof typeof ToolsComponents_Height];


export const ToolsComponents_FontSize = {
    [SIZES.XS]:      "var(--fontSizeXSmall)",
    [SIZES.S]:       "var(--fontSizeSmall)",
    [SIZES.M]:       "var(--fontSizeMedium)",
    [SIZES.L]:       "var(--fontSizeLarge)",
    [SIZES.XL]:      "var(--fontSizeXLarge)",
    [SIZES.XXL]:     "var(--fontSizeXXLarge)",
} as const;
export type FontSizeType = typeof ToolsComponents_FontSize[keyof typeof ToolsComponents_FontSize];


export const ToolsComponents_IconSize = {
    [SIZES.XS]:      "var(--iconSizeXSmall)",
    [SIZES.S]:       "var(--iconSizeSmall)",
    [SIZES.M]:       "var(--iconSizeMedium)",
    [SIZES.L]:       "var(--iconSizeLarge)",
    [SIZES.XL]:      "var(--iconSizeXLarge)",
    [SIZES.XXL]:     "var(--iconSizeXXLarge)",
} as const;
export type IconSizeType = typeof ToolsComponents_IconSize[keyof typeof ToolsComponents_IconSize];







export const Z_INDEXES = {
    basic:          'basic',
    menu_main:      'menu_main',
    icon_attach:    'icon_attach',

    tools_blur:     'tools_blur',
    tools:          'tools',
    tools_btn:      'tools_btn',
    tools_position: 'tools_position',
    new_page:       'new_page',

    notify:         'notify',

    blur_popup:     'blur_popup',
    popup:          'popup',

    SELECTOR:       'selector',
}
export type ZIndexType = typeof Z_INDEXES[keyof typeof Z_INDEXES];



export const ToolsComponents_ZIndex = {
    [Z_INDEXES.basic] :           1,
    [Z_INDEXES.menu_main] :       2,
    [Z_INDEXES.icon_attach] :     3,

    [Z_INDEXES.tools_blur] :      10,
    [Z_INDEXES.tools] :           11,
    [Z_INDEXES.tools_btn]  :      12,
    [Z_INDEXES.tools_position] :  13,

    [Z_INDEXES.new_page]  :       21,

    [Z_INDEXES.notify]  :         80,

    [Z_INDEXES.blur_popup]  :     90,
    [Z_INDEXES.popup] :           91,

    [Z_INDEXES.SELECTOR] :        100,
} as const;
export type ZIndexValueType = typeof ToolsComponents_ZIndex[keyof typeof ToolsComponents_ZIndex];