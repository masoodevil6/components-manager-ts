import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentInputAgreementCheckBox
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentInputAgreementCheckBox Instance باید Step Instance مستقل داشته باشد.
 */
export function createInputAgreementCheckBoxStep() {
    return DefineWorkflow({
        children: {
            clickAll: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            clickItem: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
