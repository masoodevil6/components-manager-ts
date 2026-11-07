import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {timerDown: {
                name:        CreateTranslationKey(),
                description: CreateTranslationKey(),

                props: {
                    backgroundColor_body:    { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    backgroundColor_timer:   { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    backgroundColor_timerEffect: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    color_timer:             { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    color_description:      { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    description:             { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    show_options:            { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    tooltipIcon:             { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    lang_on_progress_duration: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    lang_on_end_duration:      { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    lang_btn_resend:           { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },

                texts: {
                    onProgressDuration: CreateTranslationKey(),
                    onEndDuration: CreateTranslationKey(),
                    btnResend: CreateTranslationKey(),
                },

                schemas: {
                    form:       { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    tooltip:    { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    timer:      { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    text:       { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    textButton: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },

                methods: {
                    clickRetry:   { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    finishTimer:  { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },

                examples: {
                    default: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
            }}}};
