import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentFloatMenu
 *
 * هر ComponentFloatMenu Instance باید Step Instance مستقل داشته باشد.
 *
 *   click ← Event Engine endpoint (unique روی <section>)
 */
export function createFloatMenuStep() {
    return DefineWorkflow({
        children: {
            click: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
