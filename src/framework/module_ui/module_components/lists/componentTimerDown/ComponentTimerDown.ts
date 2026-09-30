import * as CoreReactive from "@/core_reactive";
import * as CoreObservable from "@/core_observable";
import * as CoreConfig from "@/core_configs";
import * as CoreLanguage from "@/core_languages";
import * as UtilStyle from "@/util_styles";
import * as UtilConst from "@/util_consts";
import * as UiCategory from "@/ui_categories";
import {PartAttrDefault} from "@/core_components";
import {ComponentTimerDownBase} from "./ComponentTimerDownBase";
import {createTimerDownStep} from "./Step";
import {PropsType} from "./Props";
import {Schemas} from "./Schemas";
import {MethodsConfigType} from "./Methods";
import {ComponentStructureTrait} from "../../traits/componentStructureTrait";
import {PropsType as StructurePropsType} from "../componentStructure/Props";
import {ButtonAction, ButtonSemantic} from "../componentButton/Props";
import {TooltipDirectionTypes} from "../componentTooltip/Props";
import {Keys} from "../../../module_categories/languages";

export class ComponentTimerDown extends ComponentTimerDownBase {
    private _FINISH_TIMER_INTERVAL: ReturnType<typeof setInterval> | null = null;
    private _TIMER_DOWN_MINUTE_ONE = new CoreObservable.App("-");
    private _TIMER_DOWN_MINUTE_TWO = new CoreObservable.App("-");
    private _TIMER_DOWN_SECOND_ONE = new CoreObservable.App("-");
    private _TIMER_DOWN_SECOND_TWO = new CoreObservable.App("-");
    private _TIMER_DOWN_FINISH = new CoreObservable.App(false);
    private _TIMER_DOWN_STARTED = new CoreObservable.App(false);
    private _DISPOSED = false;
    private _CHILD_COMPONENTS: Array<{dispose(): void}> = [];

    constructor(
        config?: Partial<StructurePropsType & PropsType>,
        methods?: MethodsConfigType<ComponentTimerDown>,
        identity?: { unique?: any; emit?: any; events?: Record<string, any> | null },
    ) {
        super("timer-down", null, identity, createTimerDownStep());
        this.renderComponent({ ...config } as any, methods as any, identity?.events ?? null);
    }

    dispose(): void {
        this._DISPOSED = true;
        this.stopCountdown();
        this._CHILD_COMPONENTS.forEach((child) => child.dispose());
        this._CHILD_COMPONENTS = [];
        this.getScope().dispose();
        this.disposeStep();
    }

    override renderContentComponent(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        return this.executeSchemaPart(Schemas.FORM.part, {});
    }

    override renderManagerComponent(partName: string, attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>, extra?: any): CoreReactive.App {
        switch (partName) {
            case ComponentStructureTrait.schemas.COMPONENT.part:
                return ComponentStructureTrait.renderComponentSchema(this, attrsDefault, data);
            case ComponentStructureTrait.schemas.STRUCTURE.part:
                return ComponentStructureTrait.renderStructureSchema(this, attrsDefault, data);
            case Schemas.FORM.part: return this.renderForm(attrsDefault, data);
            case Schemas.TOOLTIP.part: return this.renderTooltip(attrsDefault, data);
            case Schemas.TIMER.part: return this.renderTimer(attrsDefault, data);
            case Schemas.TEXT.part: return this.renderText(attrsDefault, data);
            case Schemas.TEXT_BUTTON.part: return this.renderTextButton(attrsDefault, data);
            default: return super.renderManagerComponent(partName, attrsDefault, data, extra);
        }
    }

