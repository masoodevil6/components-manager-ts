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
    return CoreEvent.Step({
        children: {
            clickOpen:   CoreEvent.Step({
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
