import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {effectChange: {
                name: CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    content: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    mode: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    changeDirection: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    duration: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    easing: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    respectReducedMotion: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    root: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    content: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                methods: {
                    transitionStart: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    transitionEnd: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                examples: {
                    default: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    pageChange: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    slider: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    loading: {
                        name: CreateTranslationKey(),
                        description: CreateTranslationKey(),
                        start: CreateTranslationKey(),
                        finish: CreateTranslationKey(),
                    },
                },
            }}}};
