import {SIZES} from "./ToolsConsts";
import {Z_INDEXES} from "./ToolsConsts";
import {fa} from "../langs/Fa";
import {Observable} from "../core/Observable";


type SizeProps = {
    fontSize:   number
    height:     number
    icon:       number
    min?:       number
    max?:       number
}

type SizeKey = typeof SIZES[keyof typeof SIZES]
type ZIndexKey = typeof Z_INDEXES[keyof typeof Z_INDEXES]

export class ToolsCss {

    static readonly STANDARDS = {
        SIZES: {
            [SIZES.XS] : { fontSize: 9    , height: 16    , icon: 14   , max: 576   },
            [SIZES.S]  : { fontSize: 10   , height: 18    , icon: 16   , min: 576   , max: 768 },
            [SIZES.M]  : { fontSize: 11   , height: 20    , icon: 18   , min: 768   , max: 992 },
            [SIZES.L]  : { fontSize: 12   , height: 22    , icon: 20   , min: 992   , max: 1200 },
            [SIZES.XL] : { fontSize: 13   , height: 24    , icon: 22   , min: 1200  , max: 1450 },
            [SIZES.XXL]: { fontSize: 14   , height: 26    , icon: 24   , min: 1450  },
        } as Record<SizeKey, SizeProps>,

        Z_INDEXES: {
            [Z_INDEXES.basic] :           1,
            [Z_INDEXES.menu_main] :       2,
            [Z_INDEXES.icon_attach] :     3,
            [Z_INDEXES.tools] :           4,
            [Z_INDEXES.tools_btn]  :      5,
            [Z_INDEXES.tools_position] :  6,

            [Z_INDEXES.new_page]  :       10,

            [Z_INDEXES.notify]  :         80,

            [Z_INDEXES.blur_popup]  :     90,
            [Z_INDEXES.popup] :           91,

            [Z_INDEXES.SELECTOR] :        100,
        } as Record<ZIndexKey, number>
    }

    static checkExistSizeSelected(sizeName: string){
        return this.STANDARDS.SIZES.hasOwnProperty(sizeName);
    }


    static getLineHeightSize(sizeName: SizeKey): number {
        return this.STANDARDS.SIZES[sizeName]?.height ?? 20
    }

    static getHeightSize(sizeName: SizeKey): number {
        return this.STANDARDS.SIZES[sizeName]?.height ?? 20
    }

    static getFontSize(sizeName: SizeKey): number {
        return this.STANDARDS.SIZES[sizeName]?.fontSize ?? 10
    }

    static getIconSize(sizeName: SizeKey|Observable<SizeKey>, defaultSize = 16): number {
        return this.STANDARDS.SIZES[sizeName]?.icon ?? defaultSize
    }

    static getScreenWidth(element: Window | null = null): SizeKey | "" {
        const el = element ?? window
        const screenWidth = el.innerWidth

        for (const key of Object.keys(this.STANDARDS.SIZES) as SizeKey[]) {
            const size = this.STANDARDS.SIZES[key]
            const minOk = size.min ? screenWidth >= size.min : true
            const maxOk = size.max ? screenWidth <= size.max : true
            if (minOk && maxOk) return key
        }
        return ""
    }

    static checkMoreThanScreenWidth(sizeName: SizeKey, element: Window | null = null): boolean {
        const el = element ?? window
        const screenWidth = el.innerWidth
        const size = this.STANDARDS.SIZES[sizeName]
        const point = size.max ?? size.min
        return point ? screenWidth >= point : false
    }

    static getZIndex(zIndexName: ZIndexKey, zIndexDefault = 1): number {
        return this.STANDARDS.Z_INDEXES[zIndexName] ?? zIndexDefault
    }
}