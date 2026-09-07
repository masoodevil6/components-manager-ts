import type { Sizes } from "./types/const";
import type { SizeUnit } from "./types/var";



export {
    StyleImportant   as Style_Important ,

    SizeUnit         as Css_SizeUnit ,
    SizeCalc         as Css_SizeCalc ,
    Transform        as Css_Transform ,
    IconSize         as Css_IconSize  ,
    FontSize         as Css_FontSize  ,
    Height           as Css_Height  ,
    Color            as Css_Color ,
    ZIndex           as Css_ZIndex  ,
    BorderRadius     as Css_BorderRadius  ,
    BorderWidth      as Css_BorderWidth ,
    Margin           as Css_Margin  ,
    Padding          as Css_Padding  ,
    IconStrokeWidth  as Css_IconStrokeWidth  ,
} from "./methods";





export {
    StyleValue as ClStyleValue
} from "./class"

export type {
    TVColor as TColor
} from "./types/var/TVColor"



export type TSizeExp = Sizes | SizeUnit;
