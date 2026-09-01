import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import {App as ReactiveApp} from "@/core_reactive";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * WithContent Example برای ComponentStructure
 *
 * ساختار با محتوای داخلی تزریق‌شده از طریق content callback.
 * برنامه‌نویس با خواندن این فایل می‌بیند:
 *   - چطور content() تزریق می‌شود
 *   - محتوا می‌تواند هر ReactiveApp باشد (div, section, ...)
 *   - propهای پایه (classList, prop_show, prop_structureClass) همزمان با content کار می‌کنند
 */
export const WithContentExample: ComponentExample = {

    id:          "structure_with_content",

    name:        Keys.category.components.basic.examples.withContent.name,

    description: Keys.category.components.basic.examples.withContent.description,

    render: (): HTMLElement => UiCategory.UI.Basic.ComponentStructure(
        {
            classList:           ["p-3", "border", "rounded", "m-2"],
            prop_show:           true,
            prop_structureClass: ["bg-light"],
            content: () => ReactiveApp.div({
                className: ["p-2"],
                children: [
                    `<h6>ComponentStructure with content</h6>`,
                    `<p>این محتوا از طریق content() تزریق شده است.</p>`,
                    `<p class="text-muted small">prop_show = true → ساختار قابل دیدن است</p>`,
                ],
            }),
        },
        {},
    ).getElement() as HTMLElement,

};
