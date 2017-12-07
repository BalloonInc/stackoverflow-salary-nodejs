# stackoverflow-salary-nodejs
starter code to expose the Stack Overflow surveys as a web API

## Insert the .csv Survey file in a Mongo Database

a bash script is provided (init_db.sh). This file runs:

```bash
mongoimport --host=127.0.0.1 -d stackoverflowsurveydatabase -c stackoverflowsurvey --type csv --file assets/survey_results_public.csv --headerline 
```

## Install the dependencies

run

```bash
nmp install
```

## Start the application

Nodemon is used to have live-reload

```bash
nodemon index.js
```

## Use the application

e.g. with curl

```bash
curl get http://localhost:8080/api/salary/belgium
```

The response should be

```json
[
    {
        "_id":"Belgium",
        "average":39908.81720430106
    }
]
```
