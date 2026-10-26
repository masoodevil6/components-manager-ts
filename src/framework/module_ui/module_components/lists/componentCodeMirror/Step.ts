import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
import {CodeMirrorLanguage} from "./Props";

export function createCodeMirrorStep() {
    return DefineWorkflow({
        children: {
            change: DefineWorkflow({
                request: CoreEvent.Request(),
                response: CoreEvent.Response({
                    value: "" as string,
                    language: CodeMirrorLanguage.HTML,
                }),
            }),
        },
    });
}
