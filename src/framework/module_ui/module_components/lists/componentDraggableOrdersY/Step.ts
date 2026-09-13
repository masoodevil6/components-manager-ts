import * as CoreEvent from "@/core_event";

export function createDraggableOrdersStep() {
    return CoreEvent.Step({
        children: {
            update: CoreEvent.Step({
                request:  CoreEvent.Request(),
                response: CoreEvent.Response({ value: "" }),
            }),
        }
    });
}
