import { benchmark, type BenchmarkConfig, DEFAULT_CONFIG } from "./BenchmarkEngine";
import type { ScalingReport, ScalingPoint, ScalingSlope } from "../core/types";

function computeSlope(
    series: ScalingPoint[],
    metric: "median" | "p95" | "max",
): ScalingSlope {
    const xs = series.map(p => p.count);
    const ys = series.map(p => p.benchmark[metric]);

    const n      = xs.length;
    const sumX   = xs.reduce((a, b) => a + b, 0);
    const sumY   = ys.reduce((a, b) => a + b, 0);
    const sumXY  = xs.reduce((s, x, i) => s + x * ys[i], 0);
    const sumX2  = xs.reduce((s, x) => s + x * x, 0);

    const denom = n * sumX2 - sumX * sumX;
    if (denom === 0) {
        return { metric, slope: 0, intercept: sumY / n, rSquared: 0 };
    }

    const slope     = (n * sumXY - sumX * sumY) / denom;
    const intercept = (sumY - slope * sumX) / n;

    const meanY = sumY / n;
    const ssTot = ys.reduce((s, y) => s + (y - meanY) ** 2, 0);
    const ssRes = ys.reduce((s, y, i) => {
        const pred = slope * xs[i] + intercept;
        return s + (y - pred) ** 2;
    }, 0);
    const rSquared = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

    return { metric, slope, intercept, rSquared };
}

export function benchmarkScaling(
    target:          string,
    counts:          number[],
    renderFnFactory: (count: number) => () => void,
    config:          BenchmarkConfig = DEFAULT_CONFIG,
): ScalingReport {
    if (counts.length === 0) {
        throw new Error(`benchmarkScaling: counts must be non-empty`);
    }
    if (counts.some(c => c < 0)) {
        throw new Error(`benchmarkScaling: counts must be >= 0 (got negative)`);
    }
    for (let i = 1; i < counts.length; i++) {
        if (counts[i] <= counts[i - 1]) {
            throw new Error(`benchmarkScaling: counts must be strictly increasing`);
        }
    }

    const series: ScalingPoint[] = [];
    for (const count of counts) {
        const fn     = renderFnFactory(count);
        const result = benchmark(`${target}-${count}`, fn, config);
        series.push({ count, benchmark: result });
    }

    const slopes: ScalingSlope[] = [
        computeSlope(series, "median"),
        computeSlope(series, "p95"),
        computeSlope(series, "max"),
    ];

    return { target, series, slopes };
}
