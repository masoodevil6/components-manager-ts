import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentListSelectedScroller
 *
 * بدون event داخلی — فقط root step خالی.
 */
export function createListSelectedScrollerStep() {
    return CoreEvent.Step({
        children: {}
    });
}
