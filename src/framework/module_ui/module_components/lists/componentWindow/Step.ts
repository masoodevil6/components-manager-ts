import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentWindow
 *
 * هر ComponentWindow Instance باید Step Instance مستقل داشته باشد.
 *
 *   open    ← Event Engine endpoint
 *   close   ← Event Engine endpoint
 *   resize  ← Event Engine endpoint
 */
export function createWindowStep() {
    return DefineWorkflow({
        children: {
            open: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            close: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            resize: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
