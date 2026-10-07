import * as CoreEvent from "@/core_event";

export function createElementPositionStep() {
    return CoreEvent.Step({
        children: {
            click: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})}),
        },
    });
}
