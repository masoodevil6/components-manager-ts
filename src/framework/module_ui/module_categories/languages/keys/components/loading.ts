import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {loading: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    type:              { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    icon:              { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    backgroundLoading: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    backgroundShadow:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    loadingWidth:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    loadingHeight:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    showCancel:        { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    cancelDelay:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    loading:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    cancelBtn:{ name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                methods: {
                    cancel: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                examples: {
                    default: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
