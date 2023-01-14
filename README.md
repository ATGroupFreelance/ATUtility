A simple node js and javascript utility for a few useful functionalities including a logger that can log any string to a file with a timestamp.

<h1>ATUtility</h1>
This is a utility package for node js, the goal is to gather useful functions and utilities for developing backend and node js application in one place.
<br>
<h2>How to install using npm</h2>

```

npm install atutility

```

<h2>How to use ?</h2>


```

const ATUtility = require('atutility')

//log a text to a file with timestamp
ATUtility.log("I'll create a log folder for you and log this string with a timestamp")

//The log function by default also console logs every input, you can disable or enable this feature any time using the following functions
ATUtility.enableConsoleLog()
ATUtility.disableConsoleLog()

//get the absolute path of a relative path
ATUtility.getWorkingDirectoryPath("/A/Relative/Path/To/Working/Directory")

//convert an array of objects to an array of keyless result set that keep their order.
getKeylessResultSet(arrayOfObject)

//Capitalize the first letter of an string
//capitalizeFirstLetter('apple')

//Check to see if a JSON string is valid and parsable
isStringifiedJSONValid(str)

```
