import {DefineWorkflow} from "@/core_components";
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
    return DefineWorkflow({
        children: {
            click: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            hover: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            blur: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
