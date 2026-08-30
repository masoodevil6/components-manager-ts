import { ITemplate } from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as CoreLanguage from "@/core_languages";
import * as CoreEvent    from "@/core_event";
import * as UiCategory from "@/ui_categories";
///------------------------------

/**
 * Stepهای فرم ثبت — مسیر: Register.info.{name|family|submit}
 * (بخش ۶.۳ پلن اصلی — در scope ماژول تا در هر render بازسازی نشوند)
 * identity هر Step یک Symbol یکتاست؛ مسیر متنی فقط metadata است (بند ۲-۳ پلن 4.3)
 */
const StepRegister = CoreEvent.Step({
    children: {
        info: CoreEvent.Step({
            children: {
                name:   CoreEvent.Step({
                    request:  CoreEvent.Request(),
                    response: CoreEvent.Response({ value: "" })
                }),
                family: CoreEvent.Step({
                    request:  CoreEvent.Request(),
                    response: CoreEvent.Response({ value: "" })
                }),
                submit: CoreEvent.Step({
                    request:  CoreEvent.Request(),
                    response: CoreEvent.Response()
                })
            }
        })
    }
});

export class ClHomePage implements ITemplate {

    render(query?: Record<string,string> ,extra?: Record<string, any>): HTMLElement {

        // ---- فرم مثال CoreEvent (بخش ۶.۴ پلن اصلی) ----

        // input نام — دریافت‌کننده Request (emit = Request Handler — بند ۹ پلن 4.3)
        const nameInput = CoreReactive.App.input({
            className: ["form-input"],
            attrs: { placeholder: "نام" },
            unique: StepRegister.info.name,
            emit: (request) => {
                const value = (nameInput.getElement() as HTMLInputElement).value;
                return { value, valid: value.trim().length > 0 };   // ← Response این المان
            }
        });

        // input نام خانوادگی
        const familyInput = CoreReactive.App.input({
            className: ["form-input"],
            attrs: { placeholder: "نام خانوادگی" },
            unique: StepRegister.info.family,
            emit: (request) => {
                console.log(request);
                const value = (familyInput.getElement() as HTMLInputElement).value;
                return { value, valid: value.trim().length > 0 };
            }
        });

        // دکمه Submit — آغازگر Request با helper تزریق‌شده (بخش ۶.۲ پلن اصلی)
        // (بند ۲۳ پلن 4.3) تست اصلی: Request واحد → دو Dispatch → دو Response قابل ردیابی
        const submitButton = CoreReactive.App.button({
            className: ["form-submit"],
            children: ["ثبت"],
            unique: StepRegister.info.submit,
            on: {
                click: (e, event) => {
                    const responses = event!.request(
                        CoreEvent.requestMap([
                            [StepRegister.info.name,   { action: "validate" }],
                            [StepRegister.info.family, { action: "validate" }]
                        ]),
                        StepRegister.info.submit
                    );

                    // بند ۲۳: هر Response باید requestId/target/value را مشخص کند
                    const nameResponse   = responses.get(StepRegister.info.name);
                    const familyResponse = responses.get(StepRegister.info.family);

                    console.log("[CoreEvent] responses ← Register.info.submit", {
                        requestId: nameResponse?.requestId,          // واحد برای هر دو Response
                        dispatchIds: [nameResponse?.dispatchId, familyResponse?.dispatchId],
                        source: "Register.info.submit",
                        results: {
                            name:   { target: "Register.info.name",   ...nameResponse?.value,   status: nameResponse?.status },
                            family: { target: "Register.info.family", ...familyResponse?.value, status: familyResponse?.status }
                        },
                        responses
                    });
                    console.log("nameResponse" ,nameResponse?.value ,
                        "familyResponse" , familyResponse?.value);
                }
            }
        });

        const container = CoreReactive.App.div({
            className: [
                "page home"
            ] ,
            children:[
                nameInput,
                familyInput,
                submitButton
            ]
        }).getElement()

        return container
    }

    onLoad(pageElement: HTMLElement): void {
    }

}