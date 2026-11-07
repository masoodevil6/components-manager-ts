import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {tooltip: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    tooltipIcon:         { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    tooltipIconClass:    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    tooltipIconStyles:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    tooltipIconTitle:    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    tooltipIconPosition: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    tooltipDescription:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    tooltipDirection:    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    tooltipBackground:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    tooltipColor:        { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    floatMenu: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    icon:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                examples: {
                    default: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
