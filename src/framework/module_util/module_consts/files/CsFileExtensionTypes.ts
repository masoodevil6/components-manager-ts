
///------------------------------
import {CsFileMimeTypes as FileMimeTypes} from "./CsFileMimeTypes";

export const CsFileExtensionTypes: Record<string, FileMimeTypes> = {

    png:      FileMimeTypes.PNG,

    jpg:      FileMimeTypes.JPG,
    jpeg:     FileMimeTypes.JPEG,

    gif:      FileMimeTypes.GIF,
    webp:     FileMimeTypes.WEBP,
    svg:      FileMimeTypes.SVG,
    ico:      FileMimeTypes.ICO,
    bmp:      FileMimeTypes.BMP,
    tiff:     FileMimeTypes.TIFF,

    pdf:      FileMimeTypes.PDF,

    json:     FileMimeTypes.JSON,
    xml:      FileMimeTypes.XML,

    txt:      FileMimeTypes.TXT,
    csv:      FileMimeTypes.CSV,
    html:     FileMimeTypes.HTML,
    css:      FileMimeTypes.CSS,

    js:       FileMimeTypes.JS,
    ts:       FileMimeTypes.TS,

    zip:      FileMimeTypes.ZIP,
    rar:      FileMimeTypes.RAR,
    gz:       FileMimeTypes.GZIP,
};