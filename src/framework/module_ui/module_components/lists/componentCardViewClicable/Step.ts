import * as CoreEvent from "@/core_event";

export function createCardViewClicableStep() {
    return CoreEvent.Step({
        children: {
            click: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})}),
        },
    });
}
