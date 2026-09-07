import { describe, it, expect, afterAll } from "vitest";
import "./setup";
import * as fs from "fs";
import * as path from "path";
import { generateCombinedSvg } from "./reportCollector";

// Aggregation must run after all performance producers.
// Keep this file last until a suite-level reporter hook exists.
// This is a temporary orchestration mechanism, not architectural.
// TODO: migrate to Vitest global teardown / suite-level reporter.

const CHUNK_DIR = path.resolve(process.cwd(), "tests/perf/.chunks");

describe("Report Aggregation", () => {

    it("placeholder — triggers afterAll", () => {
        expect(true).toBe(true);
    });

    afterAll(() => {
        generateCombinedSvg();
    });
});
