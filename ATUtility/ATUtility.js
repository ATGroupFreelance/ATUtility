
const path = require('path');
const ATLogger = require('./ATLogger/ATLogger');

const getWorkingDirectory = () => {
    const exeFullName = process.argv[0];
    let exePath = path.dirname(exeFullName);    

    if (exePath === "C:\\Program Files\\nodejs")
        exePath = undefined;
        
    return exePath || process.cwd();
}

const createWorkingDirectoryPath = (newPath) => {
    return path.resolve(getWorkingDirectory(), newPath)
}

const logger = new ATLogger(createWorkingDirectoryPath)

module.exports = {    
    log: logger.log,
    createWorkingDirectoryPath
}