// Phase 7: Public type vs runtime default invariant
// Compile-time proof: tsc --noEmit
// Runtime proof: npx tsx this file

import {Props as ButtonProps, ButtonSemantic} from "../../../lists/componentButton/Props";
import type {ExtractPropsType} from "../TypeHelpers";

type IsEqual<A, B> =
    (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
type Assert<T extends true> = T;

type ButtonPropsType = ExtractPropsType<typeof ButtonProps>;

// Compile-time: public type is widened to ButtonSemantic (not ButtonSemantic.SUBMIT)
const defaultSemantic = ButtonProps.prop_btnSemantic.default;
type _DefaultSemantic = Assert<IsEqual<typeof defaultSemantic, ButtonSemantic>>;

// Consumer compile test: any ButtonSemantic value accepted
const _consumerTest: ButtonPropsType = {
    prop_btnSemantic: ButtonSemantic.BACK,
} as ButtonPropsType;

// Runtime: default value is still the concrete literal
console.log("Runtime default:", ButtonProps.prop_btnSemantic.default);
console.log("Expected:", ButtonSemantic.SUBMIT);

if (ButtonProps.prop_btnSemantic.default !== ButtonSemantic.SUBMIT) {
    throw new Error(
        `INVARIANT FAILED: public type is ButtonSemantic but runtime default is ${ButtonProps.prop_btnSemantic.default}, expected ${ButtonSemantic.SUBMIT}`
    );
}

console.log("✅ Phase 7 invariant passed: PUBLIC TYPE ButtonSemantic ≠ RUNTIME DEFAULT ButtonSemantic.SUBMIT");
