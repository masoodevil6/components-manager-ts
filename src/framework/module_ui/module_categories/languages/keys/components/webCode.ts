import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {webCode: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    icon:            { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    iconClass:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    iconStyles:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    background:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    btnRetryHas:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    btnRetryTitle:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    btnRetryClass:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    btnRetryIcon:    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    hasBtnClose:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    content:                   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    contentBlur:               { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    contentBlurPosition:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    contentBlurPositionIcon:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    contentBlurPositionRetry:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                methods: {
                    retryClick: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                examples: {
                    default: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
