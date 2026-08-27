import * as CoreReactive    from "@/core_reactive";
import * as CoreObservable  from "@/core_observable";
import * as CoreConfig      from "@/core_configs";
import * as CoreLanguage    from "@/core_languages";
import * as UtilStyle       from "@/util_styles";
import * as UtilConst       from "@/util_consts";
import * as UtilBrands      from "@/util_brands";
///------------------------------
import {IconDefinition , IconOptions} from "../interface";
import {IconVariant} from "../enums";




export function MtCreateIcon(
    definition: IconDefinition,
    options:    IconOptions = {}
): UtilBrands.Icons {

    const scope = new CoreObservable.Scope()

    const sizeName =
        options.size ??
        CoreConfig.Settings.SizeName.observable();

    const primaryColor =
        options.primaryColor ??
        UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);

    const secondaryColor =
        options.secondaryColor ??
        UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);

    const borderWidth =
        options.strokeWidth ??
        CoreObservable.App.computed(
            (sizeName) => {
                return UtilStyle.Css_BorderWidth(sizeName)
            } ,
            [
                sizeName
            ],
            scope
        );

    const strokeWidth = CoreObservable.App.computed(
        (strokeWidth) => {
            return UtilStyle.Css_IconStrokeWidth(strokeWidth , definition.viewBoxX  , definition.viewBoxY)
        } ,
        [borderWidth] ,
        scope
    )

    const variant =
        options.variant ??
        IconVariant.DEFAULT;


    const content =
        definition.render({
            sizeName,
            primaryColor,
            secondaryColor,
            strokeWidth,
            variant ,
            scope
        });


    return CoreReactive.App.svg({
        attrs: {
            "xmlns" :       "http://www.w3.org/2000/svg" ,
            "role" :        "img" ,
            "fill" :        "none"
        } ,
        attrsBind: {
            "aria-label" :   CoreLanguage.App.translate(definition.title)  ,
            "viewBox" :      CoreObservable.App.computed(
                (viewBoxX , viewBoxY)=> {
                    return `0 0 ${viewBoxX} ${viewBoxY}`
                },
                [
                    definition.viewBoxX ,
                    definition.viewBoxY
                ] ,
                scope
            ),
            width:           CoreObservable.App.computed(
                value => UtilStyle.Css_IconSize(value),
                [sizeName],
                scope
            ),
            height:          CoreObservable.App.computed(
                value => UtilStyle.Css_IconSize(value),
                [sizeName],
                scope
            ),
        } ,
        children: content
    }) as UtilBrands.Icons;

}
