import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentBorder
 *
 * هر ComponentBorder Instance باید Step Instance مستقل داشته باشد.
 *
 *   click ← Event Engine endpoint (unique روی <section>)
 */
export function createBorderStep() {
    return DefineWorkflow({
        children: {
            click: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
