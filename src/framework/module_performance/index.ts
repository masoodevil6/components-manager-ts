// Core
export { PerformanceRegistry } from "./core/PerformanceRegistry";
export { measure } from "./core/PerformanceMeasurement";
export { createMetric, toMetricValue, measured, unsupported, unavailable } from "./core/PerformanceMetric";
export type { PerformanceMetric, MetricResult } from "./core/PerformanceMetric";
export { createReport } from "./core/ReportBuilder";
export type * from "./core/types";

// Metrics
export { RenderMetric, OnLoadMetric } from "./metrics/RenderMetric";
export { DomMetric } from "./metrics/DomMetric";
export { ComponentMetric } from "./metrics/ComponentMetric";
export { MemoryMetric } from "./metrics/MemoryMetric";

// Environment
export { getMemoryProvider } from "./environment/MemoryProvider";
export type { MemoryProvider } from "./environment/MemoryProvider";

// Benchmarks
export { benchmark, DEFAULT_CONFIG } from "./benchmarks/BenchmarkEngine";
export type { BenchmarkConfig } from "./benchmarks/BenchmarkEngine";
export { benchmarkPage } from "./benchmarks/PageBenchmark";
export { benchmarkComponent } from "./benchmarks/ComponentBenchmark";
export { benchmarkScaling } from "./benchmarks/ScalingBenchmark";

// Regression
export { FileBaselineProvider } from "./regression/Baseline";
export type { BaselineProvider } from "./regression/Baseline";
export { checkRegression, DEFAULT_TOLERANCE } from "./regression/RegressionCheck";

// Reporters
export { reportToConsole } from "./reporters/ConsoleReporter";
export { reportToSvg } from "./reporters/SvgReporter";
