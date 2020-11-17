# INFT2002 - Gruppe 2

A small application for Quizzes

## Setup database connections

You need to create two configuration files that will contain the database connection details:

1. Copy the file `server/src/config.js.example` to `server/src/config.js` and set
   `process.env.MYSQL_PASSWORD` to the correct password.
2. Do the same for `server/test/config.js.example`.

The config files that you make should not be included in the git repository as they contain secrets,
they should be in your .gitignore file.

## Start server

Install dependencies and start server:

```sh
cd server
npm install
npm start
```

### Run server tests:

```sh
npm test
```

## Bundle client files to be served through server

Install dependencies and bundle client files:

```sh
cd client
npm install
npm start
```

### Run client tests:

```sh
npm test
```

### Run the quiz:

Run the quizapp in your browser at:

http://localhost:3000/
