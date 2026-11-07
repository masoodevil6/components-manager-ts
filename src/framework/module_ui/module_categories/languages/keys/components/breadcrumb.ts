import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {breadcrumb: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,
                backButtonLabel: CreateTranslationKey(),
                props: {
                    breadcrumbs:       {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    stepSelected:      {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    showBtn:           {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    unactiveBreadcrumb:{name: CreateTranslationKey(), description: CreateTranslationKey()},
                    colorUnactive:     {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    activeBreadcrumb:  {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    colorActive:       {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                schemas: {
                    scroller:       {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    backButton:     {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    breadcrumbs:   {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    breadcrumbItem:{name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                methods: {
                    selectBreadcrumb: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    back:             {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
                examples: {
                    default:        {name: CreateTranslationKey(), description: CreateTranslationKey()},
                    withBackButton: {name: CreateTranslationKey(), description: CreateTranslationKey()},
                },
            }}}};
