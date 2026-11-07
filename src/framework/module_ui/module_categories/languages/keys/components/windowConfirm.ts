import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {windowConfirm: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    icon:           { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    message:        { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    title:          { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    acceptText:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    cancelText:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    showCancel:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    showAccept:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    closeOnOverlay: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    windowWidth:    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    windowHeight:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    structure: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                methods: {
                    confirm: { description: CreateTranslationKey() },
                    cancel:  { description: CreateTranslationKey() },
                },

                examples: {
                    default: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
