import {DefineWorkflow} from "@/core_components";
import * as CoreEvent from "@/core_event";
import type {PriceValue} from "./Props";

export function createInputPriceStep() {
    const endpoint = () => DefineWorkflow({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as PriceValue | null})});
    return DefineWorkflow({children: {
        input: endpoint(),
        focus: endpoint(),
        blur: endpoint(),
        clickButton: endpoint(),
    }});
}
