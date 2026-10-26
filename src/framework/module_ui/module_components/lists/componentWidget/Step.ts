import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

const fetchStep = () => DefineWorkflow({
    request: CoreEvent.Request(),
    response: CoreEvent.Response({value: null as unknown}),
});

export function createWidgetStep() {
    return DefineWorkflow({
        children: {
            fetch: fetchStep(),
            retry: fetchStep(),
        },
    });
}
