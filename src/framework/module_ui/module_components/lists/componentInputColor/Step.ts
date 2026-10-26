import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createInputColorStep() {
    return DefineWorkflow({
        children: {
            change: DefineWorkflow({
                request: CoreEvent.Request(),
                response: CoreEvent.Response({value: null as string | null}),
            }),
        },
    });
}
