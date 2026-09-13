import * as CoreReactive    from "@/core_reactive";
import * as CoreObservable  from "@/core_observable";
import * as CoreConfigs     from "@/core_configs";
import * as CoreComponents  from "@/core_components";
import * as UtilStyle       from "@/util_styles";
import * as UtilConst       from "@/util_consts";
import * as UiIcons         from "@/ui_icons";
import * as UtilValidators  from "@/util_validators";
import type {ValidatorRule} from "@/util_validators";
// --------------------------------
import {Props   as ValidateProps}   from "../../lists/componentValidate/Props";
import {Schemas as ValidateSchemas} from "../../lists/componentValidate/Schemas";
import * as ComponentIcon           from "../../lists/componentIcon";


/**
 * نوع نتیجه هر قانون اعتبارسنجی
 */
export type TValidateRuleResult = {
    isTrue:      boolean;
    title:       string;
    description: string;
};


/**
 * نوع state اعتبارسنجی — سه Observable که trait مدیریت می‌کند
 */
export type TValidateState = {
    ruleResults:     CoreObservable.App<TValidateRuleResult[]>;
    validationMsg:   CoreObservable.App<Record<string, any>>;
    isInputCorrect:  CoreObservable.App<boolean>;
};


/**
 * ComponentValidateTrait
 *
 * Shared Capability برای Componentهایی که قابلیت اعتبارسنجی دارند.
 *
 * Trait شش چیز ارائه می‌دهد:
 *   1. props          — propهای اعتبارسنجی (برای merge در _COMPONENT_PATTERN)
 *   2. schemas        — schemaهای اعتبارسنجی (برای merge در _COMPONENT_SCHEMA)
 *   3. createState     — ساخت سه Observable برای مدیریت state اعتبارسنجی
 *   4. renderRulesHtml — رندر لیست قوانین با آیکون‌های success/error
 *   5. renderStatusIcon — رندر آیکون وضعیت (success/error)
 *   6. renderValidatesData — رندر داده‌های اعتبارسنجی به‌صورت JSON script tag
 *   7. runValidation   — اجرای اعتبارسنجی و به‌روزرسانی state
 *
 * قوانین (Plan 8.1.2):
 *   - Trait کلاس نیست
 *   - Trait State ندارد (state توسط createState ساخته و توسط مصرف‌کننده نگهداری می‌شود)
 *   - Trait Event ندارد
 *   - Trait Lifecycle ندارد
 *   - Trait Registry ندارد
 *   - Trait از Public API استفاده می‌کند (getScope, get, getObservable)
 *   - Silent Failure ممنوع — Missing required prop باید throw کند
 */
