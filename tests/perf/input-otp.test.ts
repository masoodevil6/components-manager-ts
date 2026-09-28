// @vitest-environment jsdom
import {afterEach, describe, expect, it, vi} from "vitest";
import "@/framework";
import "@/ui_components/lists";
import * as CoreObservable from "@/core_observable";
import * as UiCategory from "@/ui_categories";

afterEach(() => {
    vi.useRealTimers();
    document.body.innerHTML = "";
});

describe("ComponentInputOtp", () => {
    it("renders accessible fields, combines entered characters, and navigates with the keyboard", () => {
        const changed = vi.fn();
        const otp = UiCategory.UI.Inputs.InputOtp(
            {prop_input: "555-0123", prop_name: "phone"},
            {CHANGE: changed},
        );
        const element = otp.getElement() as HTMLElement;
        document.body.appendChild(element);

        const fields = Array.from(element.querySelectorAll<HTMLInputElement>("input[data-otp-owner]"));
        const hidden = element.querySelector<HTMLInputElement>('input[type="hidden"]');
        const label = element.querySelector<HTMLLabelElement>('label[data-part-name="part-input-otp-label"]');
        expect(fields).toHaveLength(6);
        expect(label?.htmlFor).toBe(fields[0].id);
        expect(fields[0].id).toContain("phone-0");

        fields[0].focus();
        fields[0].value = "4";
        fields[0].dispatchEvent(new Event("input", {bubbles: true}));
        expect(document.activeElement).toBe(fields[1]);
        fields[1].value = "2";
        fields[1].dispatchEvent(new Event("input", {bubbles: true}));
        expect(otp.call_getValue()).toBe("42");
        expect(hidden?.value).toBe("42");
        expect(changed).toHaveBeenCalled();

        fields[2].focus();
        fields[2].dispatchEvent(new KeyboardEvent("keydown", {key: "Backspace", bubbles: true}));
        expect(document.activeElement).toBe(fields[1]);
        expect(otp.call_getValue()).toBe("4");
        const changeCallsBeforeDispose = changed.mock.calls.length;
        otp.dispose();
        fields[0].value = "9";
        fields[0].dispatchEvent(new Event("input", {bubbles: true}));
        expect(changed).toHaveBeenCalledTimes(changeCallsBeforeDispose);
    });

    it("keeps instances independent and synchronizes valid length changes", () => {
        const length = new CoreObservable.App(4);
        const first = UiCategory.UI.Inputs.InputOtp({prop_length: length});
        const second = UiCategory.UI.Inputs.InputOtp({prop_length: 3});
        document.body.append(first.getElement(), second.getElement());

        const firstElement = first.getElement() as HTMLElement;
        const secondElement = second.getElement() as HTMLElement;
        const firstInputs = () => Array.from(firstElement.querySelectorAll<HTMLInputElement>("input[data-otp-owner]"));
        const secondInputs = Array.from(secondElement.querySelectorAll<HTMLInputElement>("input[data-otp-owner]"));
        firstInputs()[0].value = "7";
        firstInputs()[0].dispatchEvent(new Event("input", {bubbles: true}));
        length.set(2);

        expect(firstInputs()).toHaveLength(2);
        expect(first.call_getValue()).toBe("7");
        expect(secondInputs).toHaveLength(3);
        expect(firstInputs()[0].id).not.toBe(secondInputs[0].id);
        expect(firstElement.querySelector('input[type="hidden"]')?.getAttribute("name"))
            .not.toBe(secondElement.querySelector('input[type="hidden"]')?.getAttribute("name"));
        expect(() => length.set(0)).toThrow(RangeError);
        expect(length.get()).toBe(2);
        first.dispose();
        second.dispose();
    });

    it("converts minutes to the timer deadline and forwards retry and finish callbacks", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-09-28T12:00:00.000Z"));
        const retry = vi.fn();
        const finished = vi.fn();
        const otp = UiCategory.UI.Inputs.InputOtp({}, {GET_NEW_TOKEN: retry, FINISH_TOKEN: finished});
        const element = otp.getElement() as HTMLElement;
        document.body.appendChild(element);

        otp.call_startCountdown(0.02);
        vi.advanceTimersByTime(2000);
        expect(finished).toHaveBeenCalledTimes(1);

        const retryButton = element.querySelector<HTMLButtonElement>('[data-part-name="part-timer-down-text-button"] button');
        expect(retryButton).not.toBeNull();
        retryButton?.click();
        expect(retry).toHaveBeenCalledTimes(1);
        otp.dispose();
    });

    it("fires COMPLETE whenever every OTP input is filled", () => {
        const complete = vi.fn();
        const otp = UiCategory.UI.Inputs.InputOtp({prop_length: 3}, {COMPLETE: complete});
        document.body.appendChild(otp.getElement() as HTMLElement);
        const inputs = Array.from(otp.getElement().querySelectorAll<HTMLInputElement>("input[data-otp-owner]"));

        inputs[0].value = "1";
        inputs[0].dispatchEvent(new Event("input", {bubbles: true}));
        inputs[1].value = "2";
        inputs[1].dispatchEvent(new Event("input", {bubbles: true}));
        expect(complete).not.toHaveBeenCalled();
        inputs[2].value = "3";
        inputs[2].dispatchEvent(new Event("input", {bubbles: true}));
        expect(complete).toHaveBeenCalledTimes(1);
        expect(otp.call_getValue()).toBe("123");

        inputs[2].value = "";
        inputs[2].dispatchEvent(new Event("input", {bubbles: true}));
        expect(complete).toHaveBeenCalledTimes(1);
        inputs[2].value = "4";
        inputs[2].dispatchEvent(new Event("input", {bubbles: true}));
        expect(complete).toHaveBeenCalledTimes(2);
        otp.dispose();
    });
});
