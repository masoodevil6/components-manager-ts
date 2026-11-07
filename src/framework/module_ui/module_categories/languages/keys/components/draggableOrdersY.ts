import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {draggableOrdersY: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    draggableOrderStatus: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    draggablePinStatus:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    draggableItems:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    draggableOrders:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    main:         { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    mainListItem: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                methods: {
                    update: { description: CreateTranslationKey() },
                },

                texts: {
                    placeholderInsertHere: CreateTranslationKey(),
                },

                examples: {
                    default: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
