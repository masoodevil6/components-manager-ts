// Phase 1E: Runtime identity proof for Define_ComponentProp<T>
// This file must be EXECUTED, not just compiled with tsc --noEmit.
// Run: npx tsx src/framework/module_ui/module_components/tools/type/__verify__/DefinePropRuntimeProof.ts

import {DefineProp as Define_ComponentProp} from "@/core_components";

enum TestEnum { A = "a", B = "b" }

// --- Enum: default must remain the literal value at runtime ---
const enumEntry = Define_ComponentProp<TestEnum>({
    prop: "test",
    default: TestEnum.A,
});

if (enumEntry.default !== TestEnum.A) {
    throw new Error(`Runtime identity proof FAILED: enumEntry.default expected ${TestEnum.A}, got ${enumEntry.default}`);
}
if (enumEntry.prop !== "test") {
    throw new Error(`Runtime identity proof FAILED: enumEntry.prop expected "test", got ${enumEntry.prop}`);
}

// --- Nullable: default null must remain null ---
const nullEntry = Define_ComponentProp<string | null>({
    prop: "test",
    default: null,
});

if (nullEntry.default !== null) {
    throw new Error(`Runtime identity proof FAILED: nullEntry.default expected null, got ${nullEntry.default}`);
}

// --- Array: default [] must remain [] ---
const arrayEntry = Define_ComponentProp<string[]>({
    prop: "test",
    default: [],
});

if (!Array.isArray(arrayEntry.default) || arrayEntry.default.length !== 0) {
    throw new Error(`Runtime identity proof FAILED: arrayEntry.default expected [], got ${JSON.stringify(arrayEntry.default)}`);
}

// --- Object: default {} must remain {} ---
const objectEntry = Define_ComponentProp<Record<string, string>>({
    prop: "test",
    default: {},
});

if (typeof objectEntry.default !== "object" || objectEntry.default === null || Object.keys(objectEntry.default).length !== 0) {
    throw new Error(`Runtime identity proof FAILED: objectEntry.default expected {}, got ${JSON.stringify(objectEntry.default)}`);
}

// --- Boolean: default false must remain false ---
const boolEntry = Define_ComponentProp<boolean>({
    prop: "test",
    default: false,
});

if (boolEntry.default !== false) {
    throw new Error(`Runtime identity proof FAILED: boolEntry.default expected false, got ${boolEntry.default}`);
}

console.log("✅ Runtime identity proof passed — Define_ComponentProp preserves all runtime values");
