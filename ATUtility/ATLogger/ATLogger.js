const fs = require('fs');
const path = require('path');
const util = require('util')
const moment = require('moment/moment');
//Async Lock, this is used to lock the file thread in order to avoid multi access error
const asynclock = require('async-lock');
const lock = new asynclock();

class ATLogger {
    constructor(getWorkingDirectoryPath, logKey = 'default_log_key') {
        const newFileDate = moment().format('YYYY-MM-DD')

        this.logFileDate = newFileDate
        this.getWorkingDirectoryPathFunc = getWorkingDirectoryPath
        this.logFile = this.createLogFile(newFileDate)
        this.logKey = logKey
        this.consoleLogEnabled = true
    }

    internalConsoleLog = (...props) => {
        if (this.consoleLogEnabled)
            console.log(...props)
    }

    enableInternalConsoleLog = () => {
        this.consoleLogEnabled = true
    }

    disableInternalConsoleLog = () => {
        this.consoleLogEnabled = false
    }

    getLogDirectory = () => {
        const dir = this.getWorkingDirectoryPathFunc('Logs')
        this.internalConsoleLog("Log directory: ", dir)
        if (!fs.existsSync(dir)) {
            this.internalConsoleLog("Log directory not found, making a new directory...")
            fs.mkdirSync(dir);
            this.internalConsoleLog("Done!")
        };

        return dir
    }

    createLogFile = (filename) => {
        const dir = this.getLogDirectory()

        return fs.createWriteStream(path.resolve(dir, filename + '.log'), { encoding: 'utf8', flags: 'a' });
    }

    log = (newLog, inspect) => {
        if (inspect)
            this.internalConsoleLog(util.inspect(d, { showHidden: true, depth: null, colors: true }))
        else
            this.internalConsoleLog(newLog);

        //Log the thread
        lock.acquire(this.logKey, (resolve) => {
            const currentDate = moment().format('YYYY-MM-DD');

            //Check to see if a new day has began
            if (currentDate !== this.logFileDate) {
                //Update log file date
                this.logFileDate = currentDate;
                //Close the previous log file
                this.logFile.end();
                //Open a new log file
                this.logFile = this.createLogFile(this.logFileDate);
            }

            //Log with a time stamp
            this.logFile.write(moment().format('YYYY-MM-DD HH:mm:ss.SSS') + ": ");
            this.logFile.write(util.format(newLog) + '\n');

            //Release lock
            resolve();
        }, (err, ret) => {
            if (typeof err !== 'undefined' && err) {
                this.internalConsoleLog("Error on logging!");
                this.internalConsoleLog(err.message)
            }
        }, {});
    }

    logAsFileSync = (data, label = '') => {
        let baseFilename = `${this.logFileDate}_${moment().format('HH-mm-ss.SSS')}_File`
        if (label && label !== '') {
            baseFilename = baseFilename + '_' + label
        }

        const baseFilePath = path.resolve(this.getLogDirectory(), baseFilename)
        const filePath = baseFilePath + '.log'

        let counter = 0
        while (fs.existsSync(filePath)) {
            counter = counter + 1
        }

        fs.writeFileSync(counter === 0 ? filePath : baseFilePath + `_${counter}` + '.log', data)
    }

    isString = (x) => {
        return Object.prototype.toString.call(x) === "[object String]"
    }

    logJSONasFileSync = (data, label) => {
        const baseFilePath = path.resolve(this.getLogDirectory(), label)
        const filePath = baseFilePath + '.json'

        if (this.isString(data)) {
            fs.writeFileSync(filePath, data)
        }
        else {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 4))
        }
    }
}

module.exports = ATLogger   
