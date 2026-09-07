import { describe, it, expect } from "vitest";
import "./setup";
import { benchmark } from "@/performance";

describe("BenchmarkEngine — ordering invariant", () => {

    it("min ≤ median ≤ p95 ≤ max for any benchmark result", () => {
        const result = benchmark("ordering-test", () => {
            let x = 0;
            for (let i = 0; i < 100; i++) x += i;
            return x;
        }, { warmup: 2, iterations: 10 });

        expect(result.min).toBeLessThanOrEqual(result.median);
        expect(result.median).toBeLessThanOrEqual(result.p95);
        expect(result.p95).toBeLessThanOrEqual(result.max);
    });
});
