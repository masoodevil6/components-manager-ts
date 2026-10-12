import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";
import {CodeMirrorLanguage} from "../Props";

export const ReadOnlyExample: ComponentExample = {
    id: "code_mirror_read_only",
    name: Keys.category.components.codeMirror.examples.readOnly.name,
    description: Keys.category.components.codeMirror.examples.readOnly.description,
    render: (): HTMLElement => UiCategory.UI.Tools.Code.CodeMirror({
        classList: ["col-12", "mb-3"],
        prop_language: CodeMirrorLanguage.HTML,
        prop_isReadOnly: true,
        prop_value: "<article>\n  <h2>Read-only preview</h2>\n  <p>This source can be selected, but not edited.</p>\n</article>",
        prop_editorHeight: "220px",
    }).getElement() as HTMLElement,
};
