/**
 * ComponentSchemaConfig — قرارداد جنریک دوم (TSchema)
 *
 * Metadata بخش‌های سناریو (Scenario) و Scope هر بخش Component.
 *
 * بر اساس پلن 5.11:
 *   Schema در Rendering نقش ندارد — فقط برای:
 *     - مستندسازی ساختار Component
 *     - تعیین Scope بخش‌ها (کدام بخش تحت چه Scenario رندر می‌شود)
 *     - مانیتورینگ و ابزارهای Developer
 *
 * ساختار پیشنهادی:
 *   {
 *       section: { scope: "public",  title: "..." },
 *       header:  { scope: "protected", ... },
 *   }
 *
 * @see ComponentBase — جنریک دوم constructor
 */
export type ComponentSchemaConfig = {

    /** کلید بخش سناریو → تعریف Scope و Metadata آن بخش */
    [section: string]: {

        /** Scope بخش — public / protected / private / internal */
        scope?:  string;

        /** توضیح بخش (برای مستندسازی) */
        title?:  string;

        /** Metadata دلخواه بخش */
        [key: string]: any;

    };

};