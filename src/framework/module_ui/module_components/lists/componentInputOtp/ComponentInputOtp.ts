import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";
import * as UiCategory from "@/ui_categories";
import {PartAttrDefault} from "@/core_components";
import {ComponentInputOtpBase} from "./ComponentInputOtpBase";
import {createInputOtpStep} from "./Step";
import {PropsConfigType, PropsType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";

let nextInputOtpInstanceId = 0;

type TimerDownInstance = {
    call_startCountdown(endTimestampMs: number): void;
    getElement(): HTMLElement;
    getReactiveElement(): CoreReactive.App;
    dispose(): void;
};

export class ComponentInputOtp extends ComponentInputOtpBase {
    private readonly _OTP_INSTANCE_ID = `${++nextInputOtpInstanceId}-${this._COMPONENT_RANDOM_ID}`;
    private readonly _OTP_VALUE = new CoreObservable.App("");
    private _OTP_TIMER: TimerDownInstance | null = null;
    private _INPUTS_CONTAINER: HTMLElement | null = null;
    private _INPUTS_STYLE: HTMLElement | null = null;
    private _INPUTS_UNSUBSCRIBERS: Array<() => void> = [];
    private _CHILD_COMPONENTS: Array<{dispose(): void}> = [];
    private _LAST_VALID_LENGTH = 6;
    private _RESTORING_INVALID_LENGTH = false;
    private _RESTORING_FOCUS = false;
    private _DISPOSED = false;

    constructor(
        config?: Partial<StructurePropsType & PropsConfigType>,
        methods?: MethodsConfigType<ComponentInputOtp>,
        identity?: {unique?: any; emit?: any; events?: Record<string, any> | null},
    ) {
        const initialLength = config?.prop_length ?? 6;
        const lengthValue = CoreObservable.App.isObservable(initialLength) ? initialLength.get() : initialLength;
        ComponentInputOtp.assertValidLength(lengthValue);
        super("input-otp", identity, createInputOtpStep());
        this._LAST_VALID_LENGTH = lengthValue;
        this.renderComponent({...config} as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        if (this._DISPOSED) return;
        this._DISPOSED = true;
        this._INPUTS_UNSUBSCRIBERS.forEach((unsubscribe) => unsubscribe());
        this._INPUTS_UNSUBSCRIBERS = [];
        this._CHILD_COMPONENTS.forEach((child) => child.dispose());
        this._CHILD_COMPONENTS = [];
        this._OTP_TIMER = null;
        this._INPUTS_CONTAINER = null;
        this._INPUTS_STYLE = null;
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        return this.executeSchemaPart(Schemas.OTP_STRUCTURE.part, {});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.OTP_STRUCTURE.part: return this.renderOtpStructure(attrsDefault);
            case Schemas.VALUE.part: return this.renderValue(attrsDefault);
            case Schemas.ELEMENTS.part: return this.renderElements(attrsDefault);
            case Schemas.LABEL.part: return this.renderLabel(attrsDefault, data);
            case Schemas.INPUTS.part: return this.renderInputs(attrsDefault, data);
            case Schemas.TIMER_DOWN.part: return this.renderTimerDown(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    call_startCountdown(durationForEndMinutes: number): void {
        if (this._DISPOSED) return;
        if (!Number.isFinite(durationForEndMinutes)) throw new RangeError("Countdown duration must be a finite number of minutes");
        this._OTP_TIMER?.call_startCountdown(Date.now() + durationForEndMinutes * 60_000);
    }

    call_getValue(): string {
        return this._OTP_VALUE.get();
    }

    private renderOtpStructure(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrsDefault, id: `component-input-otp-${this._OTP_INSTANCE_ID}`},
            className: ["position-relative"],
            children: [this.executeSchemaPart(Schemas.VALUE.part, {}), this.executeSchemaPart(Schemas.ELEMENTS.part, {})],
        });
    }

    private renderValue(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.input({
            attrs: {...attrsDefault, type: "hidden", name: `input_otp_value_${this._OTP_INSTANCE_ID}`},
            propsBind: {value: this._OTP_VALUE},
        });
    }

    private renderElements(attrsDefault: PartAttrDefault): CoreReactive.App {
        return CoreReactive.App.section({
            attrs: {...attrsDefault, id: `component-input-otp-elements-${this._OTP_INSTANCE_ID}`},
            className: ["component-element-structure", "mb-2"],
            styles: {display: "flex", flexDirection: "column", alignItems: "center"},
            children: [
                this.executeSchemaPart(Schemas.LABEL.part, {}),
                this.executeSchemaPart(Schemas.INPUTS.part, {}),
                this.executeSchemaPart(Schemas.TIMER_DOWN.part, {}),
            ],
        });
    }

    private renderLabel(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const name = data?.["prop_name"] ?? bind.prop_name;
        const input = data?.["prop_input"] ?? bind.prop_input;
        const langs = data?.["prop_langs"] ?? bind.prop_langs;
        const title = CoreObservable.App.computed((values) => values?._title_otp_description ?? "", [langs], this.getScope());
        const firstInputId = CoreObservable.App.computed((value) => this.getInputId(value, 0), [name], this.getScope());
        const fontSize = CoreObservable.App.computed((sizeName) => UtilStyle.Css_FontSize(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        const margin = CoreObservable.App.computed((sizeName) => UtilStyle.Css_Margin(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        return CoreReactive.App.part("label", {
            attrs: {...attrsDefault},
            attrsBind: {for: firstInputId},
            styles: {display: "block", textAlign: "center", marginBlockEnd: "0"},
            stylesBind: {fontSize, marginBlockEnd: margin},
            children: [
                CoreReactive.App.part("span", {children: [title]}),
                CoreReactive.App.part("b", {styles: {display: "block", direction: "ltr"}, children: [input]}),
            ],
        });
    }

    private renderInputs(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const length = data?.["prop_length"] ?? bind.prop_length;
        const name = data?.["prop_name"] ?? bind.prop_name;
        const inputClass = `component-input-otp-input-${this._OTP_INSTANCE_ID.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
        const sizeRules = CoreObservable.App.computed((sizeName) =>
            `.${inputClass} { box-sizing: border-box; font-size: ${UtilStyle.Css_FontSize(sizeName)}; height: ${UtilStyle.Css_SizeCalc(UtilStyle.Css_Padding(sizeName) as any, UtilConst.Operation.ADD, UtilStyle.Css_Height(sizeName) as any, UtilConst.Operation.ADD, UtilStyle.Css_Padding(sizeName) as any)}; width: ${UtilStyle.Css_Height(sizeName)}; line-height: ${UtilStyle.Css_Height(sizeName)}; padding: ${UtilStyle.Css_Padding(sizeName)}; border: ${UtilStyle.Css_BorderWidth(sizeName)} solid ${UtilStyle.Css_Color(UtilConst.ColorMain.PRIMARY, UtilConst.ColorGrad.GRADE_1)}; border-radius: ${UtilStyle.Css_BorderRadius(sizeName)}; margin: ${UtilStyle.Css_Margin(sizeName)}; } .${inputClass}:focus { border-color: ${UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1)}; }`,
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const styleElement = CoreReactive.App.style({children: [sizeRules]});
        const container = CoreReactive.App.section({
            attrs: {...attrsDefault, id: `component-input-otp-inputs-${this._OTP_INSTANCE_ID}`},
            className: ["form-otp", "inputs", "d-flex", "flex-row", "justify-content-center"],
            styles: {direction: "ltr", alignItems: "center"},
            on: {
                input: (event: Event) => this.handleInput(event),
                keydown: (event: Event) => this.handleKeydown(event),
                focusin: (event: Event) => this.handleFocus(event),
            },
            children: [styleElement],
        });
        this._INPUTS_CONTAINER = container.getElement();
        this._INPUTS_STYLE = styleElement.getElement();
        this._LAST_VALID_LENGTH = length.get();
        this.rebuildInputs(length.get(), name.get(), false, false);
        this._INPUTS_UNSUBSCRIBERS.push(length.subscribe(() => this.handleLengthChange(length)));
        this._INPUTS_UNSUBSCRIBERS.push(name.subscribe(() => this.rebuildInputs(length.get(), name.get(), true, true)));
        return container;
    }

    private renderTimerDown(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const langs = data?.["prop_langs"] ?? bind.prop_langs;
        const tooltipDescription = CoreObservable.App.computed((values) => values?._tooltip_otp_description ?? null, [langs], this.getScope());
        const timer = UiCategory.UI.Contents.TimerDown(
            {prop_description: tooltipDescription} as any,
            {
                CLICK_RETRY: (event) => { if (!this._DISPOSED) this.executeMethod("GET_NEW_TOKEN", event, {}); },
                FINISH_TIMER: (event) => { if (!this._DISPOSED) this.executeMethod("FINISH_TOKEN", event, {}); },
            } as any,
        ) as unknown as TimerDownInstance;
        this._OTP_TIMER = timer;
        this._CHILD_COMPONENTS.push(timer);
        return timer.getReactiveElement();
    }

    private handleLengthChange(length: CoreObservable.App<number>): void {
        if (this._RESTORING_INVALID_LENGTH || this._DISPOSED) return;
        const requestedLength = length.get();
        if (!ComponentInputOtp.isValidLength(requestedLength)) {
            this._RESTORING_INVALID_LENGTH = true;
            length.set(this._LAST_VALID_LENGTH);
            this._RESTORING_INVALID_LENGTH = false;
            throw new RangeError("prop_length must be a positive integer");
        }
        this._LAST_VALID_LENGTH = requestedLength;
        this.rebuildInputs(requestedLength, this.get("prop_name"), true, true);
    }

    private rebuildInputs(length: number, name: string, restoreFocus: boolean, notifyChange: boolean): void {
        const container = this._INPUTS_CONTAINER;
        if (!container || this._DISPOSED) return;
        ComponentInputOtp.assertValidLength(length);
        const previousInputs = Array.from(container.querySelectorAll<HTMLInputElement>("input[data-otp-owner]"));
        const values = previousInputs.map((inputElement) => inputElement.value);
        const active = document.activeElement as HTMLElement | null;
        const focusedInput = active?.dataset.otpOwner === this._OTP_INSTANCE_ID ? active as HTMLInputElement : null;
        const focusedIndex = focusedInput ? Number(focusedInput.dataset.otpIndex) : null;

        container.replaceChildren();
        if (this._INPUTS_STYLE) container.appendChild(this._INPUTS_STYLE);
        for (let index = 0; index < length; index++) {
            const inputElement = document.createElement("input");
            inputElement.type = "text";
            inputElement.maxLength = 1;
            inputElement.id = this.getInputId(name, index);
            inputElement.className = ["input-otp", "my-1", "mx-2", "text-center", "form-control", "shadow-sm", this.getInputClassName()].join(" ");
            inputElement.dataset.otpOwner = this._OTP_INSTANCE_ID;
            inputElement.dataset.otpIndex = String(index);
            inputElement.value = values[index] ?? "";
            container.appendChild(inputElement);
        }

        if (notifyChange) this.updateOtpValue(new Event("change"));
        if (restoreFocus && focusedIndex != null && length > 0) {
            const nextIndex = Math.min(focusedIndex, length - 1);
            const nextInput = container.querySelector<HTMLInputElement>(`#${this.getInputId(name, nextIndex)}`);
            if (nextInput) {
                this._RESTORING_FOCUS = true;
                nextInput.focus();
                this._RESTORING_FOCUS = false;
            }
        }
    }

    private handleInput(event: Event): void {
        if (this._DISPOSED) return;
        const input = this.getEventInput(event);
        if (!input) return;
        this.updateOtpValue(event);
        if (input.value !== "") {
            const next = input.nextElementSibling;
            if (next instanceof HTMLInputElement) next.focus();
        }
    }

    private handleKeydown(event: Event): void {
        if (this._DISPOSED) return;
        const keyboardEvent = event as KeyboardEvent;
        const input = this.getEventInput(event);
        if (!input || keyboardEvent.key !== "Backspace" || input.value !== "") return;
        const previous = input.previousElementSibling;
        if (previous instanceof HTMLInputElement) previous.focus();
    }

    private handleFocus(event: Event): void {
        if (this._DISPOSED || this._RESTORING_FOCUS) return;
        const input = this.getEventInput(event);
        if (!input) return;
        input.value = "";
        this.updateOtpValue(event);
    }

    private updateOtpValue(event: Event): void {
        if (this._DISPOSED || !this._INPUTS_CONTAINER) return;
        const value = Array.from(this._INPUTS_CONTAINER.querySelectorAll<HTMLInputElement>("input[data-otp-owner]"))
            .map((inputElement) => inputElement.value)
            .join("");
        this._OTP_VALUE.set(value);
        this.executeMethod("CHANGE", event, {});
        const inputs = Array.from(this._INPUTS_CONTAINER.querySelectorAll<HTMLInputElement>("input[data-otp-owner]"));
        if (inputs.length > 0 && inputs.every((input) => input.value.trim() !== "")) {
            this.executeMethod("COMPLETE", event, {});
        }
    }

    private getEventInput(event: Event): HTMLInputElement | null {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) return null;
        return target.dataset.otpOwner === this._OTP_INSTANCE_ID ? target : null;
    }

    private getInputId(name: string, index: number): string {
        const safeName = String(name ?? "otp").replace(/[^a-zA-Z0-9_-]/g, "_");
        return `component-input-otp-inputs-${this._OTP_INSTANCE_ID}-${safeName}-${index}`;
    }

    private getInputClassName(): string {
        return `component-input-otp-input-${this._OTP_INSTANCE_ID.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
    }

    private static isValidLength(value: unknown): value is number {
        return typeof value === "number" && Number.isInteger(value) && value > 0;
    }

    private static assertValidLength(value: unknown): asserts value is number {
        if (!this.isValidLength(value)) throw new RangeError("prop_length must be a positive integer");
    }
}
