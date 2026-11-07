import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {layout: {
                name: CreateTranslationKey(),
                description: CreateTranslationKey(),
                groups: {
                    layout: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                props: {
                    col: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    layoutClass: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    layoutStyles: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    layoutContent: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    layout: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                examples: {
                    default: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    slottedContent: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    reactiveContent: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
