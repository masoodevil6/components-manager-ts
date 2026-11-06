/** Consumer-facing language API. Internal language registries remain behind this facade. */
export * from "@/core_languages";

import {Keys as CategoriesLanguageKeys} from "./module_ui/module_categories/languages/Keys";
import {Keys as ValidatorLanguageKeys} from "./module_util/module_validators/language/keys";
import {App as LanguageApp} from "@/core_languages";
import type {TranslationKey} from "@/util_brands";

/** Existing framework translation-key references grouped by their source module. */
export const Keys = Object.freeze({
    Categories: CategoriesLanguageKeys,
    Validators: ValidatorLanguageKeys,
});

const registerKeyTree = (value: unknown, namespace: string, path: string[] = []): void => {
    if (typeof value === "symbol") {
        const name = path.join(".");
        LanguageApp.registerKeyMetadata(value as TranslationKey, {
            id: `${namespace}.${name}`,
            namespace,
            name,
        });
        return;
    }

    if (!value || typeof value !== "object") return;

    for (const [key, child] of Object.entries(value)) {
        registerKeyTree(child, namespace, [...path, key]);
    }
};

registerKeyTree(Keys.Categories, "categories");
registerKeyTree(Keys.Validators, "validators");
