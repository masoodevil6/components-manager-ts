
export class ToolsExcel {


    static addExcelKeys<T extends object>(
        list: T[],
        keyName = "excelKey"
    ): (T & Record<string, string>)[] {

        const getExcelColumnName = (index: number): string => {

            let name = "";

            while (index >= 0) {

                name = String.fromCharCode(index % 26 + 65) + name;
                index = Math.floor(index / 26) - 1;
            }

            return name;
        };

        return list.map((item, index) => ({
            ...item,
            [keyName]: getExcelColumnName(index)
        }));
    }


}