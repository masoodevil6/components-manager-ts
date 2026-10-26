import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createTimerDownStep() {
    return DefineWorkflow({
        children: {
            clickRetry: DefineWorkflow({ request: CoreEvent.Request(), response: CoreEvent.Response({ value: "" }) }),
            finishTimer: DefineWorkflow({ request: CoreEvent.Request(), response: CoreEvent.Response({ value: "" }) }),
        },
    });
}
