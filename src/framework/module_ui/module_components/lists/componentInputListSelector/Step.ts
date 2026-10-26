import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentInputListSelector
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentInputListSelector Instance باید Step Instance مستقل داشته باشد.
 */
export function createInputListSelectorStep() {
    return DefineWorkflow({
        children: {
            clickIcon: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            clickAccept: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            clickReject: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
