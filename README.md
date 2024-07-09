## ProBooker

First, run the development server

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.(Right now only index.tsx is the only page that should run)

<<<<<<< Updated upstream
The homepage is located in /pages/index.tsx and currently shows a header and form for a consumer user to log in.

Testing with Jest:
```bash
npm test
```
## DEVELOPMENT INFORMATION
If you are making changes to the project be careful moving already existing directories.If you re-organize files and directories Run npm test and npm run dev to backtrack and find which files need their paths updated!

## Data files and Database
app/lib/appwrite.js has the API endpoint and projectID to communicate with the appwrite website

services/dbOperations.js  has the databaseID and multiple collectionID's
there are functions in there that allow for C.R.U.D functionality

pages/api/ and pages/api/providers have files that call from dbOperations.js

Appwrite keeps its information organized in the following hierarchy
Projects-> Databases -> Collections -> Documents -> Attributes 







 
=======
The homepage is located in /pages/index.tsx 


The appwrite connection details are specified in ./app
>>>>>>> Stashed changes
