import {Props as MouseScrollerProps} from "../componentMouseScroller/Props";

export const Props = {
    ...MouseScrollerProps,
    prop_sideBarHas: {...MouseScrollerProps.prop_sideBarHas, default: true},
    prop_sideBarWidth: {...MouseScrollerProps.prop_sideBarWidth, default: 150},
    prop_sideBarTopHas: {...MouseScrollerProps.prop_sideBarTopHas, default: true},
    prop_sideBarBottomHas: {...MouseScrollerProps.prop_sideBarBottomHas, default: true},
};

export type {PropsType, PropsConfigType} from "../componentMouseScroller/Props";
