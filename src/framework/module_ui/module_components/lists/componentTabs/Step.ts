import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentTabs (Plan 15.1.0)
 *
 * بدون event داخلی — فقط root step خالی.
 */
export function createTabsStep() {
    return DefineWorkflow({
        children: {}
    });
}
