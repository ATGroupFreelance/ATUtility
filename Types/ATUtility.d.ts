declare module './atutility' {
    function getWorkingDirectoryPath(newRelativePath: string): string;
    function getKeylessResultSet(recordsets: Array<any>): Array<string[]>;
    function capitalizeFirstLetter(string: string): string;
    function isStringifiedJSONValid(str: string): boolean;
    function createDirectory(directoryPath: string, recursive?: boolean): Promise<boolean>;
    function createDirectorySync(directoryPath: string, recursive?: boolean): void;
    function getFileListSync(directoryPath: string, returnFullPath?: boolean, includeDirectories?: boolean): string[];
    function readFile(path: string, encoding?: string): Promise<string>;
    function readFileSync(path: string, encoding?: string): string;
    function getReadableErrorMessage(error: any): string;
    function mergeObjectInObjectAtIndex(index: number, object: object, newObject: object): object;
    function mergeObjectInObjectAtKey(key: string, object: object, newObject: object): object;

    const log: (inputString: any, inspect?: boolean) => void;
    const logAsFileSync: (data: string, label?: string) => void;
    const logJSONasFileSync: (data: string | object, label: string) => void;
    const enableConsoleLog: () => void;
    const disableConsoleLog: () => void;


    export default {
        getWorkingDirectoryPath,
        getKeylessResultSet,
        capitalizeFirstLetter,
        isStringifiedJSONValid,
        createDirectory,
        createDirectorySync,
        getFileListSync,
        readFile,
        readFileSync,
        getReadableErrorMessage,
        mergeObjectInObjectAtIndex,
        mergeObjectInObjectAtKey,
        log,
        logAsFileSync,
        logJSONasFileSync,
        enableConsoleLog,
        disableConsoleLog
    };
}
