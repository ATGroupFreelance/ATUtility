// atutility.d.ts

declare module 'atutility' {
    interface AtUtility {
        getWorkingDirectoryPath(newRelativePath: string): string;
        getKeylessResultSet(recordsets: Array<any>): Array<string[]>;
        capitalizeFirstLetter(string: string): string;
        isStringifiedJSONValid(str: string): boolean;
        createDirectory(directoryPath: string, recursive?: boolean): Promise<boolean>;
        createDirectorySync(directoryPath: string, recursive?: boolean): void;
        getFileListSync(directoryPath: string, returnFullPath?: boolean, includeDirectories?: boolean): string[];
        readFile(path: string, encoding?: string): Promise<string>;
        readFileSync(path: string, encoding?: string): string;
        getReadableErrorMessage(error: any): string;
        mergeObjectInObjectAtIndex(index: number, object: object, newObject: object): object;
        mergeObjectInObjectAtKey(key: string, object: object, newObject: object): object;
        log: (inputString: any, inspect?: boolean) => void;
        logAsFileSync: (data: string, label?: string) => void;
        logJSONasFileSync: (data: string | object, label: string) => void;
        enableConsoleLog: () => void;
        disableConsoleLog: () => void;
    }
    
    const atutility: AtUtility;
    export default atutility;
}