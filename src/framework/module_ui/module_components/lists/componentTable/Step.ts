import {DefineWorkflow} from "@/core_components";
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
    return DefineWorkflow({
        children: {
            selectCol: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            clickOptionCard: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
