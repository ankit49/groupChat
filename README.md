# Group Chat Application

This is a Group Chat Application developed using NodeJS, ExpressJs, MongoDb, ReactJs, Redux, Redux-Saga, and Material UI.

## Prerequisites

- Ensure that MongoDB server is running on port `27017`.

## Getting Started

To run the application, follow these steps:

1. Navigate to the `client` and `server` directories and run `npm install` to install the necessary dependencies.

2. In the `server` directory, run the following command to start the application:
   ```
   npm run dev
   ```

   This will concurrently start the server and the client.

3. To run the API test cases, execute the following command in the `server` directory:
   ```
   npm run test
   ```

## Technologies Used

- NodeJS
- ExpressJs
- MongoDb
- ReactJs
- Redux
- Redux-Saga
- Material UI

## Project Structure

- `client`: Contains the front-end code for the application.
- `server`: Contains the back-end code including API endpoints and database configurations.

## Directory Structure

```
project-root
│
├── client
│   ├── public
│   ├── src
│   │   ├── actions
│   │   ├── assets
│   │   ├── components
│   │   ├── containers
│   │   ├── helpers
│   │   ├── reducers
│   │   ├── sagas
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   └── ...
│
└── server
    ├── controllers
    ├── handlers
    ├── helper
    ├── models
    ├── routes
    ├── tests
    ├── server.js
    └── ...
```
