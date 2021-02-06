# BackendAssignment

Used Node.js Express framework for writing API endpoints.

After cloning the project, first run 'npm install' command to install all the dependencies. After the installation completes, use the following command to run the project.

npm start

The app will start running at http://localhost:3000
and the app will be connected to the mongodb database (mongodb atlas).

Web server with 2 endpoints.

A. /process/*

This endpoint will accept HTTP request and send response with a JSON describing the request (after some random seconds, between 15 to 30 seconds). The returned JSON is also stored in the mongodb database.

  1. GET http://localhost:3000/process

The response received from the server -

{
  "status": "success",
  "data": {
            "_id": "601e9ebacd31e37030d7e910",
            "date": "2021-02-06T13:50:32.316Z",
            "method": "GET",
            "headers": {
                         "host": "localhost:3000",
                         "connection": "keep-alive",
                         "postman-token": "e89a975a-c828-0f19-367b-1d095f8bedb0",
                         "cache-control": "no-cache",
                         "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36",
                         "content-type": "application/json",
                         "accept": "_/\_",
                         "sec-fetch-site": "none",
                         "sec-fetch-mode": "cors",
                         "sec-fetch-dest": "empty",
                         "accept-encoding": "gzip, deflate, br",
                         "accept-language": "en-US,en;q=0.9"
                       },
            "path": "/process",
            "duration": 18430
        }
}

  Similarly tried the following requests -

  2. POST http://localhost:3000/process
  3. PUT http://localhost:3000/process
  4. DELETE http://localhost:3000/process
  5. GET http://localhost:3000/process?\_sort=duration

   To check if the returned JSON data is stored in the database, added another endpoint to display the json documents of the database.

   endpoint - GET http://localhost:3000/response-json => it will display all the json documents stored in the database.

B. /stats

To display the statistics of the json documents.

  1. GET http://localhost:3000/stats

  {
    "status": "success",
    "data": [
              {
                  "_id": "PUT",
                  "numOfRequests": 2,
                  "avgResponseTime": 23601.5
              },
              {
                  "_id": "POST",
                  "numOfRequests": 6,
                  "avgResponseTime": 14824.666666666666
              },
              {
                  "_id": "GET",
                  "numOfRequests": 6,
                  "avgResponseTime": 18600
              },
              {
                  "_id": "DELETE",
                  "numOfRequests": 4,
                  "avgResponseTime": 24238.5
              }
            ]
  }

Also added support for toDate and fromDate filter. Based on the value of date provided in gte and lte, the result will greater and less than the values provided.

2. GET http://localhost:3000/stats?date[gte]=01/10/2020&date[lte]=2021-02-4 22:30

  {
      "status": "success",
      "data": [
                  {
                      "_id": "GET",
                      "numOfRequests": 3,
                      "avgResponseTime": 15842.666666666666
                  },
                  {
                      "_id": "DELETE",
                      "numOfRequests": 4,
                      "avgResponseTime": 24238.5
                  },
                  {
                      "_id": "PUT",
                      "numOfRequests": 1,
                      "avgResponseTime": 28183
                  },
                  {
                      "_id": "POST",
                      "numOfRequests": 6,
                      "avgResponseTime": 14824.666666666666
                  }
              ]
  }
