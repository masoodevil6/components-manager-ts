import * as CoreEvent from "@/core_event";
import {CodeMirrorLanguage} from "./Props";

export function createCodeMirrorStep() {
    return CoreEvent.Step({
        children: {
            change: CoreEvent.Step({
                request: CoreEvent.Request(),
                response: CoreEvent.Response({
                    value: "" as string,
                    language: CodeMirrorLanguage.HTML,
                }),
            }),
        },
    });
}
