import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentSidebar
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentSidebar Instance باید Step Instance مستقل داشته باشد.
 */
export function createSidebarStep() {
    return DefineWorkflow({
        children: {
            toggle: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
