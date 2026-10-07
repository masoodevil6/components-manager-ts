import * as CoreEvent from "@/core_event";
import type {PriceValue} from "./Props";

export function createInputPriceStep() {
    const endpoint = () => CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as PriceValue | null})});
    return CoreEvent.Step({children: {
        input: endpoint(),
        focus: endpoint(),
        blur: endpoint(),
        clickButton: endpoint(),
    }});
}
