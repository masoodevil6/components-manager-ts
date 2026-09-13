import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentInputCheckBox
 *
 *   click ← Event Engine endpoint
 */
export function createInputCheckBoxStep() {
    return CoreEvent.Step({
        children: {
            label: CoreEvent.Step({
                children: {
                    click: CoreEvent.Step({
                        request:  CoreEvent.Request(),
                        response: CoreEvent.Response({ value: "" }),
                    }),
                }
            }),
            click: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: false }),
            }),
        }
    });
}
