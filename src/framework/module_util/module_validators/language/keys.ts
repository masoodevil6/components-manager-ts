import {CreateTranslationKey} from "@/util_brands";

export const Keys = {
    charLength: {
        title:       CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
    isEmail: {
        title:       CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
    notEmpty: {
        title:       CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
    numLength: {
        title:       CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
    textCharUpper: {
        title:       CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
    textForbidden: {
        title:       CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
    textLength: {
        title:       CreateTranslationKey(),
        description: CreateTranslationKey(),
    },
} as const;
