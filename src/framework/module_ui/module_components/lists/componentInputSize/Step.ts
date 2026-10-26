import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createInputSizeStep() {
    const endpoint = () => DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as number | null})});
    return DefineWorkflow({children: {
        inputChange: endpoint(),
        inputFocus: endpoint(),
        inputBlur: endpoint(),
    }});
}
