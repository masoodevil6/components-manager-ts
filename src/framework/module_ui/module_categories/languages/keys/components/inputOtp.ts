import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {inputOtp: {
                name: CreateTranslationKey(),
                description: CreateTranslationKey(),
                props: {
                    name: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    input: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    langs: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    length: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
                schemas: {
                    otpStructure: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    value: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    elements: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    label: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    inputs: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    timerDown: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
                methods: {
                    getNewToken: { description: CreateTranslationKey() },
                    finishToken: { description: CreateTranslationKey() },
                    change: { description: CreateTranslationKey() },
                    completeInputOtp: { description: CreateTranslationKey() },
                },
                examples: {
                    default: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },
            }}}};
