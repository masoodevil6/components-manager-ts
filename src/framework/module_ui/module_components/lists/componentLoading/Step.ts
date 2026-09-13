import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentLoading
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentLoading Instance باید Step Instance مستقل داشته باشد.
 *
 *   ComponentLoading #1 → createLoadingStep() → Step #1
 *   ComponentLoading #2 → createLoadingStep() → Step #2
 *
 * cancel:
 *   cancel    ← Event Engine endpoint (unique روی cancel button)
 */
export function createLoadingStep() {
    return CoreEvent.Step({
        children: {
            cancel: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
