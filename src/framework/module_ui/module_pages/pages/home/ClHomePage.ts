import { ITemplate } from "@/core_route";
import * as CoreReactive from "@/core_reactive";
import * as CoreEvent    from "@/core_event";
import * as UiCategory from "@/ui_categories";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import {MenuMoreOrientation} from "@/framework/module_ui/module_components/lists/componentMenuMore";
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
        });

        const exampleExplanation = CoreReactive.App.section({
            className: ["mb-3"],
            children: [
                CoreReactive.App.p({
                    children: [
                        "This example demonstrates CoreEvent request and response handling. Each input listens for a validation request and responds with its current value and whether it is non-empty.",
                    ],
                }),
                CoreReactive.App.p({
                    className: ["mb-0"],
                    children: [
                        "Click Submit to dispatch validation requests to both inputs. The button collects their responses and writes the values, validity, and request metadata to the browser console.",
                    ],
                }),
            ],
        });
        const exampleCollapse = UiCategory.UI.Contents.Collapse({
            prop_collapseTitle: "CoreEvent request / response example",
            prop_collapseBodyIsOpen: true,
            prop_collapseBody: CoreReactive.App.section({
                children: [exampleExplanation, container],
            }),
        });

        const header = UiCategory.UI.Pages.Header.PageHeader({
            prop_pageTitle: "Home",
            prop_hasIconBack: false,
        } as any).getElement();
        const exploreMenu = UiCategory.UI.Menus.MenuMore({
            styles: {width: "100%"},
            prop_orientation: MenuMoreOrientation.VERTICAL,
            prop_menuBackgroundColor: UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_3),
            prop_items: [
                {id: "components", title: "Components", action: "/components"},
                {id: "icons", title: "Icons", action: "/icons"},
                {id: "workflow", title: "Workflow", action: "/workflow"},
            ],
        }, {
            SELECT_ITEM: (_event, dataArgs) => {
                const destination = dataArgs?.ITEM?.action;
                if (destination) window.location.href = destination;
            },
        } as any);
        const sidebar = CoreReactive.App.section({
            styles: {
                display: "flex",
                flexDirection: "column",
                gap: "var(--marginMedium)",
                padding: "var(--paddingMedium)",
                color: "var(--shanColor1)",
            },
            children: [
                CoreReactive.App.h3({
                    styles: {margin: "0", color: "var(--shanColor1)"},
                    children: ["Explore"],
                }),
                exploreMenu.getElement(),
            ],
        });
        const page = UiCategory.UI.Pages.Page({
            prop_header: header,
            prop_content: exampleCollapse.getElement(),
            prop_aside: sidebar,
            prop_asideWidth: UtilStyle.Css_SizeUnit(280, UtilConst.Units.PEXEL),
        } as any);

        return page.getElement() as HTMLElement;
    }

    onLoad(pageElement: HTMLElement): void {
    }

}
