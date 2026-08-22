
export const MTGetExtension = function (filename: string): string {

    const index = filename.lastIndexOf(".");

    return index <= 0
        ? ""
        : filename.substring(index + 1);
}