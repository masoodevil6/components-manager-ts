import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {inputSelectOption: {
                name: CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    name: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    itemSelected: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    options: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    placeholder: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    isDisable: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    inputClass: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    inputStyles: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    form: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    select: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                methods: {
                    selectChange: {description: CreateTranslationKey()},
                },
                examples: {
                    default: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    withIconAndButton: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    withIcon: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    withButton: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
