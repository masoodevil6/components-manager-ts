import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {cardViewInfo: {
                name:        CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    title:   { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    content: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
                schemas: {
                    card: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
                examples: {
                    default: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
            }}}};
