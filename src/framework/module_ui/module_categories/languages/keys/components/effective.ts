import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {effective: {
                name: CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    isVisible: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    showMode: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    hideMode: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    showDuration: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    hideDuration: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    easing: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    collapseSpaceWhenHidden: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    root: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    border: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                examples: {
                    default: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    separateShowHideModes: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
