import * as CoreEvent from "@/core_event";

export function createInputFileStep() {
    const endpoint = () => CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as unknown})});
    return CoreEvent.Step({children: {changeFiles: endpoint(), deleteFile: endpoint()}});
}
