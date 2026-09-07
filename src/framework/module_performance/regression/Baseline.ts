import type { BaselineFile } from "../core/types";

/**
 * BaselineProvider — abstraction برای ذخیره/بازخوانی baseline
 *
 * Performance Module نباید به فایل‌سیستم Node گره بخورد.
 * این interface اجازه می‌دهد implementations مختلف داشته باشیم:
 *   - FileBaselineProvider (فعلی — برای Vitest)
 *   - CiArtifactProvider (آینده — برای CI)
 *   - RemoteStoreProvider (آینده — برای shared baselines)
 */
export interface BaselineProvider {
    load(): BaselineFile | null;
    save(entries: Record<string, { medianMs: number }>): void;
}

/**
 * FileBaselineProvider — implementation با فایل‌سیستم Node
 *
 * این فقط یک implementation است، نه قرارداد.
 * مصرف‌کننده (Vitest) این را انتخاب می‌کند.
 *
 * Node.js modules (fs, path, url) به‌صورت lazy داخل متدها require می‌شوند
 * تا این فایل در browser context هم قابل import باشد بدون خطای externalization.
 */
function resolveBaselinePath(): string {
    const path = require("path");
    const { fileURLToPath } = require("url");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname  = path.dirname(__filename);
    return path.resolve(__dirname, "./baseline.json");
}

export const FileBaselineProvider: BaselineProvider = {
    load(): BaselineFile | null {
        try {
            const fs = require("fs");
            const raw = fs.readFileSync(resolveBaselinePath(), "utf-8");
            return JSON.parse(raw) as BaselineFile;
        } catch {
            return null;
        }
    },
    save(entries: Record<string, { medianMs: number }>): void {
        const fs = require("fs");
        const baseline: BaselineFile = {
            version:   "1",
            updatedAt: new Date().toISOString(),
            entries,
        };
        fs.writeFileSync(resolveBaselinePath(), JSON.stringify(baseline, null, 2), "utf-8");
    },
};
