import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {inputGroup: {
                name: CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    inputs: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    groupSelected: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                methods: {
                    changeGroup: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    form: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                examples: {
                    default: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
