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


    const sizeName =
        options.size ??
        CoreConfig.Settings.SizeName.observable();

    const primaryColor =
        options.primaryColor ??
        UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1);

    const secondaryColor =
        options.secondaryColor ??
        UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1);

    const strokeWidth =
        options.strokeWidth ??
        10;

    const variant =
        options.variant ??
        IconVariant.DEFAULT;


    const content =
        definition.render({
            sizeName,
            primaryColor,
            secondaryColor,
            strokeWidth,
            variant
        });


    return CoreReactive.App.svg({
        attrs: {
            "xmlns" :       "http://www.w3.org/2000/svg" ,
            "role" :        "img" ,
            "fill" :        "none"
        } ,
        attrsBind: {
            "aria-label" :   CoreLanguage.App.translate(definition.title)  ,
            "viewBox" :        definition.viewBox,
            width:           CoreObservable.App.computed(
                value => UtilStyle.Css_IconSize(value),
                [sizeName],
                new CoreObservable.Scope()
            ),
            height:          CoreObservable.App.computed(
                value => UtilStyle.Css_IconSize(value),
                [sizeName],
                new CoreObservable.Scope()
            ),
        } ,
        stylesBind: {
            width:           CoreObservable.App.computed(
                value => UtilStyle.Css_IconSize(value),
                [sizeName],
                new CoreObservable.Scope()
            ),
            height:          CoreObservable.App.computed(
                value => UtilStyle.Css_IconSize(value),
                [sizeName],
                new CoreObservable.Scope()
            ),
        } ,
        children: content
    }) as UtilBrands.Icons;

}
