import * as CoreEvent from "@/core_event";

export function createInputRadioBoxStep() {
    return CoreEvent.Step({
        children: {
            label: CoreEvent.Step({children: {click: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})})}}),
            selectItem: CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null})}),
        },
    });
}
