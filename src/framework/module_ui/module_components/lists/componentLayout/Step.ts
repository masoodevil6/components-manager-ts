import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createLayoutStep() {
    const endpoint = () => DefineWorkflow({
        request: CoreEvent.Request(),
        response: CoreEvent.Response({value: null as {message?: string} | null}),
    });

    return DefineWorkflow({children: {
        showPopup: endpoint(),
        childInputChanged: endpoint(),
    }});
}
