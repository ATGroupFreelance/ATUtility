A simple node js and javascript utility for a few useful functionalities including a logger that can log any string to a file with a timestamp.

<h1><strong>ATUtility</strong></h1>
This is a utility package for node js, the goal is to gather useful functions and utilities for developing backend and node js application in one place.
<br>
<h2><strong>How to install using npm</strong></h2>
<br>

```

npm install atutility

```

<h2><strong>How to use ?</strong></h2>
<br>
<h3><b>Import</h3>
<br>

```

const ATUtility = require('atutility')

```

<br>
<h3><b>Log to file</h3>
<br>
Log a text to a file with timestamp.

```

ATUtility.log("I'll create a log folder for you and log this string with a timestamp")

```

The log function by default also console logs every input, you can disable or enable this feature any time using the following functions

```

ATUtility.enableConsoleLog()
ATUtility.disableConsoleLog()

```

<br>
<h3><b>Useful String and JSON Manipulations</h3>
<br>
Capitalize the first letter of an string.

```

ATUtility.capitalizeFirstLetter('apple')

```

Check to see if a JSON string is valid and parsable.

```

ATUtility.isStringifiedJSONValid(str)

```

Convert an array of objects to an array of keyless result set that keep their order.

```

ATUtility.getKeylessResultSet(arrayOfObject)

```

<br>
<h3><b>Useful Directory and File Functions</h3>
<br>
get the absolute path of a relative path.

```

ATUtility.getWorkingDirectoryPath("/A/Relative/Path/To/Working/Directory")

```

Create a directory asynchronously if it doesn't exists, the result is a promise.

```

ATUtility.createDirectory('New Folder')
.then(() => {
    console.log('success')
})
.catch((error) => {
    console.log(error)
})

```

Create a directory synchronously if it doesn't exists.

```

ATUtility.createDirectorySync('New Folder')

```

Get a list of all the files inside a folder.

```

const fileList = ATUtility.getFileListSync('My folder path')

```

Read a single file asynchronously and return the result as a promise.

```

ATUtility.readFile('myTextFile.txt')
.then((data) => {
    console.log(data)
})
.catch(() => {
    console.log(error)
})

```

Read a single file synchronously and return the result.

```

const data = ATUtility.readFileSync('myTextFile.txt')

```