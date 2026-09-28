import {ComponentExample} from "@/core_components";
import * as UiCategory from "@/ui_categories";
import {Keys} from "../../../../module_categories/languages";

export const DefaultExample: ComponentExample = {
    id: "input_otp_default",
    name: Keys.category.components.inputOtp.examples.default.name,
    description: Keys.category.components.inputOtp.examples.default.description,
    render: (): HTMLElement => {
        let otp: ReturnType<typeof UiCategory.UI.Inputs.InputOtp>;
        otp = UiCategory.UI.Inputs.InputOtp(
            {
                classList: ["col-md-6", "col-12", "border", "p-3"],
                prop_input: "0912-345-6789",
                prop_length: 6,
                prop_langs: {
                    _title_otp_description: "کد برای شماره زیر ارسال شد",
                    _tooltip_otp_description: "کد یکبارمصرف برای ورود به سیستم است",
                },
            },
            {
                GET_NEW_TOKEN: () => {
                    console.log("request a new OTP");
                    otp.call_startCountdown(0.1);
                },
                FINISH_TOKEN: () => console.log("OTP countdown finished"),
                CHANGE: () => console.log("OTP changed:", otp.call_getValue()),
            },
        );
        otp.call_startCountdown(0.1);
        return otp.getElement() as HTMLElement;
    },
};
