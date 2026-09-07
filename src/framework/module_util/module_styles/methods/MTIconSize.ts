import * as UtilConsts      from "@/util_consts";
///------------------------------
import {TVSizeUnit  }       from "../types/var/TVSizeUnit";
import {MTSizeUnit  }       from "./MTSizeUnit";
import {TCSizes     }       from "../types/const/TCSizes";
import {TVIconSize  }       from "../types/var/TVIconSize";

export const MTIconSize = (
    size: TCSizes | number | TVIconSize = UtilConsts.Sizes.M
): TVIconSize | TVSizeUnit => {

    if (typeof size === "number") {
        return MTSizeUnit(
            size,
            UtilConsts.Units.PEXEL
        ) as TVSizeUnit;
    }

    if (Object.values(UtilConsts.Sizes).includes(size as TCSizes)) {
        return `var(--iconSize${size})` as TVIconSize;
    }

    return size as TVIconSize;
};