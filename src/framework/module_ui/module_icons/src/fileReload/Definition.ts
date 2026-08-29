import * as CoreReactive from "@/core_reactive";
///--------------------
import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages"

export const Definition: IconDefinition = {
    title:       Keys.icons.fileReload.name,
    description: Keys.icons.fileReload.description,

    viewBoxX:    320 ,
    viewBoxY:    325 ,

    render(context) {

        return [
            CoreReactive.App.svgPath({
                attrs: {
                    d:        "M70.6,258.28C94.44,280.44,126.39,294,161.5,294c73.73,0,133.5-59.77,133.5-133.5S235.23,27,161.5,27 S28,86.77,28,160.5c0,16.4,2.96,32.11,8.37,46.62"
                },
                attrsBind: {
                    fill:     context.secondaryColor,
                    opacity:  "0.6"
                }
            }),
            CoreReactive.App.svgPath({
                attrs: {
                    d:        "M70.6,258.28C94.44,280.44,126.39,294,161.5,294c73.73,0,133.5-59.77,133.5-133.5S235.23,27,161.5,27 S28,86.77,28,160.5c0,16.4,2.96,32.11,8.37,46.62"
                },
                attrsBind: {
                    stroke:           context.primaryColor,
                    "stroke-width":   context.strokeWidth,
                    fill:             "none"
                }
            }),
            CoreReactive.App.svgPolygon({
                attrs: {
                    points:   "42,217 49,302 122,234"
                },
                attrsBind: {
                    fill:     context.primaryColor
                }
            })
        ];
    }
};