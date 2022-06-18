# Scoring: CRUD API

## Basic Scope

- **+10** The repository with the application contains a `Readme.md` file containing detailed instructions for installing, running and using the application
- **+10** **GET** `api/user` implemented properly
- **+10** **GET** `api/user/${userId}` implemented properly
- **+10** **POST** `api/user` implemented properly
- **+10** **PUT** `api/user/{userId}` implemented properly
- **+10** **DELETE** `api/user/${userId}` implemented properly
- **+6** Users are stored in the form described in the technical requirements
- **+6** Value of `port` on which application is running is stored in `.env` file

## Advanced Scope
- **+30** Task implemented on Typescript 
- **+10** Processing of requests to non-existing endpoints implemented properly
- **+10** Errors on the server side that occur during the processing of a request should be handled and processed properly
- **+10** Development mode: `npm` script `start:dev` implemented properly
- **+10** Production mode: `npm` script `start:prod` implemented properly

## Hacker Scope
- **+30** There are tests for API (not less than **3** scenarios)
- **+30** There is horizontal scaling for application with a **load balancer**

## Forfeits

- **-95% of total task score** any external tools except `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing
- **-30% of total task score** Commits after deadline (except commits that affect only Readme.md, .gitignore, etc.)
- **-20** Missing PR or its description is incorrect
- **-20** No separate development branch
- **-20** Less than 3 commits in the development branch, not including commits that make changes only to `Readme.md` or similar files (`tsconfig.json`, `.gitignore`, `.prettierrc.json`, etc.)


# Assignment: CRUD API

## Description

Your task is to implement simple CRUD API using in-memory database underneath.

## Technical requirements

- Task can be implemented on Javascript or Typescript
- Only `nodemon`, `dotenv`, `cross-env`, `typescript`, `ts-node`, `eslint` and its plugins, `webpack-cli`, `webpack` and its plugins, `prettier`, `uuid`, `@types/*` as well as libraries used for testing are allowed
- Use 16 LTS version of Node.js
- Prefer asynchronous API whenever possible

## Implementation details

1. Implemented endpoint `api/users`:
    - **GET** `api/users` is used to get all persons
        - Server should answer with `status code` **200** and all users records
    - **GET** `api/users/${userId}` 
        - Server should answer with `status code` **200** and and record with `id === userId` if it exists
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **POST** `api/users` is used to create record about new user and store it in database
        - Server should answer with `status code` **201** and newly created record
        - Server should answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    - **PUT** `api/users/{userId}` is used to update existing user
        - Server should answer with` status code` **200** and updated record
        - Server should answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    - **DELETE** `api/users/${userId}` is used to delete existing user from database
        - Server should answer with `status code` **204** if the record is found and deleted
        - Server should answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
        - Server should answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
2. Users are stored as `objects` that have following properties:
    - `id` — unique identifier (`string`, `uuid`) generated on server side
    - `username` — user's name (`string`, **required**)
    - `age` — user's age (`number`, **required**)
    - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)
3. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) should be handled (server should answer with `status code` **404** and corresponding human-friendly message)
4. Errors on the server side that occur during the processing of a request should be handled and processed correctly (server should answer with `status code` **500** and corresponding human-friendly message)
5. Value of `port` on which application is running should be stored in `.env` file
6. There should be 2 modes of running application (**development** and **production**):
    - The application is run in development mode using `nodemon` (there is a `npm` script `start:dev`)
    - The application is run in production mode (there is a `npm` script `start:prod` that starts the build process and then runs the bundled file)
7. There could be some tests for API (not less than **3** scenarios). Example of test scenario:
    1. Get all records with a `GET` `api/users` request (an empty array is expected)
    2. A new object is created by a `POST` `api/users` request (a response containing newly created record is expected)
    3. With a `GET` `api/user/{userId}` request, we try to get the created  record by its `id` (the created record is expected)
    4. We try to update the created record with a `PUT` `api/users/{userId}`request (a response is expected containing an updated object with the same `id`)
    5. With a `DELETE` `api/users/{userId}` request, we delete the created object by `id` (confirmation of successful deletion is expected)
    6. With a `GET` `api/users/{userId}` request, we are trying to get a deleted object by `id` (expected answer is that there is no such object)
8. There could be implemented horizontal scaling for application (there is a `npm` script `start:multi` that starts multiple instances of your application using the Node.js `Cluster` API (equal to the number of logical processor cores on the host machine) with a **load balancer** that distributes requests across them)