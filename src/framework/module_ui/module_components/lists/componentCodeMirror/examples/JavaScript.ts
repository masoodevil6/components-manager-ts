import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {CodeMirrorLanguage} from "../Props";

export const JavaScriptExample: ComponentExample = {
    id: "code_mirror_javascript",
    name: Keys.category.components.codeMirror.examples.javascript.name,
    description: Keys.category.components.codeMirror.examples.javascript.description,
    render: (): HTMLElement => UiCategory.UI.Tools.Code.CodeMirror({
        classList: ["col-12", "mb-3"],
        prop_title: "JavaScript Editor",
        prop_language: CodeMirrorLanguage.JAVASCRIPT,
        prop_canRun: true,
        prop_lineWrapping: true,
        prop_placeholder: "Write JavaScript...",
        prop_value: "const greet = (name) => {\n  return `Hello, ${name}!`;\n};\n\nconsole.log(greet(\"CodeMirror\"));",
        prop_editorHeight: "240px",
    }).getElement() as HTMLElement,
};
