import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentWindow
 *
 * هر ComponentWindow Instance باید Step Instance مستقل داشته باشد.
 *
 *   open    ← Event Engine endpoint
 *   close   ← Event Engine endpoint
 *   resize  ← Event Engine endpoint
 */
export function createWindowStep() {
    return CoreEvent.Step({
        children: {
            open: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            close: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            resize: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
