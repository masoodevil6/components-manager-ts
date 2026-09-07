import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentIcon
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentIcon Instance باید Step Instance مستقل داشته باشد.
 *   اگر IconStep ثابت باشد، همه Instanceها یک Step دارند → تداخل در registerEmit.
 *
 *   ComponentIcon #1 → createIconStep() → Step #1
 *   ComponentIcon #2 → createIconStep() → Step #2
 *   ComponentIcon #3 → createIconStep() → Step #3
 *
 * این Step در constructor ComponentIcon به Base پاس داده می‌شود.
 * در متدهای render به reactiveElementها متصل می‌شود.
 *
 * تفاوت با identity:
 *   identity = بیرونی — والد به این Component
 *   step     = داخلی — این Component به فرزندانش
 *
 * click / hover / blur (Plan 9.1 — نکته ۵):
 *   click    ← Event Engine endpoint (unique روی <i>)
 *   hover    ← DOM → Method API (ساختار Step برای آینده)
 *   blur     ← DOM → Method API (ساختار Step برای آینده)
 */
export function createIconStep() {
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
