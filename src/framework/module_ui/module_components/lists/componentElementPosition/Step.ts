import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createElementPositionStep() {
    return DefineWorkflow({
        children: {
            click: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})}),
        },
    });
}
