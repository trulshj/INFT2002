# INFT2002

A small application for Quizzes

## Setup database connections

You need to create two configuration files that will contain the database connection details. These
files should not be uploaded to your git repository, and they have therefore been added to
`.gitignore`. For this project we have simplifyed this procedure and created the file:
`server/src/config.js.example` and `server/test/config.js.example`.

Follow this steps: We have created the file `config.js.example`. Create a new file in
`server/src/config.js`, and name it `config.js` and copy over all the information from
`server/src/config.js.example` to the new file you created: `config.js`. Change
process.env.MYSQL_PASSWORD = 'secret'; Change 'secret' and add the correct password. Do the same
procedure in `server/test/config.js`.

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

Run the quiz in your browser at:

http://localhost:3000/
