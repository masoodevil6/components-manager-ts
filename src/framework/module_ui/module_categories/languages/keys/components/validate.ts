import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {validate: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    listRules:           { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    msgRules:            { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    reference:           { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    referenceComponent:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    isAbsolute:          { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    title:               { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    iconSuccess:         { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    iconError:           { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    size:                { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    value:               { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    form:           { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    rulesHtml:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    validatesData:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    statusIcon:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                methods: {
                    change: { description: CreateTranslationKey() },
                },

                examples: {
                    default: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
