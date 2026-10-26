import * as CoreReactive   from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig     from "@/core_configs";
import * as UtilValidators from "@/util_validators";
import type {ValidatorRule}  from "@/util_validators";
// --------------------------------
import {ComponentValidateBase}  from "./ComponentValidateBase";
import {createValidateStep}    from "./Step";
import {Schemas}               from "./Schemas";
import {MethodsConfigType,
        MethodsDataArgs}      from "./Methods";
import {PropsType}             from "./Props";
import {PartAttrDefault}       from "@/core_components";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {ComponentValidateTrait}  from "../../traits/componentValidateTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {PropsConfigType as ValidatePropsConfigType} from "./Props";


/**
 * ComponentValidate â€” Ú©Ù„Ø§Ø³ Ù†Ù‡Ø§ÛŒÛŒ (Plan 15.1.0 â€” Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Ú©Ø§Ù…Ù„ Behavior Legacy)
 *
 * Ù…Ø¹Ù…Ø§Ø±ÛŒ Composition:
 *   ComponentValidate HAS-A ComponentStructure (Ù†Ù‡ IS-A)
 *   ComponentStructure Ø¯Ø± renderContentComponent Ø³Ø§Ø®ØªÙ‡ Ù…ÛŒâ€ŒØ´ÙˆØ¯
 *   Ùˆ content Ø¢Ù† = renderForm (Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ ComponentValidate)
 *
 * Constructor Ø§Ù…Ø¶Ø§: (config, methods, identity?)
 *   config  â€” Ø´Ø§Ù…Ù„ propÙ‡Ø§ÛŒ Ù¾Ø§ÛŒÙ‡ + propÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ
 *   methods â€” methodÙ‡Ø§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ (CHANGE)
 *   identity â€” { unique?, emit?, events? }
 *
 * Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Behavior Ø§Ø² Legacy:
 *   - prop_value (Observable) â†’ subscribe â†’ fn_readyListRules
 *   - prop_reference (element ID) â†’ addEventListener â†’ fn_readyListRules
 *   - prop_referenceComponent (component instance) â†’ get("prop_value")
 *   - UtilValidators.App.validate Ø¨Ø±Ø§ÛŒ Ø§Ø¹ØªØ¨Ø§Ø±Ø³Ù†Ø¬ÛŒ
 *   - var_ruleResults / var_validation_msg / var_isInputCorrect â†’ Observable state
 *   - CHANGE method Ø¨Ø§ dataArgs: {IS_VALID, MESSAGES, VALUE}
 */
export class ComponentValidate extends ComponentValidateBase<ReturnType<typeof createValidateStep>>{

    private validateState = ComponentValidateTrait.createState();


    constructor(
        config?:  Partial<StructurePropsType & ValidatePropsConfigType>,
        methods?: MethodsConfigType<ComponentValidate>,
        identity?: {
            unique?: any;
            emit?:   any;
            events?: Record<string, any> | null;
        },
    ) {
        const step = createValidateStep();

        super("validate", null, identity, step);

        this.renderComponent(
            config as any,
            methods as any,
            identity?.events ?? null,
        );

        setTimeout(() => this.fn_setupValueWatcher(), 0);
    }


    /* ---------------------------------------------
       Plan 9.1 â€” Component Disposal
    --------------------------------------------- */
    dispose(): void {
        this.disposeStep();
    }


