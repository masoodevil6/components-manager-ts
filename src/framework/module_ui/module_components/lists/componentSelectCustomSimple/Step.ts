import * as CoreEvent from "@/core_event";

export function createSelectCustomSimpleStep() {
    const endpoint = () => CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as string | number | null})});
    return CoreEvent.Step({children: {selectChange: endpoint(), selectSearch: endpoint(), selectOpen: endpoint(), selectClose: endpoint()}});
}
