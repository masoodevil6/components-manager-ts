import * as CoreEvent from "@/core_event";

export function createInputOtpStep() {
    const endpoint = () => CoreEvent.Step({
        request: CoreEvent.Request(),
        response: CoreEvent.Response({ value: "" }),
    });
    return CoreEvent.Step({
        children: {
            getNewToken: endpoint(),
            finishToken: endpoint(),
            change: endpoint(),
        },
    });
}
