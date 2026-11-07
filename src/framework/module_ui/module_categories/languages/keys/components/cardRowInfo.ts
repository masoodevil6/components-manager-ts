import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {cardRowInfo: {
                name: CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    borderClass: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    borderStyles: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    rows: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    titleWidth: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    options: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    optionsOpacity: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    menuBackgroundColor: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    itemBackgroundColorHover: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    card: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                methods: {
                    selectOption: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                examples: {
                    default: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    withOptions: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    customContent: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
