import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentTable
 *
 * هر ComponentTable Instance باید Step Instance مستقل داشته باشد.
 *
 *   selectCol       ← Event Engine endpoint
 *   clickOptionCard ← Event Engine endpoint
 */
export function createTableStep() {
    return CoreEvent.Step({
        children: {
            selectCol: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            clickOptionCard: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
