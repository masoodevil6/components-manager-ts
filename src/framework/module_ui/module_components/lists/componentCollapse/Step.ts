import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentCollapse (Plan 15.1.0)
 *
 * هر ComponentCollapse Instance باید Step Instance مستقل داشته باشد.
 *
 *   click ← Event Engine endpoint (unique روی Border composition)
 */
export function createCollapseStep() {
    return DefineWorkflow({
        children: {
            click: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
