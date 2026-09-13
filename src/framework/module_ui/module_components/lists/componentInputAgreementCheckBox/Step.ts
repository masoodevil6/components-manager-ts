import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentInputAgreementCheckBox
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentInputAgreementCheckBox Instance باید Step Instance مستقل داشته باشد.
 */
export function createInputAgreementCheckBoxStep() {
    return CoreEvent.Step({
        children: {
            clickAll: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            clickItem: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
