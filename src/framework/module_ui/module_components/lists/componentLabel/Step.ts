import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentLabel (Plan 13.1.0)
 *
 * هر ComponentLabel Instance باید Step Instance مستقل داشته باشد.
 *
 *   click ← Event Engine endpoint (unique روی Border composition)
 */
export function createLabelStep() {
    return CoreEvent.Step({
        children: {
            click: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}