// Phase 1C + 1D: Compile-time proofs for Define_ComponentProp<T> contract and overload compatibility
// Run: tsc --noEmit on this file

import {DefineProp as Define_ComponentProp} from "@/core_components";
import type {ComponentPropEntry} from "@/core_components";
import type {PropType} from "@/core_components";

type IsEqual<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// ==========================================
// Phase 1C: Per-entry contract proofs
// ==========================================

enum TestEnum { A = "a", B = "b" }

// --- Test enum ---
const enumEntry = Define_ComponentProp<TestEnum>({
    prop: "test",
    default: TestEnum.A,
});

type EnumEntryType = typeof enumEntry;
type _EnumIsInterface = Assert<IsEqual<EnumEntryType, ComponentPropEntry<TestEnum>>>;
type EnumExtracted = EnumEntryType extends ComponentPropEntry<infer T> ? T : never;
type _EnumExtracted = Assert<IsEqual<EnumExtracted, TestEnum>>;

// --- Test string | null ---
const nullEntry = Define_ComponentProp<string | null>({
    prop: "test",
    default: null,
});

type NullEntryType = typeof nullEntry;
type _NullIsInterface = Assert<IsEqual<NullEntryType, ComponentPropEntry<string | null>>>;
type NullExtracted = NullEntryType extends ComponentPropEntry<infer T> ? T : never;
type _NullExtracted = Assert<IsEqual<NullExtracted, string | null>>;

// --- Test string[] ---
const arrayEntry = Define_ComponentProp<string[]>({
    prop: "test",
    default: [],
});

type ArrayEntryType = typeof arrayEntry;
type _ArrayIsInterface = Assert<IsEqual<ArrayEntryType, ComponentPropEntry<string[]>>>;
type ArrayExtracted = ArrayEntryType extends ComponentPropEntry<infer T> ? T : never;
type _ArrayExtracted = Assert<IsEqual<ArrayExtracted, string[]>>;

// --- Test Record<string, string> ---
const objectEntry = Define_ComponentProp<Record<string, string>>({
    prop: "test",
    default: {},
});

type ObjectEntryType = typeof objectEntry;
type _ObjectIsInterface = Assert<IsEqual<ObjectEntryType, ComponentPropEntry<Record<string, string>>>>;
type ObjectExtracted = ObjectEntryType extends ComponentPropEntry<infer T> ? T : never;
type _ObjectExtracted = Assert<IsEqual<ObjectExtracted, Record<string, string>>>;

// --- Test boolean ---
const boolEntry = Define_ComponentProp<boolean>({
    prop: "test",
    default: false,
});

type BoolEntryType = typeof boolEntry;
type _BoolIsInterface = Assert<IsEqual<BoolEntryType, ComponentPropEntry<boolean>>>;
type BoolExtracted = BoolEntryType extends ComponentPropEntry<infer T> ? T : never;
type _BoolExtracted = Assert<IsEqual<BoolExtracted, boolean>>;

// --- Test: compile-time type widening (regression assertion) ---
// NOTE: This is a regression assertion, NOT an independent proof.
// It is logically implied by _EnumIsInterface above:
//   typeof enumEntry === ComponentPropEntry<TestEnum>
//   -> typeof enumEntry.default === TestEnum (from the interface definition)
// Keep it as a regression guard — if it fails, the return type contract broke.
type _DefaultIsWide = Assert<IsEqual<typeof enumEntry.default, TestEnum>>;

// --- Test: negative type test (validation enforcement) ---
// The explicit generic <T> must enforce validation, not just be decoration.
// @ts-expect-error — default "invalid" is not assignable to TestEnum
Define_ComponentProp<TestEnum>({
    prop: "test",
    default: "invalid",
});

// --- Test: nullable type acceptance ---
// Define_ComponentProp<string | null> with default: null must compile
const nullableEntry = Define_ComponentProp<string | null>({
    prop: "test",
    default: null,
});
type _NullableAccepts = Assert<IsEqual<typeof nullableEntry.default, string | null>>;

// ==========================================
// Phase 1D: Existing whole-object compatibility proof
// ==========================================

// Simulate existing usage pattern with `as any`
const existingCall = Define_ComponentProp<Record<string, any>>({
    prop_test: { prop: "test", default: "value" },
} as any);

type ExistingCallType = typeof existingCall;

// The return type must match the whole-object contract, NOT ComponentPropEntry<...>.
// If per-entry overload were selected, return type would be
// ComponentPropEntry<Record<string, any>> — which is wrong.

// IMPORTANT: Do NOT reconstruct ExpectedExistingCallType independently.
// If the project already has a type alias for the whole-object return contract, use it.
// If not, you may proceed WITHOUT a shared alias — the inline reconstruction below
// is acceptable as a first pass. Only if `_ExistingCallPreserved` FAILS should you
// consider introducing a shared `WholeObjectReturn<TPropTypes>` alias used by BOTH
// the overload AND this test, to ensure comparison against the SAME contract.

type ExpectedExistingCallType = {
    [K in PropType<Record<string, any>>]: ComponentPropEntry<Record<string, any>[K]>
};

type _ExistingCallPreserved = Assert<
    IsEqual<ExistingCallType, ExpectedExistingCallType>
>;

// Also verify per-entry call selects overload 2, not overload 1:
const singleEntry = Define_ComponentProp<TestEnum>({
    prop: "test",
    default: TestEnum.A,
});

type _SingleEntryIsInterface = Assert<
    IsEqual<typeof singleEntry, ComponentPropEntry<TestEnum>>
>;