    /* ---------------------------------------------
       Plan 11.2 â€” renderContentComponent
       Ù„Ø§ÛŒÙ‡ Ø³Ø§Ø®ØªØ§Ø± Ø§Ø² Ø·Ø±ÛŒÙ‚ Schema Ù¾Ø§ÛŒÙ‡ (COMPONENT + STRUCTURE) Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒØ´ÙˆØ¯.
       renderContentComponent ÙÙ‚Ø· Ù…Ø­ØªÙˆØ§ÛŒ Ø§Ø®ØªØµØ§ØµÛŒ Ø±Ø§ Ø±Ù†Ø¯Ø± Ù…ÛŒâ€ŒÚ©Ù†Ø¯.
    --------------------------------------------- */
    override renderContentComponent(
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {
        return this.executeSchemaPart(Schemas.FORM.part, {});
    }


    /* ---------------------------------------------
       renderManagerComponent â€” Routing
       Plan 11.2 â€” COMPONENT + STRUCTURE Ø§Ø² TraitØŒ Ø¨Ù‚ÛŒÙ‡ Ø§Ø®ØªØµØ§ØµÛŒ
    --------------------------------------------- */
    override renderManagerComponent(
        partName:     string,
        attrsDefault: PartAttrDefault,
        data:         Record<string, CoreObservable.App<any>>,
        extra?:       any,
    ): CoreReactive.App {

        switch (partName) {
            // --- Plan 11.2: Schema Ù¾Ø§ÛŒÙ‡ ---
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            // --- Schema Ø§Ø®ØªØµØ§ØµÛŒ ---
            case Schemas.FORM.part:
                return this.renderForm(attrsDefault, data, extra);
            case Schemas.RULES_HTML.part:
                return ComponentValidateTrait.renderRulesHtml(this, attrsDefault, data, this.validateState);
            case Schemas.VALIDATES_DATA.part:
                return ComponentValidateTrait.renderValidatesData(this, attrsDefault, data, this.validateState);
            case Schemas.STATUS_ICON.part:
                return ComponentValidateTrait.renderStatusIcon(this, attrsDefault, data, this.validateState);
            default:
                return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }


    /* ---------------------------------------------
       renderForm â€” Ø±Ù†Ø¯Ø± Part FORM Ø§ØµÙ„ÛŒ
       Ø¸Ø±Ù Ø§ØµÙ„ÛŒ Ø´Ø§Ù…Ù„ RULES_HTML + VALIDATES_DATA + STATUS_ICON
    --------------------------------------------- */
    protected renderForm(
        attrsDefault?: PartAttrDefault,
        data?:         Record<string, CoreObservable.App<any>>,
        extra?:        any,
    ): CoreReactive.App {

        const bind = this._COMPONENT_PROPS_BIND;

        const prop_listRules = data?.["prop_listRules"] ?? bind.prop_listRules;

        const formVisible = CoreObservable.App.computed(
            (rules: any[]) => rules != null && Array.isArray(rules) && rules.length > 0,
            [prop_listRules],
            this.getScope(),
        );

        return CoreReactive.App.div({
            attrs: {
                ...attrsDefault,
                "id": `component-input-validate-position-form-rules-${this._COMPONENT_RANDOM_ID}`,
            },
            className: ["position-relative"],
            classBind: [formVisible.map((v: boolean) => v ? "" : "d-none")],
            children: [
                CoreReactive.App.div({
                    attrs: {
                        "id": `component-input-validate-form-rules-${this._COMPONENT_RANDOM_ID}`,
                    },
                    children: [
                        this.executeSchemaPart(Schemas.RULES_HTML.part, {}),
                        this.executeSchemaPart(Schemas.VALIDATES_DATA.part, {}),
                    ],
                }),
            ],
        });
    }


    /* ---------------------------------------------
       FUNCTIONs â€” Validation Logic (Ø¨Ø§Ø²ÛŒØ§Ø¨ÛŒ Ø§Ø² Legacy)
    --------------------------------------------- */

    private fn_getFormRulesElement(): HTMLElement | null {
        const prop_isAbsolute = this.get("prop_isAbsolute") as boolean;
        if (prop_isAbsolute) {
            return document.querySelector(`#component-input-validate-form-rules-${this._COMPONENT_RANDOM_ID}`);
        }
        return null;
    }

    private fn_setStatusVisibleFormRulesElement(status = true) {
        const el = this.fn_getFormRulesElement();
        if (el != null) {
            if (status) {
                el.classList.remove("d-none");
            } else {
                el.classList.add("d-none");
            }
        }
    }

    private fn_getInputElementReferenceId(): string | null {
        return this.get("prop_reference") as string | null;
    }

    private fn_getInputAndValueReference(): [HTMLElement | null, string] {
        const prop_value = this.get("prop_value");

        if (prop_value != null && prop_value !== "") {
            if (prop_value instanceof CoreObservable.App) {
                return [null, (prop_value as any).get() ?? ""];
            }
            return [null, String(prop_value)];
        }

        const refComponent = this.get("prop_referenceComponent");
        if (refComponent != null) {
            const comp = refComponent as any;
            const value = comp?.get ? comp.get("prop_value", null) : null;
            return [comp?.getElement ? comp.getElement() : null, value ?? ""];
        }

        const refId = this.fn_getInputElementReferenceId();
        if (refId) {
            const inputEl = document.querySelector("#" + refId) as HTMLElement | null;
            let value = "";
            if (inputEl != null && "value" in inputEl) {
                value = (inputEl as HTMLInputElement).value;
            }
            return [inputEl, value];
        }

        return [null, ""];
    }

    private fn_connectToInputReference_onHandleInput = () => {
        this.fn_readyListRules();
    };

    private fn_connectToInputReference_onFormatValue = () => {
        this.fn_setStatusVisibleFormRulesElement(false);
        this.fn_readyListRules();
    };

    private fn_connectToInputReference_onUnFormatValue = () => {
        this.fn_setStatusVisibleFormRulesElement(true);
        this.fn_readyListRules();
    };

    private fn_setupValueWatcher() {
        const propValueObs = this.getObservable("prop_value");
        if (propValueObs != null) {
            (propValueObs as CoreObservable.App<any>).subscribe(() => this.fn_readyListRules());
            this.fn_readyListRules();
        } else {
            this.fn_connectToInputReference();
        }

        CoreConfig.App
            .state(CoreConfig.States.Language)
            .observable()
            .subscribe(() => this.fn_readyListRules());
    }

    private fn_connectToInputReference() {
        const [inputEl] = this.fn_getInputAndValueReference();
        if (!inputEl) return;

        inputEl.removeEventListener("input", this.fn_connectToInputReference_onHandleInput);
        inputEl.removeEventListener("blur", this.fn_connectToInputReference_onFormatValue);
        inputEl.removeEventListener("focus", this.fn_connectToInputReference_onUnFormatValue);

        inputEl.addEventListener("input", this.fn_connectToInputReference_onHandleInput);
        inputEl.addEventListener("blur", this.fn_connectToInputReference_onFormatValue);
        inputEl.addEventListener("focus", this.fn_connectToInputReference_onUnFormatValue);

        this.fn_readyListRules();
    }

    private fn_readyListRules() {
        const prop_msgRules  = this.get("prop_msgRules") as Record<string, string> | null;
        const prop_listRules = this.get("prop_listRules") as ValidatorRule[];

        const [inputEl, value] = this.fn_getInputAndValueReference();

        const messages: string[] = [];
        const messagesForm: Record<string, any> = {};
        const ruleResults: Array<{ isTrue: boolean; title: string; description: string }> = [];
        let isInputCorrect = true;

        if (Array.isArray(prop_listRules) && prop_listRules.length > 0) {
            const strValue = (value != null) ? String(value) : "";
            const results = UtilValidators.App.validate(strValue, prop_listRules);

            for (let i = 0; i < prop_listRules.length; i++) {
                const itemRule = prop_listRules[i];
                if (!itemRule) continue;

                const result    = results[i] ?? [false, ""];
                const isTrue     = result[0];
                let description  = result[1] || "";

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

        this.validateState.ruleResults.set(ruleResults);
        this.validateState.validationMsg.set(messagesForm);
        this.validateState.isInputCorrect.set(isInputCorrect);

        if (inputEl) {
            inputEl.classList.remove("border-danger", "border-success");
            inputEl.classList.add(isInputCorrect ? "border-success" : "border-danger");
        }

        const params: MethodsDataArgs["CHANGE"] = {
            IS_VALID:  isInputCorrect,
            MESSAGES:  messages,
            VALUE:     value,
        } as any;

        this.executeMethod("CHANGE", new Event("validate"), params);
    }


    /* ---------------------------------------------
       renderEmptyContent â€” fallback Ø®Ø§Ù„ÛŒ
    --------------------------------------------- */
    public renderEmptyContent(
        attrsDefault?: PartAttrDefault,
    ): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
        });
    }

}
