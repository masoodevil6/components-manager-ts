import * as CoreReactive   from "@/core_reactive";
///--------------------
import {IconDefinition}    from "../../basic/interface";
import {Keys}              from "../../languages";


export const Definition: IconDefinition = {

    title:       Keys.icons.userChangePassword.name,
    description: Keys.icons.userChangePassword.description,

    viewBoxX:    357,
    viewBoxY:    362,

    render(context) {

        return [

            CoreReactive.App.svgPath({
                attrs: {
                    opacity: "0.4"
                },
                attrsBind: {
                    d:             "M329.07,150.86l-27,5l36,16l3-33l-8.42,8.93c0,0-5.38-10.99-26.15-40.44c-38.44-54.5-93.44-65.14-124.94-64.72 c-58.81,0.79-150,54.37-150,150c0,82.84,67.16,150,150,150c20.91,0,38.67-4.84,44.6-6.74c55.49-17.77,82.96-64.15,90.77-78.56",
                    fill:          context.secondaryColor,
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    opacity: "0.4"
                },
                attrsBind: {
                    d:             "M172.12,189l18.17-17.51c12.93-12.46,13.31-33.04,0.85-45.96l0,0c-12.46-12.93-33.04-13.31-45.96-0.85 l-18.17,17.51c-12.93,12.46-13.31,33.04-0.85,45.96l0,0C138.61,201.07,159.19,201.45,172.12,189z",
                    fill:          context.secondaryColor,
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1:      "188.52",
                    y1:      "184.92",
                    x2:      "251.18",
                    y2:      "246.57",
                    opacity: "0.4"
                },
                attrsBind: {
                    fill:          context.secondaryColor,
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1:      "207.72",
                    y1:      "211.45",
                    x2:      "189.71",
                    y2:      "229.39",
                    opacity: "0.4",
                    fill:    "none"
                },
                attrsBind: {
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1:      "233.64",
                    y1:      "234.42",
                    x2:      "215.63",
                    y2:      "252.36",
                    opacity: "0.4",
                    fill:    "none"
                },
                attrsBind: {
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M324.32,134.43l-27,5l36,16l3-33l-8.42,8.93c0,0-5.38-10.99-26.15-40.44c-38.44-54.5-93.44-65.14-124.94-64.72 c-58.81,0.79-150,54.37-150,150c0,82.84,67.16,150,150,150c20.91,0,38.67-4.84,44.6-6.74c55.49-17.77,82.96-64.15,90.77-78.56",
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgPath({
                attrs: {
                    fill: "none"
                },
                attrsBind: {
                    d:             "M175.72,177.88l18.17-17.51c12.93-12.46,13.31-33.04,0.85-45.96l0,0c-12.46-12.93-33.04-13.31-45.96-0.85 l-18.17,17.51c-12.93,12.46-13.31,33.04-0.85,45.96l0,0C142.22,189.96,162.8,190.34,175.72,177.88z",
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1:   "192.13",
                    y1:   "173.8",
                    x2:   "254.78",
                    y2:   "235.45",
                    fill: "none"
                },
                attrsBind: {
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1:   "211.33",
                    y1:   "200.34",
                    x2:   "193.32",
                    y2:   "218.27",
                    fill: "none"
                },
                attrsBind: {
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            }),

            CoreReactive.App.svgLine({
                attrs: {
                    x1:   "237.25",
                    y1:   "223.31",
                    x2:   "219.24",
                    y2:   "241.24",
                    fill: "none"
                },
                attrsBind: {
                    stroke:        context.primaryColor,
                    "stroke-width": context.strokeWidth
                }
            })

        ];
    }
};
