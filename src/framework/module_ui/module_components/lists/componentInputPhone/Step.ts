import * as CoreEvent from "@/core_event";

export function createInputPhoneStep() {
    const endpoint = () => CoreEvent.Step({request: CoreEvent.Request(), response: CoreEvent.Response({value: null as string | null})});
    return CoreEvent.Step({children: {
        selectCountryChange: endpoint(),
        selectCityChange: endpoint(),
        inputChange: endpoint(),
        inputFocus: endpoint(),
        inputBlur: endpoint(),
    }});
}
