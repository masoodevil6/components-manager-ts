import type { PerfReport } from "./types";

/**
 * PerformanceRegistry — Store مرکزی نتایج Performance
 *
 * تمام reportها در این registry ثبت می‌شوند.
 * مصرف‌کننده‌ها (Console، Page، Vitest) از این registry می‌خوانند.
 *
 * آینده:
 *   subscribe(callback) — برای real-time observation
 *   وقتی Runtime Observability اضافه شود، Registry تبدیل به Observation Store می‌شود.
 */
type ReportListener = (report: PerfReport) => void;

class PerformanceRegistryClass {

    private _reports:   PerfReport[] = [];
    private _listeners: ReportListener[] = [];

    /** ثبت یک report کامل */
    register(report: PerfReport): void {
        this._reports.push(report);
        this._listeners.forEach(fn => fn(report));
    }

    /** دریافت همه reportها */
    query(): PerfReport[] {
        return [...this._reports];
    }

    /** دریافت report با target مشخص */
    queryByTarget(target: string): PerfReport | undefined {
        return this._reports.find(r => r.target === target);
    }

    /** subscribe — آینده: real-time observation */
    subscribe(listener: ReportListener): () => void {
        this._listeners.push(listener);
        return () => {
            this._listeners = this._listeners.filter(fn => fn !== listener);
        };
    }

    /** پاک کردن reportها — listenerها دست‌نخورده می‌مانند */
    clear(): void {
        this._reports = [];
    }

    /** reset کامل — reportها + listenerها */
    reset(): void {
        this._reports = [];
        this._listeners = [];
    }
}

export const PerformanceRegistry = new PerformanceRegistryClass();
