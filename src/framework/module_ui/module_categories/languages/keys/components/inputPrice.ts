import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {inputPrice: {
                name: CreateTranslationKey(), description: CreateTranslationKey(),
                props: {
                    calculator: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    calculatorColor: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    information: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    form: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    calculator: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    information: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                methods: {
                    input: {description: CreateTranslationKey()},
                    focus: {description: CreateTranslationKey()},
                    blur: {description: CreateTranslationKey()},
                    clickButton: {description: CreateTranslationKey()},
                },
                examples: {
                    default: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    calculator: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    addButton: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
