/**
 * Class — کلاس‌های Base ماژول Components (Core)
 *
 *   ComponentBase         → قرارداد واحد Base Componentها (پلن 6.1 — سه‌جنریکی)
 *   ClComponentBase       → Legacy Schema-driven (نگهداری حداقلی)
 *   ComponentPropConfig   → قرارداد آرگومان اول constructor
 *   ComponentSchemaConfig → قرارداد جنریک دوم (TSchema)
 *   ComponentMethodConfig → قرارداد آرگومان دوم constructor
 *   ComponentIdentity     → قرارداد آرگومان سوم constructor
 */
export {ClComponentBase}                       from "./ClComponentBase";
export {ComponentBase}                         from "./ComponentBase";
export type {ComponentPropConfig}              from "./ComponentPropConfig";
export type {ComponentSchemaConfig}            from "./ComponentSchemaConfig";
export type {ComponentMethodConfig}            from "./ComponentMethodConfig";
export type {ComponentIdentity}                from "./ComponentIdentity";