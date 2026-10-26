import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createInputRadioBoxStep() {
    return DefineWorkflow({
        children: {
            label: DefineWorkflow({children: {click: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})})}}),
            selectItem: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null})}),
        },
    });
}
