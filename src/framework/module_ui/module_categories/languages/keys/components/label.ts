import {CreateTranslationKey} from "@/util_brands";

export const Keys = {category: {components: {label: {
                name:        CreateTranslationKey() ,
                description: CreateTranslationKey() ,

                groups: {
                    content:    { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    appearance: { name: CreateTranslationKey(), description: CreateTranslationKey() },
                    tooltip:    { name: CreateTranslationKey(), description: CreateTranslationKey() },
                },

                props: {
                    labelShow:                    { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelBackground:              { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelRadius:                  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelBorderTopLeftRadiusHas:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelBorderTopRightRadiusHas:  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelBorderBottomLeftRadiusHas:{ name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelBorderBottomRightRadiusHas:{ name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelMinWidth:                { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelTitle:                   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelFor:                     { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelGroups:                  { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelGroupSelected:           { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelStyle:                   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelClass:                   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelColor:                   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelTooltipIcon:             { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelTooltipDescription:      { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelTooltipBackground:       { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelTooltipColor:            { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelTooltipPosition:         { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    labelTooltipDirection:        { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                schemas: {
                    border:               { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    borderContent:        { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    borderContentTitle:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    borderContentMenuMore:{ name: CreateTranslationKey() , description: CreateTranslationKey() },
                    borderContentTooltip: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                methods: {
                    click: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    changeGroup: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    selectMenuItem: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },

                examples: {
                    default:   { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    clickable: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                    withMenuMore: { name: CreateTranslationKey() , description: CreateTranslationKey() },
                },
            }}}};
