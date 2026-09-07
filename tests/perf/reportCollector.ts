import * as fs   from "fs";
import * as path from "path";
import type { PerfReport, ScalingReport } from "@/performance";
import { PerformanceRegistry, reportToSvg } from "@/performance";

const CHUNK_DIR = path.resolve(process.cwd(), "tests/perf/.chunks");

/**
 * saveReportChunk — ذخیره نتایج یک فایل تست در فایل JSON موقت
 *
 * چون Vitest هر فایل تست را در یک module جداگانه اجرا می‌کند،
 * PerformanceRegistry فقط گزارش‌های همان فایل را دارد.
 * این تابع نتایج را در یک فایل JSON ذخیره می‌کند تا فایل آخری
 * بتواند همه نتایج را جمع کند و SVG نهایی را تولید کند.
 */
export function saveReportChunk(name: string, reports: PerfReport[]): void {
    try {
        if (!fs.existsSync(CHUNK_DIR)) fs.mkdirSync(CHUNK_DIR, { recursive: true });
        const filePath = path.join(CHUNK_DIR, `${name}.json`);
        fs.writeFileSync(filePath, JSON.stringify(reports), "utf-8");
    } catch (e) {
        // ignore — SVG generation is best-effort
    }
}

/**
 * saveScalingChunk — ذخیره یک ScalingReport در فایل target-specific
 *
 * filename: scaling-<target>.json
 * اگر فردا scaling جدیدی اضافه شد، روی هم overwrite نمی‌شوند.
 */
export function saveScalingChunk(report: ScalingReport): void {
    try {
        if (!fs.existsSync(CHUNK_DIR)) fs.mkdirSync(CHUNK_DIR, { recursive: true });
        const filePath = path.join(CHUNK_DIR, `scaling-${report.target}.json`);
        fs.writeFileSync(filePath, JSON.stringify(report), "utf-8");
    } catch (e) {
        // ignore — SVG generation is best-effort
    }
}

/**
 * generateCombinedSvg — خواندن همه chunkها، ترکیب نتایج، و تولید SVG نهایی
 *
 * ترتیب نمایش: pages → stress → components → scaling
 */
export function generateCombinedSvg(): void {
    try {
        const allReports: PerfReport[] = [];
        const scalingReports: ScalingReport[] = [];

        for (const name of ["pages", "stress", "components"]) {
            const filePath = path.join(CHUNK_DIR, `${name}.json`);
            if (fs.existsSync(filePath)) {
                const data = JSON.parse(fs.readFileSync(filePath, "utf-8")) as PerfReport[];
                allReports.push(...data);
            }
        }

        // خواندن همه scaling chunks (target-specific)
        if (fs.existsSync(CHUNK_DIR)) {
            for (const f of fs.readdirSync(CHUNK_DIR)) {
                if (f.startsWith("scaling-") && f.endsWith(".json")) {
                    const filePath = path.join(CHUNK_DIR, f);
                    const report = JSON.parse(fs.readFileSync(filePath, "utf-8")) as ScalingReport;
                    scalingReports.push(report);
                }
            }
        }

        if (allReports.length === 0 && scalingReports.length === 0) return;

        // پاک کردن chunkها
        for (const f of fs.readdirSync(CHUNK_DIR)) {
            fs.unlinkSync(path.join(CHUNK_DIR, f));
        }
        fs.rmdirSync(CHUNK_DIR);

        // پر کردن PerformanceRegistry با همه نتایج و تولید SVG
        PerformanceRegistry.clear();
        for (const r of allReports) PerformanceRegistry.register(r);
        reportToSvg(undefined, scalingReports);
    } catch (e) {
        console.error("Failed to generate combined SVG:", e);
    }
}