export const ComponentValidateTrait = {


    /**
     * Props اعتبارسنجی
     * برای merge در _COMPONENT_PATTERN کامپوننت مصرف‌کننده:
     *
     *   protected _COMPONENT_PATTERN = CoreComponents.DefineProp({
     *       ...ComponentStructureTrait.props,
     *       ...ComponentValidateTrait.props,
     *       ...Props,
     *   } as any);
     */
    props: ValidateProps,


    /**
     * Schemaهای اعتبارسنجی (FORM, RULES_HTML, VALIDATES_DATA, STATUS_ICON)
     * برای merge در _COMPONENT_SCHEMA کامپوننت مصرف‌کننده:
     *
     *   protected _COMPONENT_SCHEMA = CoreComponents.DefineSchema({
     *       ...ComponentStructureTrait.schemas,
     *       ...ComponentValidateTrait.schemas,
     *       ...Schemas,
     *   } as any);
     */
    schemas: ValidateSchemas,


    /**
     * ساخت state اعتبارسنجی — سه Observable برای مدیریت نتایج
     *
     * استفاده در constructor کامپوننت مصرف‌کننده:
     *   private validateState = ComponentValidateTrait.createState();
     */
    createState(): TValidateState {
        return {
            ruleResults:    new CoreObservable.App<TValidateRuleResult[]>([]),
            validationMsg:  new CoreObservable.App<Record<string, any>>({}),
            isInputCorrect: new CoreObservable.App<boolean>(false),
        };
    },


    /**
     * رندر لیست قوانین اعتبارسنجی با آیکون‌های success/error
     *
     * @param component    — Component instance (this) — برای getScope و _COMPONENT_PROPS_BIND
     * @param attrsDefault — attributeهای پیش‌فرض از executeSchemaPart
     * @param data         — observableهای این part
     * @param state        — state اعتبارسنجی (از createState)
     * @returns CoreReactive.App
     *
     * استفاده در renderManagerComponent:
     *   case ComponentValidateTrait.schemas.RULES_HTML.part:
     *       return ComponentValidateTrait.renderRulesHtml(this, attrsDefault, data, this.validateState);
     */
    renderRulesHtml(
        component:    CoreComponents.App<any, any, any, any>,
        attrsDefault: CoreComponents.PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        state:        TValidateState,
    ): CoreReactive.App {

        const bind = (component as any)._COMPONENT_PROPS_BIND;
        const prop_size        = data?.["prop_size"]        ?? bind.prop_size;
        const prop_iconSuccess = data?.["prop_iconSuccess"] ?? bind.prop_iconSuccess;
        const prop_iconError   = data?.["prop_iconError"]   ?? bind.prop_iconError;

        const fontSize = CoreObservable.App.computed(
            (sizeName: UtilConst.Sizes, sizeProp: UtilConst.Sizes) => UtilStyle.Css_FontSize(sizeProp || sizeName),
            [CoreConfigs.Settings.SizeName.observable(), prop_size],
            component.getScope(),
        );
        const iconSize = CoreObservable.App.computed(
            (sizeName: UtilConst.Sizes, sizeProp: UtilConst.Sizes) => sizeProp || sizeName,
            [CoreConfigs.Settings.SizeName.observable(), prop_size],
            component.getScope(),
        );
        const directionRtl = CoreConfigs.Settings.DirectionRtl.observable();

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
                "id": `component-validate-list-${(component as any)._COMPONENT_RANDOM_ID}`,
            },
            children: state.ruleResults.map((results: TValidateRuleResult[]) =>
                results.map((rule, i) => {
                    const iconDef = rule.isTrue ? prop_iconSuccess : prop_iconError;
                    const iconValue = iconDef ? iconDef.get() : null;
                    const color = rule.isTrue
                        ? UtilStyle.Css_Color(UtilConst.ColorMain.SUCCESS, UtilConst.ColorGrad.GRADE_1)
                        : UtilStyle.Css_Color(UtilConst.ColorMain.ERROR, UtilConst.ColorGrad.GRADE_1);

                    const iconEl = iconValue
                        ? new ComponentIcon.Component({
                            prop_icon: UiIcons.CreateIcon(iconValue as any, {
                                size: iconSize as any,
                                primaryColor: color,
                            }),
                        } as any, {} as any).getReactiveElement() as CoreReactive.App
                        : CoreReactive.App.span({}).getReactiveElement() as CoreReactive.App;

                    return CoreReactive.App.div({
                        stylesBind: CoreObservable.App.computed(
                            (fs: string, rtl: boolean) => ({
                                display: "flex",
                                alignItems: "center",
                                fontSize: fs,
                                color: color,
                                direction: rtl ? "rtl" : "ltr",
                            }),
                            [fontSize, directionRtl],
                            component.getScope(),
                        ),
                        className: ["pt-1", i < results.length - 1 ? "border-bottom" : "", "mx-1", "line-height-30px"],
                        children: [
                            CoreReactive.App.span({
                                className: ["icon-rule", "ms-1", "d-flex", "align-items-center"],
                                children: [iconEl],
                            }),
                            CoreReactive.App.span({
                                className: ["ms-3", "fw-bold"],
                                children: [rule.title],
                            }),
                            CoreReactive.App.span({
                                className: ["ms-2"],
                                children: [` - ${rule.description}`],
                            }),
                        ],
                    });
                }),
            ),
        });
    },


    /**
     * رندر آیکون وضعیت (success/error) بر اساس state.isInputCorrect
     *
     * @param component    — Component instance (this)
     * @param attrsDefault — attributeهای پیش‌فرض از executeSchemaPart
     * @param data         — observableهای این part
     * @param state        — state اعتبارسنجی (از createState)
     * @returns CoreReactive.App
     *
     * استفاده در renderManagerComponent:
     *   case ComponentValidateTrait.schemas.STATUS_ICON.part:
     *       return ComponentValidateTrait.renderStatusIcon(this, attrsDefault, data, this.validateState);
     */
    renderStatusIcon(
        component:    CoreComponents.App<any, any, any, any>,
        attrsDefault: CoreComponents.PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        state:        TValidateState,
    ): CoreReactive.App {

        const bind = (component as any)._COMPONENT_PROPS_BIND;
        const prop_iconSuccess = data?.["prop_iconSuccess"] ?? bind.prop_iconSuccess;
        const prop_iconError   = data?.["prop_iconError"]   ?? bind.prop_iconError;
        const prop_size        = data?.["prop_size"]        ?? bind.prop_size;

        const iconSize = CoreObservable.App.computed(
            (sizeName: string, sizeProp: string) => sizeProp || sizeName,
            [CoreConfigs.Settings.SizeName.observable(), prop_size],
            component.getScope(),
        );

        return CoreReactive.App.div({
            attrs: {...attrsDefault},
            styles: {
                position: "absolute",
                top: "5px",
                insetInlineEnd: "5px",
            },
            children: state.isInputCorrect.map((isCorrect: boolean) => {
                const iconProp = isCorrect ? prop_iconSuccess : prop_iconError;
                const iconValue = iconProp ? iconProp.get() : null;

                if (!iconValue) {
                    return CoreReactive.App.span({}).getElement();
                }

                return new ComponentIcon.Component(
                    {
                        classList: ["mx-2"],
                        prop_iconClass: ["mx-2"],
                        prop_icon: UiIcons.CreateIcon(iconValue as any, {
                            size: iconSize as any,
                            primaryColor: UtilStyle.Css_Color(
                                isCorrect ? UtilConst.ColorMain.SUCCESS : UtilConst.ColorMain.ERROR,
                                UtilConst.ColorGrad.GRADE_1,
                            ),
                        }),
                    } as any,
                    {} as any,
                ).getReactiveElement() as CoreReactive.App;
            }),
        });
    },


    /**
     * رندر داده‌های اعتبارسنجی به‌صورت JSON script tag
     *
     * @param component    — Component instance (this)
     * @param attrsDefault — attributeهای پیش‌فرض از executeSchemaPart
     * @param data         — observableهای این part
     * @param state        — state اعتبارسنجی (از createState)
     * @returns CoreReactive.App
     *
     * استفاده در renderManagerComponent:
     *   case ComponentValidateTrait.schemas.VALIDATES_DATA.part:
     *       return ComponentValidateTrait.renderValidatesData(this, attrsDefault, data, this.validateState);
     */
    renderValidatesData(
        component:    CoreComponents.App<any, any, any, any>,
        attrsDefault: CoreComponents.PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        state:        TValidateState,
    ): CoreReactive.App {

        const bind = (component as any)._COMPONENT_PROPS_BIND;
        const prop_title = data?.["prop_title"] ?? bind.prop_title;

        return CoreReactive.App.section({
            attrs: {
                ...attrsDefault,
            },
            children: state.validationMsg.map((msg: Record<string, any>) => {
                const componentValidate = {
                    title: prop_title ? prop_title.get() : "",
                    validates: msg,
                };
                const script = document.createElement("script");
                script.type = "application/json";
                script.className = "component-validate";
                script.textContent = JSON.stringify(componentValidate);
                return script;
            }),
        });
    },


    /**
     * اجرای اعتبارسنجی و به‌روزرسانی state
     *
     * @param component — Component instance (this) — برای get
     * @param state     — state اعتبارسنجی (از createState)
     * @param value     — مقدار ورودی برای اعتبارسنجی
     * @returns { isValid, messages, messagesForm, inputEl }
     *
     * استفاده در کامپوننت مصرف‌کننده:
     *   const result = ComponentValidateTrait.runValidation(this, this.validateState, value);
     *   this.executeMethod("CHANGE", new Event("validate"), { IS_VALID: result.isValid, ... });
     */
    runValidation(
        component: CoreComponents.App<any, any, any, any>,
        state:     TValidateState,
        value:     string,
    ): {
        isValid:       boolean;
        messages:      string[];
        messagesForm:  Record<string, any>;
        ruleResults:   TValidateRuleResult[];
    } {

        const prop_msgRules  = component.get("prop_msgRules") as Record<string, string> | null;
        const prop_listRules = component.get("prop_listRules") as ValidatorRule[];

        const messages: string[] = [];
        const messagesForm: Record<string, any> = {};
        const ruleResults: TValidateRuleResult[] = [];
        let isInputCorrect = true;

        if (Array.isArray(prop_listRules) && prop_listRules.length > 0) {
            const strValue = (value != null) ? String(value) : "";
            const results = UtilValidators.App.validate(strValue, prop_listRules);

            for (let i = 0; i < prop_listRules.length; i++) {
                const itemRule = prop_listRules[i];
                if (!itemRule) continue;

                const result   = results[i] ?? [false, ""];
                const isTrue    = result[0];
                let description = result[1] || "";

                if (prop_msgRules && description && prop_msgRules[description]) {
                    description = prop_msgRules[description];
                }

                if (!isTrue) {
                    isInputCorrect = false;
                    messages.push(description);
                    messagesForm[`rule_${i}`] = description;
                }

                ruleResults.push({ isTrue, title: itemRule.getTitle(), description });
            }
        }

        state.ruleResults.set(ruleResults);
        state.validationMsg.set(messagesForm);
        state.isInputCorrect.set(isInputCorrect);

        return {
            isValid:      isInputCorrect,
            messages,
            messagesForm,
            ruleResults,
        };
    },


};
