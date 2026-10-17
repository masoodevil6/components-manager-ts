import * as UICategories from "@/ui_categories";
import {Keys} from "../../../../languages";
import {CodeMirror} from "./codeMirror";
import {Console} from "./console";

export const Definition: UICategories.TCategoryComponentDefinition = {
    id: "code",
    name: Keys.category.components.tools.code.name,
    description: Keys.category.components.tools.code.description,
    components: [CodeMirror as any, Console as any],
};
