import {IconDefinition} from "../../basic/interface";
import {Keys}           from "../../languages";
/// --------------------
import {buildWebCodeLayers} from "../webCode/anim";


export const Definition: IconDefinition = {

    title:       Keys.icons.webCode301.name,
    description: Keys.icons.webCode301.description,

    viewBoxX:    700 ,
    viewBoxY:    250 ,

    render(context) {

        return buildWebCodeLayers({
            code:    "301" ,
            context: context
        });
    }
};