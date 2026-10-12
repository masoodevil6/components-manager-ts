import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {CodeMirrorLanguage} from "../Props";

export const DefaultExample: ComponentExample = {
    id: "code_mirror_default",
    name: Keys.category.components.codeMirror.examples.default.name,
    description: Keys.category.components.codeMirror.examples.default.description,
    render: (): HTMLElement => UiCategory.UI.Tools.Code.CodeMirror({
        classList: ["col-12", "mb-3"],
        prop_language: CodeMirrorLanguage.HTML,
        prop_value: "<main>\n  <h1>Hello, CodeMirror</h1>\n  <p>Edit this HTML source.</p>\n</main>",
        prop_editorHeight: "240px",
    }, {
        CHANGE: (_event, dataArgs) => console.log("[CodeMirror] HTML changed", dataArgs.VALUE),
    }).getElement() as HTMLElement,
};
