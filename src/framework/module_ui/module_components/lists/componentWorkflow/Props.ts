import {Props as MouseScrollerProps} from "../componentMouseScroller/Props";
import * as UtilConst from "@/util_consts";
import * as UtilStyle from "@/util_styles";

export const Props = {
    ...MouseScrollerProps,
    prop_borderBackgroundColor_light: {
        ...MouseScrollerProps.prop_borderBackgroundColor_light,
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
    },
    prop_borderBackgroundColor_dark: {
        ...MouseScrollerProps.prop_borderBackgroundColor_dark,
        default: UtilStyle.Css_Color(UtilConst.ColorMain.SHAN, UtilConst.ColorGrad.GRADE_1),
    },
    prop_sideBarHas: {...MouseScrollerProps.prop_sideBarHas, default: true},
    prop_sideBarWidth: {...MouseScrollerProps.prop_sideBarWidth, default: 150},
    prop_sideBarTopHas: {...MouseScrollerProps.prop_sideBarTopHas, default: true},
    prop_sideBarBottomHas: {...MouseScrollerProps.prop_sideBarBottomHas, default: true},
};

export type {PropsType, PropsConfigType} from "../componentMouseScroller/Props";
