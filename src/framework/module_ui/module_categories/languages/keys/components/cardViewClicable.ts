import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {cardViewClicable: {
                name:        CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    title:   { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    content: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    imageSrc: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
                schemas: {
                    card: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    cardTitle: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
                examples: {
                    default: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
            }}}};
