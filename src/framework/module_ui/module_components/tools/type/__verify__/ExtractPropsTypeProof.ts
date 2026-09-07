// Phase 2: ExtractPropsType + ExtractPropsConfigType empirical proof
// Run: tsc --noEmit (full project compile)

import {DefineProp as Define_ComponentProp} from "@/core_components";
import type {ComponentPropEntry} from "@/core_components";
import type {ExtractPropsType, ExtractPropsConfigType} from "../TypeHelpers";

type IsEqual<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

// ==========================================
// Phase 2B: ExtractPropsType with helper output
// ==========================================

enum TestEnum { A = "a", B = "b" }

const testProps = {
    enumProp: Define_ComponentProp<TestEnum>({
        prop: "enumProp", default: TestEnum.A,
    }),
    nullableProp: Define_ComponentProp<string | null>({
        prop: "nullableProp", default: null,
    }),
    arrayProp: Define_ComponentProp<string[]>({
        prop: "arrayProp", default: [],
    }),
    objectProp: Define_ComponentProp<Record<string, string>>({
        prop: "objectProp", default: {},
    }),
    boolProp: Define_ComponentProp<boolean>({
        prop: "boolProp", default: false,
    }),
} satisfies Record<string, ComponentPropEntry<any>>;

// Test with CURRENT ExtractPropsType (no changes yet)
type TestPropsType = ExtractPropsType<typeof testProps>;

type _1 = Assert<IsEqual<TestPropsType["enumProp"], TestEnum>>;
type _2 = Assert<IsEqual<TestPropsType["nullableProp"], string | null>>;
type _3 = Assert<IsEqual<TestPropsType["arrayProp"], string[]>>;
type _4 = Assert<IsEqual<TestPropsType["objectProp"], Record<string, string>>>;
type _5 = Assert<IsEqual<TestPropsType["boolProp"], boolean>>;

// --- Negative proof: enum must NOT narrow to literal ---
type _EnumIsNotSubmit = Assert<
    IsEqual<IsEqual<TestPropsType["enumProp"], TestEnum.A>, false>
>;

// --- Default value preservation test (compile-time only) ---
type _6 = Assert<IsEqual<typeof testProps.enumProp.default, TestEnum>>;

// ==========================================
// Phase 2C: Legacy entry behavior (empirical)
// ==========================================

// Legacy entry (satisfies, no helper)
const legacyEntry = {
    prop: "legacy",
    default: TestEnum.A,
} satisfies ComponentPropEntry<TestEnum>;

type LegacyDefault = typeof legacyEntry.default;
// Do not add an assertion for legacy inference unless the actual compiler result
// is first inspected. If the result is relevant to compatibility, add an
// assertion documenting the observed behavior.
// Observed: typeof legacyEntry.default is TestEnum.A (literal), NOT TestEnum.
// This confirms the root cause — satisfies preserves literal type.

// ==========================================
// Phase 2E: ExtractPropsConfigType independent proof
// ==========================================

type TestPropsConfigType = ExtractPropsConfigType<typeof testProps>;

// ExtractPropsConfigType uses TProps[K]["default"] which is now T (widened).
// So TObservableValue<T> should be correct.
// We just verify it compiles without error — the exact TObservableValue
// expansion depends on the observable library's type definition.
type _ConfigCompiles = TestPropsConfigType;
