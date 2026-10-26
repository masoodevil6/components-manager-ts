import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createDraggableOrdersStep() {
    return DefineWorkflow({
        children: {
            update: DefineWorkflow({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
