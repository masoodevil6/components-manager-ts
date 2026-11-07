import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {positionMenu: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                props: {
                    menuBackgroundColor:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBorderColor:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuSelector:         { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBody:             { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBodyWidth:        { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBodyHeight:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBorderWidth:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBtnRejectHas:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBtnRejectIcon:    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBtnRejectTitle:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBtnAcceptHas:     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBtnAcceptIcon:    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuBtnAcceptTitle:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    menuIsOpen:           { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    formFloatMenu:                  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formFloatMenuSelector:          { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formFloatMenuBody:              { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formFloatMenuBodyContent:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formFloatMenuBodyButtons:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formFloatMenuBodyButtonsAccept: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    formFloatMenuBodyButtonsReject: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                examples: {
                    default: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                texts: {
                    btnAcceptTitle: CreateTranslationKey() ,
                    btnRejectTitle: CreateTranslationKey() ,
                },
            }}}};
