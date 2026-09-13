import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentMouseScroller
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentMouseScroller Instance باید Step Instance مستقل داشته باشد.
 */
export function createMouseScrollerStep() {
    return CoreEvent.Step({
        children: {
            zoomIn: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: 0 }),
            }),
            zoomOut: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: 0 }),
            }),
            zoomRefresh: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: 1 }),
            }),
            colorModeLight: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            colorModeDark: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
