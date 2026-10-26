import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createInputSelectOptionStep() {
    return DefineWorkflow({
        children: {
            label: DefineWorkflow({children: {click: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: ""})})}}),
            selectChange: DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as string | number | null})}),
        },
    });
}
