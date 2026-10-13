import * as CoreEvent from "@/core_event";

export function createFormStep() {
    const endpoint = () => CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as unknown})});
    return CoreEvent.Step({children: {submit: endpoint(), getResponse: endpoint(), response: endpoint()}});
}
