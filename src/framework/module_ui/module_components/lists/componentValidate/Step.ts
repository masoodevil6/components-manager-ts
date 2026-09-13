import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentValidate (Plan 15.1.0)
 *
 * هر ComponentValidate Instance باید Step Instance مستقل داشته باشد.
 *
 *   change ← Event Engine endpoint (unique روی validate form)
 */
export function createValidateStep() {
    return CoreEvent.Step({
        children: {
            change: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
