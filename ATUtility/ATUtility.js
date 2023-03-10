
const path = require('path');
const ATLogger = require('./ATLogger/ATLogger');
const fs = require("fs");

const getWorkingDirectory = () => {
    const exeFullName = process.argv[0];
    let exePath = path.dirname(exeFullName);

    if (exePath === "C:\\Program Files\\nodejs")
        exePath = undefined;

    return exePath || process.cwd();
}

const getWorkingDirectoryPath = (newRelativePath) => {
    return path.resolve(getWorkingDirectory(), newRelativePath)
}

const getResultSetKeys = (recordsets) => {
    const result = []
    recordsets.forEach(item => {
        if (item.length) {
            const keyList = []
            const sampleObj = item[0]

            for (let key in sampleObj) {
                keyList.push(key)
            }

            result.push(keyList)
        }
    })

    return result
}

const getKeylessResultSet = (arrayOfObjects) => {
    const result = [
        getResultSetKeys(arrayOfObjects),
        ...arrayOfObjects.map(item => {
            const r1 = []

            item.forEach(obj => {
                const r2 = []

                for (let key in obj) {
                    r2.push(obj[key])
                }

                r1.push(r2)
            })

            return r1
        })
    ]
    return result
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const isStringifiedJSONValid = (str) => {
    try {
        JSON.parse(str);
    } catch {
        return false;
    }

    return true;
}

const createDirectory = (directoryPath, recursive = false) => {
    return new Promise((resolve, reject) => {
        fs.mkdir(directoryPath, { recursive: recursive }, (error) => {
            if (error)
                reject(error)
            else
                resolve(true)
        })
    })

}

const createDirectorySync = (directoryPath, recursive = false) => {
    if (!fs.existsSync(directoryPath) || recursive === true)
        fs.mkdirSync(directoryPath, { recursive: recursive })
}

const getFileListSync = (directoryPath, returnFullPath = true, includeDirectories = false) => {
    return fs.readdirSync(directoryPath, { withFileTypes: true })
        .filter(item => includeDirectories || !item.isDirectory())
        .map(item => returnFullPath ? path.resolve(directoryPath, item.name) : item.name)
}

const readFile = (path, encoding = 'utf8') => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, { encoding: encoding }, (error, data) => {
            if (error) {
                reject(error)
            }

            resolve(data)
        })
    })
}

const readFileSync = (path, encoding = 'utf8') => {
    return fs.readFileSync(path, encoding);
}

const logger = new ATLogger(getWorkingDirectoryPath)

module.exports = {
    log: (inputString, inspect = false) => logger.log(inputString, inspect),
    logAsFileSync: (data, label) => logger.logAsFileSync(data, label),
    enableConsoleLog: () => logger.enableInternalConsoleLog(),
    disableConsoleLog: () => logger.disableInternalConsoleLog(),
    getWorkingDirectoryPath,
    getKeylessResultSet,
    capitalizeFirstLetter,
    isStringifiedJSONValid,
    createDirectory,
    createDirectorySync,
    getFileListSync,
    readFile,
    readFileSync
}