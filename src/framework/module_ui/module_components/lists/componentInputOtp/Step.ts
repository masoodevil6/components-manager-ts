import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";

export function createInputOtpStep() {
    const endpoint = () => DefineWorkflow({
        request: CoreEvent.Request(),
        response: CoreEvent.Response({ value: "" }),
    });
    return DefineWorkflow({
        children: {
            getNewToken: endpoint(),
            finishToken: endpoint(),
            change: endpoint(),
        },
    });
}
