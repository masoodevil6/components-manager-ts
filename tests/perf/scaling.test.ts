import { describe, it, expect } from "vitest";
import "./setup";
import * as UiIcons from "@/ui_icons";
import * as CoreReactive from "@/core_reactive";
import { benchmark } from "@/performance";

// Collect a set of unique icon definitions for Scenario A
const uniqueDefinitions: UiIcons.IIconDefinition[] = [
    UiIcons.Src.ArrowUp.Definition,
    UiIcons.Src.ArrowDown.Definition,
    UiIcons.Src.ArrowLeft.Definition,
    UiIcons.Src.ArrowRight.Definition,
    UiIcons.Src.ArrowChevronDown.Definition,
    UiIcons.Src.ArrowChevronLeft.Definition,
    UiIcons.Src.ArrowChevronRight.Definition,
    UiIcons.Src.ArrowChevronUp.Definition,
    UiIcons.Src.ArrowDoubleLeft.Definition,
    UiIcons.Src.ArrowDoubleRight.Definition,
    UiIcons.Src.ArrowDoubleUp.Definition,
    UiIcons.Src.ArrowDoubleDown.Definition,
    UiIcons.Src.StatusIsFalse.Definition,
    UiIcons.Src.StatusIsTrue.Definition,
    UiIcons.Src.StatusVisit.Definition,
    UiIcons.Src.StatusUnVisit.Definition,
    UiIcons.Src.StatusMoon.Definition,
    UiIcons.Src.StatusSun.Definition,
    UiIcons.Src.CalcPlus.Definition,
    UiIcons.Src.CalcMinus.Definition,
    UiIcons.Src.CalcCross.Definition,
    UiIcons.Src.CalcDivide.Definition,
    UiIcons.Src.InputClock.Definition,
    UiIcons.Src.InputCalender.Definition,
    UiIcons.Src.InputQrCode.Definition,
    UiIcons.Src.InputSelectColumn.Definition,
    UiIcons.Src.InputSelectOption.Definition,
    UiIcons.Src.InputTitle.Definition,
    UiIcons.Src.InputNumber.Definition,
    UiIcons.Src.FilesZoom.Definition,
    UiIcons.Src.FilesZoomIn.Definition,
    UiIcons.Src.FilesZoomOut.Definition,
    UiIcons.Src.FilesZoomRefresh.Definition,
    UiIcons.Src.FilesPrint.Definition,
    UiIcons.Src.FilesExcel.Definition,
    UiIcons.Src.FilesEdit.Definition,
    UiIcons.Src.FilesDelete.Definition,
    UiIcons.Src.WebCode100.Definition,
    UiIcons.Src.WebCode101.Definition,
    UiIcons.Src.WebCode200.Definition,
    UiIcons.Src.WebCode201.Definition,
    UiIcons.Src.WebCode204.Definition,
    UiIcons.Src.WebCode301.Definition,
    UiIcons.Src.WebCode304.Definition,
    UiIcons.Src.WebCode400.Definition,
    UiIcons.Src.WebCode401.Definition,
    UiIcons.Src.WebCode403.Definition,
    UiIcons.Src.WebCode404.Definition,
    UiIcons.Src.WebCode405.Definition,
    UiIcons.Src.WebCode408.Definition,
    UiIcons.Src.WebCode410.Definition,
    UiIcons.Src.WebCode429.Definition,
    UiIcons.Src.WebCode500.Definition,
    UiIcons.Src.WebCode502.Definition,
    UiIcons.Src.WebCode504.Definition,
    UiIcons.Src.PaymentCash.Definition,
    UiIcons.Src.PaymentRial.Definition,
    UiIcons.Src.PaymentTether.Definition,
    UiIcons.Src.PaymentDerham.Definition,
    UiIcons.Src.PaymentWalletAdd.Definition,
    UiIcons.Src.PaymentWithDrawal.Definition,
    UiIcons.Src.PaymentDeposit.Definition,
    UiIcons.Src.PaymentTransaction.Definition,
    UiIcons.Src.LoadingOrbit.Definition,
    UiIcons.Src.LoadingPulse.Definition,
    UiIcons.Src.Loading.Definition,
    UiIcons.Src.LoadingDotsHorizontal.Definition,
    UiIcons.Src.LoadingBarsHorizontal.Definition,
    UiIcons.Src.LoadingDotsVertical.Definition,
    UiIcons.Src.LoadingBarsVertical.Definition,
    UiIcons.Src.UserAccount.Definition,
    UiIcons.Src.UserAccountAdd.Definition,
    UiIcons.Src.UserAccountGroupAdd.Definition,
    UiIcons.Src.UserAccountReference.Definition,
    UiIcons.Src.UserAccountReffrence.Definition,
    UiIcons.Src.UserEmail1.Definition,
    UiIcons.Src.UserEmail2.Definition,
    UiIcons.Src.UserPhone.Definition,
    UiIcons.Src.UserPassword.Definition,
    UiIcons.Src.UserChangePassword.Definition,
    UiIcons.Src.SymbolExclumationSquare.Definition,
    UiIcons.Src.SymbolExclumationWarning.Definition,
    UiIcons.Src.StatusPinOpen.Definition,
    UiIcons.Src.StatusPinClose.Definition,
    UiIcons.Src.StatusPin2Open.Definition,
    UiIcons.Src.FileWindowClose.Definition,
    UiIcons.Src.FileWindowResizeMax.Definition,
    UiIcons.Src.FileWindowResizeMin.Definition,
    UiIcons.Src.FileWindowMinimize.Definition,
    UiIcons.Src.PaymentLeverage.Definition,
    UiIcons.Src.PaymentLeverage2.Definition,
    UiIcons.Src.FileMenu.Definition,
    UiIcons.Src.FileSetting.Definition,
    UiIcons.Src.FileSearch.Definition,
    UiIcons.Src.FileFilter.Definition,
    UiIcons.Src.FileAttachment.Definition,
    UiIcons.Src.FileReload.Definition,
    UiIcons.Src.FileEmpty.Definition,
    UiIcons.Src.FileClearBroom.Definition,
    UiIcons.Src.FileApplication.Definition,
    UiIcons.Src.FileCategory.Definition,
    UiIcons.Src.FileType.Definition,
    UiIcons.Src.FileTypeNote.Definition,
    UiIcons.Src.FileTage.Definition,
    UiIcons.Src.FileStatusComplete.Definition,
    UiIcons.Src.StatusLockedClose.Definition,
    UiIcons.Src.StatusLockedOpen.Definition,
    UiIcons.Src.PaymentWallet1.Definition,
    UiIcons.Src.PaymentWallet2.Definition,
    UiIcons.Src.PaymentCardNumber.Definition,
    UiIcons.Src.PaymentRate.Definition,
    UiIcons.Src.PaymentAmount.Definition,
    UiIcons.Src.PaymentCashCurrency.Definition,
    UiIcons.Src.PaymentCoinCurrency.Definition,
];

