
const path = require('path');
const ATLogger = require('./ATLogger/ATLogger');

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

const logger = new ATLogger(getWorkingDirectoryPath)

module.exports = {
    log: (inputString, inspect = false) => logger.log(inputString, inspect),
    enableConsoleLog: () => logger.enableInternalConsoleLog(),
    disableConsoleLog: () => logger.disableInternalConsoleLog(),
    getWorkingDirectoryPath,
    getKeylessResultSet,
    capitalizeFirstLetter,
    isStringifiedJSONValid
}