import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createInputEmailStep() {
    const endpoint = () => DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as string | null})});
    return DefineWorkflow({children: {
        inputChange: endpoint(),
        inputFocus: endpoint(),
        inputBlur: endpoint(),
    }});
}