const ICON_COUNTS = [1, 10, 25, 50, 100, 200];
const WARMUP = 3;
const ITERATIONS = 20;

function createIconContainer(iconCount: number, useUnique: boolean): HTMLElement {
    const children: any[] = [];
    for (let i = 0; i < iconCount; i++) {
        const def = useUnique
            ? uniqueDefinitions[i % uniqueDefinitions.length]
            : uniqueDefinitions[0]; // always same icon
        children.push(UiIcons.CreateIcon(def));
    }

    const container = CoreReactive.App.div({
        className: ["row"],
        children: children,
    });
    return container.getElement();
}

function countDom(element: HTMLElement): number {
    let count = 1;
    for (const child of element.querySelectorAll("*")) {
        count++;
    }
    return count;
}

describe("Scaling Benchmark — Icon Creation", () => {

    for (const iconCount of ICON_COUNTS) {

        it(`Scenario A (Unique) — ${iconCount} icons`, () => {
            const result = benchmark(
                `scaling-unique-${iconCount}`,
                () => createIconContainer(iconCount, true),
                { warmup: WARMUP, iterations: ITERATIONS }
            );

            const domCount = countDom(createIconContainer(iconCount, true));

            console.log(
                `[Scaling A] ${iconCount} icons | ` +
                `median: ${result.median.toFixed(2)}ms | ` +
                `p95: ${result.p95.toFixed(2)}ms | ` +
                `min: ${result.min.toFixed(2)}ms | ` +
                `max: ${result.max.toFixed(2)}ms | ` +
                `DOM: ${domCount}`
            );

            expect(result.median).toBeGreaterThan(0);
        });

        it(`Scenario B (Repeated) — ${iconCount} icons`, () => {
            const result = benchmark(
                `scaling-repeated-${iconCount}`,
                () => createIconContainer(iconCount, false),
                { warmup: WARMUP, iterations: ITERATIONS }
            );

            const domCount = countDom(createIconContainer(iconCount, false));

            console.log(
                `[Scaling B] ${iconCount} icons | ` +
                `median: ${result.median.toFixed(2)}ms | ` +
                `p95: ${result.p95.toFixed(2)}ms | ` +
                `min: ${result.min.toFixed(2)}ms | ` +
                `max: ${result.max.toFixed(2)}ms | ` +
                `DOM: ${domCount}`
            );

            expect(result.median).toBeGreaterThan(0);
        });
    }

    it("Scaling Slope Analysis", () => {
        const slopes: { count: number; medianA: number; medianB: number; slopeA: number; slopeB: number }[] = [];
        let prevCount = 0;
        let prevMedianA = 0;
        let prevMedianB = 0;

        for (let i = 0; i < ICON_COUNTS.length; i++) {
            const count = ICON_COUNTS[i];
            const resultA = benchmark(
                `slope-A-${count}`,
                () => createIconContainer(count, true),
                { warmup: WARMUP, iterations: ITERATIONS }
            );
            const resultB = benchmark(
                `slope-B-${count}`,
                () => createIconContainer(count, false),
                { warmup: WARMUP, iterations: ITERATIONS }
            );

            if (i > 0) {
                const slopeA = (resultA.median - prevMedianA) / (count - prevCount);
                const slopeB = (resultB.median - prevMedianB) / (count - prevCount);
                slopes.push({ count, medianA: resultA.median, medianB: resultB.median, slopeA, slopeB });
            } else {
                slopes.push({ count, medianA: resultA.median, medianB: resultB.median, slopeA: 0, slopeB: 0 });
            }

            prevCount = count;
            prevMedianA = resultA.median;
            prevMedianB = resultB.median;
        }

        console.log("\n=== Scaling Slope Analysis ===");
        console.log("Icons | Unique median | Repeated median | Slope A (unique) | Slope B (repeated)");
        for (const s of slopes) {
            console.log(
                `${s.count.toString().padStart(5)} | ` +
                `${s.medianA.toFixed(2).padStart(14)}ms | ` +
                `${s.medianB.toFixed(2).padStart(16)}ms | ` +
                `${s.slopeA.toFixed(4).padStart(16)} ms/icon | ` +
                `${s.slopeB.toFixed(4).padStart(14)} ms/icon`
            );
        }

        // Compute overall slope from 1 to 200
        const first = slopes[0];
        const last = slopes[slopes.length - 1];
        const overallSlopeA = (last.medianA - first.medianA) / (last.count - first.count);
        const overallSlopeB = (last.medianB - first.medianB) / (last.count - first.count);

        console.log(`\nOverall slope (1→200):`);
        console.log(`  Unique:   ${overallSlopeA.toFixed(4)} ms/icon`);
        console.log(`  Repeated: ${overallSlopeB.toFixed(4)} ms/icon`);
        console.log(`  A/B ratio: ${(overallSlopeA / overallSlopeB).toFixed(2)}x`);

        expect(overallSlopeA).toBeGreaterThan(0);
        expect(overallSlopeB).toBeGreaterThan(0);
    });
});
