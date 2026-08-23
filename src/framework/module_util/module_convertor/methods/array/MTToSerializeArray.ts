///------------------------------
import {TSerializeItem as SerializeItem} from "../../types/TSerializeItem";

export const MTToSerializeArray = function (formElement: HTMLFormElement | null): SerializeItem[] {
    if (!formElement)
        return [];

    const result: SerializeItem[] = [];

    const elements = formElement.elements;

    for (let i = 0; i < elements.length; i++) {

        const field = elements[i] as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

        if (
            !field.name ||
            field.disabled ||
            ["file", "reset", "submit", "button"].includes((field as HTMLInputElement).type)
        ) {
            continue;
        }

        if (field instanceof HTMLSelectElement && field.multiple) {

            for (const option of Array.from(field.options)) {

                if (option.selected) {

                    result.push({
                        name: field.name,
                        value: option.value,
                        type: "select-multiple"
                    });

                }
            }

        } else if (

            (!(field instanceof HTMLInputElement) ||
                !["checkbox", "radio"].includes(field.type)) ||

            (field instanceof HTMLInputElement && field.checked)

        ) {

            result.push({
                name: field.name,
                value: field.value,
                type: (field as HTMLInputElement).type
            });

        }
    }

    return result;
}