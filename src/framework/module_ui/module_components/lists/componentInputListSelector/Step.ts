import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentInputListSelector
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentInputListSelector Instance باید Step Instance مستقل داشته باشد.
 */
export function createInputListSelectorStep() {
    return CoreEvent.Step({
        children: {
            clickIcon: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            clickAccept: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            clickReject: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
