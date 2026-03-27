
export const COLORS_GRAD = {
    GRADE_1:       1 ,
    GRADE_2:       2 ,
    GRADE_3:       3 ,
    GRADE_4:       4 ,
}


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
}

type ColorsMainType = typeof COLORS_MAIN[keyof typeof COLORS_MAIN];
type colorsGradeType = typeof COLORS_GRAD[keyof typeof COLORS_GRAD];
type CssColorVar = `--${ColorsMainType}Color${colorsGradeType}`
export const Color = (color: ColorsMainType = COLORS_MAIN.PRIMARY , grade: colorsGradeType= COLORS_GRAD.GRADE_1) : `var(${CssColorVar})`=> {
    return `var(--${color}Color${grade})`
}









import {ToolsIcons} from "../tools/icons/index";
export type IconsType = typeof ToolsIcons[keyof typeof ToolsIcons];







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
}
export type ZIndexType = typeof Z_INDEXES[keyof typeof Z_INDEXES];