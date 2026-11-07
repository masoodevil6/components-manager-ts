import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {console: {
                name: CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    entries: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    maxEntries: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    autoScroll: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    showLevelFilter: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    showClearButton: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    placeholder: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    root: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    toolbar: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    output: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                methods: {
                    clear: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    entry: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    filterChange: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                texts: {
                    clear: CreateTranslationKey(),
                    search: CreateTranslationKey(),
                    all: CreateTranslationKey(),
                    empty: CreateTranslationKey(),
                },
                examples: {
                    default: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    levels: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    objects: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
