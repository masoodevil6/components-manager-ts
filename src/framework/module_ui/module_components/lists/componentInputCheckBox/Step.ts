import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentInputCheckBox
 *
 *   click ← Event Engine endpoint
 */
export function createInputCheckBoxStep() {
    return DefineWorkflow({
        children: {
            label: DefineWorkflow({
                children: {
                    click: DefineWorkflow({
                        request:  CoreEvent.Request(),
                        response: CoreEvent.Response({ value: "" }),
                    }),
                }
            }),
            click: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: false }),
            }),
        }
    });
}
