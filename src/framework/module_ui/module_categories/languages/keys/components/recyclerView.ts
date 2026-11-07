import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {recyclerView: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    formClass:          { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formStyles:         { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formDirection:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formComponents:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    components: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                examples: {
                    horizontal: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    vertical:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