    private renderForm(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const bg = data?.["prop_backgroundColor_body"] ?? bind.prop_backgroundColor_body;
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: {
                borderRadius: "4px",
                height: UtilStyle.Css_SizeCalc(
                    UtilStyle.Css_Height(UtilConst.Sizes.M),
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(UtilConst.Sizes.M),
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Padding(UtilConst.Sizes.M),
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Margin(UtilConst.Sizes.M),
                    UtilConst.Operation.ADD,
                    UtilStyle.Css_Margin(UtilConst.Sizes.M),
                ),
                padding: UtilStyle.Css_Padding(UtilConst.Sizes.M),
                paddingInlineEnd: "0",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                position: "relative",
            },
            stylesBind: { backgroundColor: bg, direction: CoreObservable.App.computed((rtl) => rtl ? "ltr" : "rtl", [CoreConfig.Settings.DirectionRtl.observable()], this.getScope()) },
            children: [this.executeSchemaPart(Schemas.TOOLTIP.part, {}), this.executeSchemaPart(Schemas.TIMER.part, {}), this.executeSchemaPart(Schemas.TEXT.part, {})],
        });
    }

    private renderTooltip(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const description = data?.["prop_description"] ?? bind.prop_description;
        const icon = data?.["prop_tooltipIcon"] ?? bind.prop_tooltipIcon;
        return CoreObservable.App.conditionWhen([description, icon], (value) => value != null && value !== "", () =>
                this.attachChild(UiCategory.UI.Positions.Tooltip({
                    styles: { position: "absolute", top: "0", insetInlineEnd: "0", width: "100%", height: "100%", zIndex: "80" },
                    prop_structureStyles: { height: "100%" },
                    prop_tooltipDescription: description.get(),
                    prop_tooltipIcon: icon.get(),
                    prop_tooltipIconPosition: UtilStyle.Css_SizeUnit(2.5, UtilConst.Units.PERCENT),
                    prop_tooltipDirection: TooltipDirectionTypes.BOTTOM,
                    prop_tooltipBackground: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
                    prop_tooltipColor: UtilStyle.Css_Color(UtilConst.ColorMain.SECONDARY, UtilConst.ColorGrad.GRADE_1),
                } as any, {})),
                () => null, this.getScope());
    }

    private renderTimer(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const bg = data?.["prop_backgroundColor_timer"] ?? bind.prop_backgroundColor_timer;
        const effect = data?.["prop_backgroundColor_timerEffect"] ?? bind.prop_backgroundColor_timerEffect;
        const color = data?.["prop_color_timer"] ?? bind.prop_color_timer;
        const fontSize = CoreObservable.App.computed((sizeName) => UtilStyle.Css_FontSize(sizeName), [CoreConfig.Settings.SizeName.observable()], this.getScope());
        const timerMarginStart = CoreObservable.App.computed(
            (sizeName) => `calc(40px + ${UtilStyle.Css_Margin(sizeName as any)})`,
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        return CoreReactive.App.section({
            attrs: { ...attrsDefault }, className: ["text-center", "py-1"],
            stylesBind: { marginInlineStart: timerMarginStart },
            children: [
                CoreReactive.App.style({ children: "@keyframes componentTimerDownTickA { 0%, 100% { transform: translateY(0); } 35% { transform: translateY(-4px); } 70% { transform: translateY(-1px); } } @keyframes componentTimerDownTickB { 0%, 100% { transform: translateY(0); } 35% { transform: translateY(-4px); } 70% { transform: translateY(-1px); } }" }),
                CoreReactive.App.div({
                styles: { direction: "ltr", display: "inline-flex", gap: "2px", alignItems: "center" },
                children: [
                    this.timerDigit(this._TIMER_DOWN_MINUTE_ONE, bg, effect, color, fontSize), this.timerDigit(this._TIMER_DOWN_MINUTE_TWO, bg, effect, color, fontSize),
                    CoreReactive.App.span({ children: ":", stylesBind: { color, fontSize } }),
                    this.timerDigit(this._TIMER_DOWN_SECOND_ONE, bg, effect, color, fontSize), this.timerDigit(this._TIMER_DOWN_SECOND_TWO, bg, effect, color, fontSize),
                ],
            })],
        });
    }

    private timerDigit(value: CoreObservable.App<string>, backgroundColor: CoreObservable.App<any>, effect: CoreObservable.App<any>, color: CoreObservable.App<any>, fontSize: CoreObservable.App<any>): CoreReactive.App {
        const digitAnimation = CoreObservable.App.computed(
            (digit) => {
                const numericDigit = Number(digit);
                if (!Number.isFinite(numericDigit)) return "none";
                const keyframes = numericDigit % 2 === 1 ? "componentTimerDownTickA" : "componentTimerDownTickB";
                return `${keyframes} 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both`;
            },
            [value],
            this.getScope(),
        );
        return CoreReactive.App.b({
            children: [value],
            stylesBind: {
                backgroundColor, color, fontSize,
                "--timer-effect-color": effect,
                animation: digitAnimation,
            } as any,
            styles: {
                display: "inline-block",
                minWidth: "22px",
                lineHeight: "1.4",
                border: "1px solid currentColor",
                borderRadius: "4px",
                position: "relative",
                boxShadow: "0 1px 4px var(--timer-effect-color)",
                willChange: "transform",
            },
        });
    }

    private renderText(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const show = data?.["prop_show_options"] ?? bind.prop_show_options;
        const color = data?.["prop_color_description"] ?? bind.prop_color_description;
        const textMarginStart = CoreObservable.App.computed(
            (sizeName) => UtilStyle.Css_Margin(sizeName as any),
            [CoreConfig.Settings.SizeName.observable()],
            this.getScope(),
        );
        const progressText = data?.["prop_lang_on_progress_duration"] ?? bind.prop_lang_on_progress_duration;
        const endText = data?.["prop_lang_on_end_duration"] ?? bind.prop_lang_on_end_duration;
        const text = CoreObservable.App.computed((isFinished, progress, end, _language) => {
            const translation = isFinished ? end : progress;
            const defaultKey = isFinished
                ? Keys.category.components.timerDown.texts.onEndDuration
                : Keys.category.components.timerDown.texts.onProgressDuration;
            if (CoreObservable.App.isObservable(translation)) return translation.get() || CoreLanguage.App.translate(defaultKey).get();
            if (typeof translation === "string") return translation
                ? CoreLanguage.App.translate(translation as any).get() || translation
                : CoreLanguage.App.translate(defaultKey).get();
            return "";
        }, [this._TIMER_DOWN_FINISH, progressText, endText, CoreConfig.Settings.Language.observable()], this.getScope());
        return CoreReactive.App.section({
            attrs: { ...attrsDefault },
            styles: {
                marginInlineStart: "auto",
                color: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
                position: "relative",
                zIndex: String(UtilStyle.Css_ZIndex(UtilConst.ZIndex.blur_popup)),
            },
            stylesBind: { marginInlineEnd: textMarginStart },
            children: [CoreObservable.App.conditionWhen([show, this._TIMER_DOWN_STARTED], (visible, started) => visible && started, () => CoreReactive.App.div({
                styles: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px", minWidth: "0" },
                children: [this.executeSchemaPart(Schemas.TEXT_BUTTON.part, {}), CoreReactive.App.span({ children: " | " }), CoreReactive.App.b({ children: [text] })],
            }), () => null, this.getScope())],
        });
    }

    private renderTextButton(attrsDefault: PartAttrDefault, data: Record<string, CoreObservable.App<any>>): CoreReactive.App {
        const bind = this._COMPONENT_PROPS_BIND;
        const show = data?.["prop_show_options"] ?? bind.prop_show_options;
        const resendText = data?.["prop_lang_btn_resend"] ?? bind.prop_lang_btn_resend;
        const title = CoreObservable.App.computed((values, _language) => {
            const translation = values;
            if (CoreObservable.App.isObservable(translation)) return translation.get() || CoreLanguage.App.translate(Keys.category.components.timerDown.texts.btnResend).get();
            if (typeof translation === "string") return translation
                ? CoreLanguage.App.translate(translation as any).get() || translation
                : CoreLanguage.App.translate(Keys.category.components.timerDown.texts.btnResend).get();
            return "";
        },
            [resendText, CoreConfig.Settings.Language.observable()], this.getScope());
        return CoreReactive.App.section({ attrs: { ...attrsDefault }, styles: { display: "flex", alignItems: "center", flex: "0 0 auto", width: "auto" }, children: [
            CoreObservable.App.conditionWhen([show, this._TIMER_DOWN_FINISH], (visible, finished) => visible && finished, () =>
                this.attachChild(UiCategory.UI.Simples.Button({ prop_btnTitle: title, prop_btnSemantic: ButtonSemantic.BACK, prop_btnType: ButtonAction.BUTTON, prop_btnClass: [] } as any, { CLICK: (event) => this.executeMethod("CLICK_RETRY", event, {}) })),
                () => null, this.getScope()),
        ] });
    }

    call_startCountdown(timeUnixEnd: number): void {
        if (this._DISPOSED) return;
        this.stopCountdown();
        if (!Number.isFinite(timeUnixEnd)) throw new RangeError("Countdown end must be a finite timestamp in milliseconds");
        this._TIMER_DOWN_STARTED.set(true);
        this._TIMER_DOWN_FINISH.set(false);
        this.updateProgress(timeUnixEnd);
        if (this._TIMER_DOWN_FINISH.get()) return;
        this._FINISH_TIMER_INTERVAL = setInterval(() => this.updateProgress(timeUnixEnd), 1000);
    }

    private updateProgress(timeUnixEnd: number): void {
        const distance = timeUnixEnd - Date.now();
        if (distance <= 0) { this.endCountdown(); return; }
        const totalSeconds = Math.max(0, Math.floor(distance / 1000));
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        this._TIMER_DOWN_MINUTE_ONE.set(String(Math.floor(minutes / 10)));
        this._TIMER_DOWN_MINUTE_TWO.set(String(minutes % 10));
        this._TIMER_DOWN_SECOND_ONE.set(String(Math.floor(seconds / 10)));
        this._TIMER_DOWN_SECOND_TWO.set(String(seconds % 10));
    }

    private endCountdown(): void {
        this.stopCountdown();
        if (this._TIMER_DOWN_FINISH.get()) return;
        this._TIMER_DOWN_FINISH.set(true);
        this._TIMER_DOWN_MINUTE_ONE.set("-"); this._TIMER_DOWN_MINUTE_TWO.set("-");
        this._TIMER_DOWN_SECOND_ONE.set("-"); this._TIMER_DOWN_SECOND_TWO.set("-");
        this.executeMethod("FINISH_TIMER", new Event("finish"), {});
    }

    private stopCountdown(): void {
        if (this._FINISH_TIMER_INTERVAL != null) {
            clearInterval(this._FINISH_TIMER_INTERVAL);
            this._FINISH_TIMER_INTERVAL = null;
        }
    }

    private attachChild<T extends {getElement(): CoreReactive.App | HTMLElement; dispose(): void}>(child: T): CoreReactive.App | HTMLElement {
        this._CHILD_COMPONENTS.push(child);
        return child.getElement();
    }
}
