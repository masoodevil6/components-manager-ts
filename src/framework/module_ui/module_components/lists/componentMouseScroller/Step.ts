import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
// --------------------------------


/**
 * Step Factory — درخت Workflow داخلی ComponentMouseScroller
 *
 * Plan 9.1 — factory function (نه ثابت):
 *   هر ComponentMouseScroller Instance باید Step Instance مستقل داشته باشد.
 */
export function createMouseScrollerStep() {
    return DefineWorkflow({
        children: {
            zoomIn: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: 0 }),
            }),
            zoomOut: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: 0 }),
            }),
            zoomRefresh: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: 1 }),
            }),
            colorModeLight: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
            colorModeDark: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
