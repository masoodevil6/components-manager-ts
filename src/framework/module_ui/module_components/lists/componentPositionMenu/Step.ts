import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentPositionMenu
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentPositionMenu Instance باید Step Instance مستقل داشته باشد.
 *
 *   ComponentPositionMenu #1 → createPositionMenuStep() → Step #1
 *   ComponentPositionMenu #2 → createPositionMenuStep() → Step #2
 *
 * clickOpen / clickAccept / clickReject:
 *   clickOpen    ← Event Engine endpoint (unique روی selector)
 *   clickAccept  ← Event Engine endpoint (unique روی Accept button)
 *   clickReject  ← Event Engine endpoint (unique روی Reject button)
 */
export function createPositionMenuStep() {
    return DefineWorkflow({
        children: {
            clickOpen:   DefineWorkflow({
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
