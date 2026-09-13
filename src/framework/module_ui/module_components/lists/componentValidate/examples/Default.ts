import {ComponentExample} from "@/core_components";
import * as UiCategory  from "@/ui_categories";
import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as UiIcons     from "@/ui_icons";
import * as UtilConst   from "@/util_consts";
import * as UtilValidators from "@/util_validators";
import {Keys}           from "../../../../module_categories/languages";
// --------------------------------


/**
 * Default Example برای ComponentValidate
 *
 * نمایش یک Validate با input و تمام قوانین اعتبارسنجی موجود:
 *   NotEmpty, TextLength, CharLength, IsEmail, NumLength, TextCharUpper, TextForbidden
 */
export const DefaultExample: ComponentExample = {

    id:          "validate_default",

    name:        Keys.category.components.validate.examples.default.name,

    description: Keys.category.components.validate.examples.default.description,

    render: (): HTMLElement => {
        const valueObs = new CoreObservable.App<string>("");

        const inputEl = CoreReactive.App.input({
            attrs: {
                type: "text",
                placeholder: "Enter text to validate...",
            },
            className: ["form-control"],
            on: {
                input: (event: Event) => {
                    valueObs.set((event.target as HTMLInputElement).value);
                },
            },
        });

        const validateEl = UiCategory.UI.Inputs.Validate(
            {
                classList: ["mt-2"],
                prop_listRules: [
                    new UtilValidators.validates.NotEmpty(
                        { En: "Not Empty",       Fa: "خالی نبودن" },
                        { En: "This field is required", Fa: "این فیلد الزامی است" },
                    ),
                    new UtilValidators.validates.TextLength(
                        { En: "Text Length",      Fa: "طول متن" },
                        { En: "Minimum 3 characters required", Fa: "حداقل ۳ کاراکتر لازم است" },
                        3,
                    ),
                    new UtilValidators.validates.CharLength(
                        { En: "Character Length", Fa: "تعداد کاراکتر" },
                        { En: "At least 4 non-numeric characters", Fa: "حداقل ۴ کاراکتر غیر عددی" },
                        4,
                    ),
                    new UtilValidators.validates.IsEmail(
                        { En: "Email",            Fa: "ایمیل" },
                        { En: "Must be a valid email address", Fa: "باید یک آدرس ایمیل معتبر باشد" },
                    ),
                    new UtilValidators.validates.NumLength(
                        { En: "Number Length",    Fa: "طول عدد" },
                        { En: "Must contain a valid number length", Fa: "باید طول عدد معتبر داشته باشد" },
                    ),
                    new UtilValidators.validates.TextCharUpper(
                        { En: "Uppercase Letter", Fa: "حرف بزرگ" },
                        { En: "At least 1 uppercase letter required", Fa: "حداقل ۱ حرف بزرگ لازم است" },
                        1,
                    ),
                    new UtilValidators.validates.TextForbidden(
                        { En: "Forbidden Characters", Fa: "کاراکترهای ممنوعه" },
                        { En: "Forbidden characters: <, >, &", Fa: "کاراکترهای ممنوع: <، >، &" },
                        ["<", ">", "&"],
                    ),
                ] as any,
                prop_title: "All Validators",
                prop_size: UtilConst.Sizes.M,
                prop_value: valueObs as any,
                prop_iconSuccess: UiIcons.Src.StatusIsTrue.Definition,
                prop_iconError: UiIcons.Src.StatusIsFalse.Definition,
            },
            {
                CHANGE: function(event, dataArgs, componentArgs) {
                    console.log("[ValidateExample]", dataArgs?.IS_VALID, dataArgs?.MESSAGES, dataArgs?.VALUE);
                },
            },
        ).getElement() as HTMLElement;

        return CoreReactive.App.div({
            className: ["col-12", "p-2"],
            children: [
                inputEl,
                validateEl,
            ],
        }).getElement() as HTMLElement;
    },

};
