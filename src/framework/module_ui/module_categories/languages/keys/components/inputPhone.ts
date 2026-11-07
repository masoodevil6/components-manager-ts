import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {inputPhone: {
                name: CreateTranslationKey(), description: CreateTranslationKey(),
                props: {
                    countryHas: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    countryWidth: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    countryValue: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    countryOptions: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    cityHas: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    cityWidth: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    cityValue: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    cityOptions: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    selectWidth: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    countrySelect: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    citySelect: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                methods: {
                    selectCountryChange: {description: CreateTranslationKey()},
                    selectCityChange: {description: CreateTranslationKey()},
                },
                examples: {
                    withoutLocationSelectors: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
