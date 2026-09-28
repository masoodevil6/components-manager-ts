// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as UiCategory from "@/ui_categories";
import * as Core from "@/core";
import * as CoreLanguage from "@/core_languages";
import * as CoreConfig from "@/core_configs";
import * as UtilConst from "@/util_consts";

afterEach(() => {
    vi.useRealTimers();
    CoreLanguage.App.setLanguage(Core.Language.Definition.En);
    CoreConfig.Settings.SizeName.set(UtilConst.Sizes.M);
    document.body.innerHTML = "";
});

describe("ComponentTimerDown", () => {
    it("counts down, finishes once, and sends retry through the button", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-09-28T12:00:00.000Z"));
        const finished = vi.fn();
        const retry = vi.fn();
        const timer = UiCategory.UI.Contents.TimerDown(
            {prop_description: null},
            {FINISH_TIMER: finished, CLICK_RETRY: retry},
        );
        const element = timer.getElement() as HTMLElement;
        document.body.appendChild(element);
        const digits = () => element.querySelector('[data-part-name="part-timer-down-timer"] > div')?.textContent?.trim();

        expect(digits()).toBe("--:--");
        timer.call_startCountdown(Date.now() + 2100);
        expect(digits()).toBe("00:02");
        vi.advanceTimersByTime(3000);
        expect(digits()).toBe("--:--");
        expect(finished).toHaveBeenCalledTimes(1);

        const button = element.querySelector('[data-part-name="part-timer-down-text-button"] button') as HTMLButtonElement;
        expect(button).not.toBeNull();
        button.click();
        expect(retry).toHaveBeenCalledTimes(1);
        vi.advanceTimersByTime(3000);
        expect(finished).toHaveBeenCalledTimes(1);
        timer.dispose();
    });

    it("keeps instances independent and clears an active interval on dispose", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-09-28T12:00:00.000Z"));
        const firstFinish = vi.fn();
        const secondFinish = vi.fn();
        const first = UiCategory.UI.Contents.TimerDown({}, {FINISH_TIMER: firstFinish});
        const second = UiCategory.UI.Contents.TimerDown({}, {FINISH_TIMER: secondFinish});

        first.call_startCountdown(Date.now() + 1000);
        second.call_startCountdown(Date.now() + 2000);
        first.dispose();
        vi.advanceTimersByTime(3000);
        expect(firstFinish).not.toHaveBeenCalled();
        expect(secondFinish).toHaveBeenCalledTimes(1);
        second.dispose();
    });

    it("renders the tooltip and follows system language and options", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-09-28T12:00:00.000Z"));
        const timer = UiCategory.UI.Contents.TimerDown({prop_description: "Delivery details"}, {});
        const element = timer.getElement() as HTMLElement;
        document.body.appendChild(element);
        expect(element.querySelector('[data-part-name="part-timer-down-form"] > component-tooltip')).not.toBeNull();

        timer.call_startCountdown(Date.now() + 10_000);
        expect(element.textContent).toContain("Until resend code");
        CoreLanguage.App.setLanguage(Core.Language.Definition.Fa);
        expect(element.textContent).toContain("تا ارسال دوبارهٔ کد");
        expect(element.textContent).not.toContain("تا ارسال مجدد کد");
        timer.dispose();
    });

    it("restarts cleanly and completes a past deadline immediately", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-09-28T12:00:00.000Z"));
        const finished = vi.fn();
        const timer = UiCategory.UI.Contents.TimerDown({}, {FINISH_TIMER: finished});
        timer.call_startCountdown(Date.now() + 1000);
        timer.call_startCountdown(Date.now() + 3000);
        vi.advanceTimersByTime(1000);
        expect(finished).not.toHaveBeenCalled();
        vi.advanceTimersByTime(2000);
        expect(finished).toHaveBeenCalledTimes(1);
        timer.call_startCountdown(Date.now() - 1);
        expect(finished).toHaveBeenCalledTimes(2);
        expect(() => timer.call_startCountdown(Number.NaN)).toThrow(RangeError);
        timer.dispose();
    });

    it("uses the global size setting for timer digits", () => {
        CoreConfig.Settings.SizeName.set(UtilConst.Sizes.M);
        const timer = UiCategory.UI.Contents.TimerDown({});
        const element = timer.getElement() as HTMLElement;
        document.body.appendChild(element);
        const digit = element.querySelector('[data-part-name="part-timer-down-timer"] b') as HTMLElement;
        expect(digit.style.fontSize).toBe("var(--fontSizeMedium)");

        CoreConfig.Settings.SizeName.set(UtilConst.Sizes.L);
        expect(digit.style.fontSize).toBe("var(--fontSizeLarge)");
        timer.dispose();
    });
});
