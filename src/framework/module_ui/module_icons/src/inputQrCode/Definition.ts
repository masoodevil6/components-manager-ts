import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.inputQrCode.name,
    description: Keys.icons.inputQrCode.description,

    viewBoxX:    300 ,
    viewBoxY:    300 ,

    render(context) {

        return [
            /// Top-left frame
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "27.31" ,
                    y:        "26.78" ,
                    width:    "100" ,
                    height:   "100"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "58.5" ,
                    y:        "57.97" ,
                    width:    "37.62" ,
                    height:   "37.62"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Top-right frame
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "171.06" ,
                    y:        "26.78" ,
                    width:    "100" ,
                    height:   "100"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "202.25" ,
                    y:        "57.97" ,
                    width:    "37.62" ,
                    height:   "37.62"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Bottom-left frame
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "27.31" ,
                    y:        "168.53" ,
                    width:    "100" ,
                    height:   "100"
                },
                attrsBind: {
                    fill:             context.secondaryColor,
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth
                }
            }),
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "58.5" ,
                    y:        "200.4" ,
                    width:    "37.62" ,
                    height:   "37.62"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            /// Bottom-right data modules
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "184.31" ,
                    y:        "158.03" ,
                    width:    "94.75" ,
                    height:   "25"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "203.25" ,
                    y:        "166.03" ,
                    width:    "37.62" ,
                    height:   "56.03"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "239.88" ,
                    y:        "203.25" ,
                    width:    "37.62" ,
                    height:   "37.62"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "221.06" ,
                    y:        "259.28" ,
                    width:    "56.44" ,
                    height:   "18.81"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "165.5" ,
                    y:        "203.25" ,
                    width:    "18.81" ,
                    height:   "37.62"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            }),
            CoreReactive.App.svgRect({
                attrs: {
                    x:        "165.5" ,
                    y:        "240.47" ,
                    width:    "37.62" ,
                    height:   "37.62"
                },
                attrsBind: {
                    fill:             context.primaryColor
                }
            })
        ];
    }
};