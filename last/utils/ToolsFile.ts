
export interface MainDataFile {
    file: File;
    size: number;
    type: string;
    name: string;
}

export class ToolsFile {

    static getExtensionFileSelected(filename: string): string {

        const index = filename.lastIndexOf(".");

        return index <= 0
            ? ""
            : filename.substring(index + 1);
    }



    static getMainDataFile(
        file: File,
        newFileName: string | null = null
    ): MainDataFile {

        file.type

        return {

            file,

            size: file.size,

            type: file.type,

            name: newFileName
                ? `${newFileName}.${this.getExtensionFileSelected(file.name)}`
                : file.name
        };
    }
}