import {beforeAll, describe, expect, it} from "vitest";
import * as FrameworkLang from "../../src/framework/Lang";

const {Locale} = FrameworkLang;

const localized = (fa: string, en: string) => [
    {locale: Locale.FA_IR, value: fa},
    {locale: Locale.EN_US, value: en},
] as const;

describe("consumer language catalogs", () => {
    beforeAll(() => {
        FrameworkLang.App.initialize({
            [Locale.EN_US.code]: new Map(),
            [Locale.FA_IR.code]: new Map(),
        }, Locale.EN_US);
        FrameworkLang.registerLocale(Locale.FA_IR);
    });

    it("registers a five-level category tree and exposes its translations", () => {
        const catalog = FrameworkLang.registerCatalog({
            id: "catalog-test-store",
            categories: [
                {
                    id: "store",
                    title: localized("فروشگاه", "Store"),
                    children: [
                        {
                            id: "checkout",
                            title: localized("خرید", "Checkout"),
                            children: [
                                {
                                    id: "payment",
                                    title: localized("پرداخت", "Payment"),
                                    children: [
                                        {
                                            id: "bank-card",
                                            title: localized("کارت بانکی", "Bank card"),
                                            children: [
                                                {
                                                    id: "errors",
                                                    title: localized("خطاها", "Errors"),
                                                    entries: [
                                                        {
                                                            key: "payment.card.invalidNumber",
                                                            translations: localized(
                                                                "شماره کارت معتبر نیست",
                                                                "The card number is invalid",
                                                            ),
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        const key = catalog.keys["payment.card.invalidNumber"];
        expect(typeof key).toBe("symbol");
        expect(FrameworkLang.getTranslations(key)).toEqual({
            En: "The card number is invalid",
            Fa: "شماره کارت معتبر نیست",
        });
        expect(FrameworkLang.listCatalogs().some((item) => item.id === catalog.id)).toBe(true);
        expect(FrameworkLang.getCatalog(catalog.id)?.categories[0].children?.[0].id).toBe("checkout");
    });

    it("rejects invalid nested categories atomically", () => {
        const catalogId = "catalog-test-invalid-tree";
        const beforeKeys = FrameworkLang.listKeys().length;

        expect(() => FrameworkLang.registerCatalog({
            id: catalogId,
            categories: [
                {
                    id: "root",
                    title: localized("ریشه", "Root"),
                    entries: [
                        {
                            key: "must.not.register",
                            translations: [{locale: {code: "Unknown", name: "Unknown", directionRtl: false}, value: "x"}],
                        },
                    ],
                },
            ],
        })).toThrow(/Framework\.Lang.*catalog\.categories\[0\]\.entries\[0\]\.translations\[0\]\.locale/);

        expect(FrameworkLang.getCatalog(catalogId)).toBeNull();
        expect(FrameworkLang.listKeys()).toHaveLength(beforeKeys);

        expect(() => FrameworkLang.registerCatalog({
            id: catalogId,
            categories: [
                {
                    id: "duplicate",
                    title: localized("اول", "First"),
                    children: [{id: "duplicate", title: localized("دوم", "Second")}],
                },
            ],
        })).toThrow(/category id 'duplicate' is duplicated/);

        expect(FrameworkLang.getCatalog(catalogId)).toBeNull();
    });

    it("requires registered locale references rather than raw locale strings", () => {
        expect(() => FrameworkLang.registerCatalog({
            id: "catalog-test-string-locale",
            categories: [
                {
                    id: "root",
                    title: [{locale: "Fa" as any, value: "ریشه"}],
                },
            ],
        })).toThrow(/use a registered Framework\.Lang\.Locale reference/);
    });
});
