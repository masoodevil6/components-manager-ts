import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {inputListSelector: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    inputBackgroundColor:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBackgroundColor:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBorderColor:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    columns:               { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    icon:                  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    showListSelected:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelShow:             { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    widthBody:             { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    heightBody:            { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    heightItems:           { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    titleAll:              { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    draggable:            { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    backgroundColorIcon:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    colorIcon:             { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    main:                         { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    mainFormFloatMenu:            { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    mainFormFloatMenuIconList:    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    mainFormFloatMenuCheckBoxes:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    mainFormListSelected:         { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                methods: {
                    clickIcon:           { description: CreateTranslationKey() },
                    clickAccept:         { description: CreateTranslationKey() },
                    clickReject:         { description: CreateTranslationKey() },
                    callbackColSelector: { description: CreateTranslationKey() },
                    deleteSelectedItem:  { description: CreateTranslationKey() },
                },

                examples: {
                    default: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
