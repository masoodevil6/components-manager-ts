import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentWebCode
 *
 * هر ComponentWebCode Instance باید Step Instance مستقل داشته باشد.
 *
 *   click ← Event Engine endpoint (unique روی Button composition)
 */
export function createWebCodeStep() {
    return DefineWorkflow({
        children: {
            click: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
