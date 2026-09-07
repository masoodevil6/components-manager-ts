import { ITemplate } from "@/core_route";
import { App as ReactiveApp } from "@/core_reactive";
import * as CoreComponents from "@/core_components";
///------------------------------


/**
 * ClTestsPage — صفحه تست Componentها
 *
 * این صفحه به‌صورت خودکار تمام Componentهای ثبت‌شده در ComponentManager را
 * کشف می‌کند و Exampleهای آن‌ها را نمایش می‌دهد.
 *
 * هر Component جدید که در ComponentManager ثبت شود و Example داشته باشد،
 * خودش در این صفحه ظاهر می‌شود — بدون نیاز به کد دستی.
 *
 * جریان:
 *   ComponentManager.list()
 *       → برای هر entry: ComponentManager.getExamples(id)
 *       → برای هر example: example.render()  →  HTMLElement
 *       → نمایش در section اختصاصی آن Component
 */
export class ClTestsPage implements ITemplate {

    render(query?: Record<string, string>, extra?: Record<string, any>): HTMLElement {

        const sections: any[] = [];


        /* ------------------------------------------------
           کشف خودکار تمام Componentهای ثبت‌شده
        ------------------------------------------------ */
        const entries = CoreComponents.ComponentManager.list();

        for (const entry of entries) {

            const examples = CoreComponents.ComponentManager.getExamples(entry.definition.id);

            // Componentهایی که Example ندارند رد شوند
            if (examples.length === 0) continue;


            /* ------------------------------------------------
               Section اختصاصی هر Component
               - عنوان: نام Component
               - محتوا: تمام Exampleهای آن Component
            ------------------------------------------------ */
            const exampleCards: any[] = examples.map(example =>
                ReactiveApp.section({
                    className: ["border", "rounded", "p-2", "col-4"],
                    children: [
                        `<h6 class="small text-muted mb-0">${example.id}</h6>`,
                        example.render(),   // ← مستقیم HTMLElement
                    ],
                }),
            );

            sections.push(
                ReactiveApp.section({
                    className: ["col-12", "p-2"],
                    children: [
                        `<h5>${entry.definition.name}</h5>`,
                        `<hr/>`,
                        ReactiveApp.section({
                            className: ["row", "p-2"],
                            children: exampleCards,
                        }),
                    ],
                }),
            );
        }


        /* ------------------------------------------------
           صفحه نهایی
        ------------------------------------------------ */
        return ReactiveApp.section({
            className: ["row", "p-0", "m-0"],
            children: [

                ReactiveApp.section({
                    className: ["col-12", "p-2", "m-2"],
                    children: [
                        `<h3>Component Tests</h3>`,
                        `<hr/>`,
                    ],
                }),

                ...sections,

            ],
        }).getElement();
    }



    onLoad(pageElement: HTMLElement): void {
        console.log("[TestsPage] onLoad — page element:", pageElement);
    }



}
