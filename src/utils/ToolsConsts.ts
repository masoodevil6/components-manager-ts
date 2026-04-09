export type Brand<T , B> = T & {__brand: B};



export const COLORS_GRAD = {
    GRADE_1:       1 ,
    GRADE_2:       2 ,
    GRADE_3:       3 ,
    GRADE_4:       4 ,
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
type CssColorVar = `var(--${ColorsMainType}Color${colorsGradeType})`
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
} as const
type UnitsType = typeof UNITS[keyof typeof UNITS];

type SizeUnitVar = `${number}${UnitsType}`
export const SizeUnit = (number: number  , unit: UnitsType= UNITS.PEXEL) : SizeUnitVar=> {
    return `${number}${unit}` as SizeUnitVar
}


type CalcSizeUnitVar = `calc(${string})`
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







import {IconString} from "../tools/icons/index";
export type IconsType = IconString //ReturnType<typeof ToolsIcons[keyof typeof ToolsIcons]>;







export enum SIZES {
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








export const Z_INDEXES = {
    basic:          'basic',
    menu_main:      'menu_main',
    icon_attach:    'icon_attach',
    tools:          'tools',
    tools_btn:      'tools_btn',
    tools_position: 'tools_position',
    new_page:       'new_page',
    blur_popup:     'blur_popup',
    popup:          'popup',

    SELECTOR:       'selector',
}
export type ZIndexType = typeof Z_INDEXES[keyof typeof Z_INDEXES];