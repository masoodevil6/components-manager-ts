import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentErrorIsEmpty
 *
 * هر ComponentErrorIsEmpty Instance باید Step Instance مستقل داشته باشد.
 *
 *   click ← Event Engine endpoint (unique روی Button composition)
 */
export function createErrorIsEmptyStep() {
    return DefineWorkflow({
        children: {
            click: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
