import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentRecyclerView (Plan 15.1.0)
 *
 * بدون event داخلی — فقط root step خالی.
 */
export function createRecyclerViewStep() {
    return CoreEvent.Step({
        children: {}
    });
}
