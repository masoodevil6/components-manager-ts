import * as CoreEvent from "@/core_event";

export function createTimerDownStep() {
    return CoreEvent.Step({
        children: {
            clickRetry: CoreEvent.Step({ request: CoreEvent.Request(), response: CoreEvent.Response({ value: "" }) }),
            finishTimer: CoreEvent.Step({ request: CoreEvent.Request(), response: CoreEvent.Response({ value: "" }) }),
        },
    });
}
