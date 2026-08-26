import * as CoreReactive    from "@/core_reactive";
///------------------------------
import {TBrands as Brands}       from "../types/TBrands";

export type TBrandIcons = Brands<ReturnType< typeof CoreReactive.App.svg> , "icon">