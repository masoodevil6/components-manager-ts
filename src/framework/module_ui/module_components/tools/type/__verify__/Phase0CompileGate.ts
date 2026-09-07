// tools/type/__verify__/Phase0CompileGate.ts
//
// DEVELOPMENT ONLY — feasibility test روی Definition واقعی ComponentButton
// نباید از type/index.ts export شود

import {Props as ButtonProps} from "../../../lists/componentButton";
import type {TObservableValue} from "@/core_observable";
import type {
    ExtractPropsType,
    ExtractPropsConfigType,
} from "../TypeHelpers";

// ─── IsEqual + Assert utilities ───
type IsEqual<A, B> =
    (<T>() => T extends A ? 1 : 2) extends
    (<T>() => T extends B ? 1 : 2)
        ? true
        : false;

type Assert<T extends true> = T;

// ─── Legacy Implementation (مرجع) ───
type LegacyPropsType<TProps extends Record<string, { default: any }>> = {
    [K in keyof TProps]: TProps[K]["default"]
};

type LegacyPropsConfigType<TProps extends Record<string, { default: any }>> = {
    [K in keyof TProps]: TObservableValue<TProps[K]["default"]>
};

// ═══════════════════════════════════════════
// Gate 1: satisfies + literal inference
// ═══════════════════════════════════════════
// آیا ExtractPropsType<typeof ComponentButton.Props> همان type فعلی را می‌دهد؟

type _ButtonPropsEquivalence = Assert<
    IsEqual<
        LegacyPropsType<typeof ButtonProps>,
        ExtractPropsType<typeof ButtonProps>
    >
>;

// ═══════════════════════════════════════════
// Gate 2 + 3: PropsConfig compile + TObservableValue compatibility
// ═══════════════════════════════════════════
// آیا ExtractPropsConfigType<typeof ComponentButton.Props> compile می‌شود؟
// آیا تمام defaultهای واقعی ComponentButton قابل قبول‌اند؟
// اگر TObservableValue<T extends SomeConstraint> باشد،
// همین‌جا failure می‌گیریم.
// همزمان equivalence با Legacy را هم چک می‌کنیم.

type _ButtonPropsConfigEquivalence = Assert<
    IsEqual<
        LegacyPropsConfigType<typeof ButtonProps>,
        ExtractPropsConfigType<typeof ButtonProps>
    >
>;

// ═══════════════════════════════════════════
// Gate 4: Definition constraint (diagnostic clarity)
// ═══════════════════════════════════════════
// آیا typeof ComponentButton.Props واقعاً constraint helper را satisfy می‌کند؟
// اگر Gate 1 compile شده باشد، این خود‌به‌خود برقرار است،
// ولی این خط diagnostic clarity دارد — وقتی compile error رخ دهد،
// تشخیص مشکل سریع‌تر می‌شود.

type _ButtonPropsConstraintCheck =
    typeof ButtonProps extends Record<string, { default: any }> ? true : false;

type _ButtonPropsConstraintAssert = Assert<_ButtonPropsConstraintCheck>;
