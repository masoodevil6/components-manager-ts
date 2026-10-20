import * as CoreEvent from "@/core_event";

export function createInputSelectOptionStep() {
    return CoreEvent.Step({
        children: {
            label: CoreEvent.Step({children: {click: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})})}}),
            selectChange: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as string | number | null})}),
        },
    });
}
