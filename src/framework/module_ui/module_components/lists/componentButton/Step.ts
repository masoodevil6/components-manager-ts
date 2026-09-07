import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentButton
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentButton Instance باید Step Instance مستقل داشته باشد.
 *
 *   ComponentButton #1 → createButtonStep() → Step #1
 *   ComponentButton #2 → createButtonStep() → Step #2
 *
 * click / hover / blur:
 *   click    ← Event Engine endpoint (unique روی <button>)
 *   hover    ← DOM → Method API (ساختار Step برای آینده)
 *   blur     ← DOM → Method API (ساختار Step برای آینده)
 */
export function createButtonStep() {
    return CoreEvent.Step({
        children: {
            click: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            hover: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            blur: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
