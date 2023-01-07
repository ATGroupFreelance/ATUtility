const fs = require('fs');
const path = require('path');
const util = require('util')
const moment = require('moment/moment');
//Async Lock, this is used to lock the file thread in order to avoid multi access error
const asynclock = require('async-lock');
const lock = new asynclock();

class ATLogger {
    constructor(createWorkingDirectoryPathFunc, logKey = 'default_log_key') {
        const newFileDate = moment().format('YYYY-MM-DD')

        this.logFileDate = newFileDate
        this.createWorkingDirectoryPathFunc = createWorkingDirectoryPathFunc
        this.logFile = this.createLogFile(newFileDate)
        this.logKey = logKey
    }

    createLogFile = (filename) => {
        const dir = this.createWorkingDirectoryPathFunc('Logs')
        console.log("Log directory: ", dir)
        if (!fs.existsSync(dir)) {
            console.log("Log directory not found, making a new directory...")
            fs.mkdirSync(dir);
            console.log("Done!")
        };

        return fs.createWriteStream(path.resolve(dir, filename + '.log'), { encoding: 'utf8', flags: 'a' });
    }

    log = (newLog, inspect) => {
        if (inspect)
            console.log(util.inspect(d, { showHidden: true, depth: null, colors: true }))
        else
            console.log(newLog);

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
                console.log("Error on logging!");
                console.log(err.message)
            }
        }, {});
    }
}

module.exports = ATLogger   
