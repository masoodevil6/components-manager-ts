import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentWindowConfirm
 *
 * هر ComponentWindowConfirm Instance باید Step Instance مستقل داشته باشد.
 *
 *   confirm  ← Event Engine endpoint
 *   cancel   ← Event Engine endpoint
 */
export function createWindowConfirmStep() {
    return CoreEvent.Step({
        children: {
            confirm: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            cancel: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
