[![CodeFactor](https://www.codefactor.io/repository/github/paulohrodrigues/api-test/badge)](https://www.codefactor.io/repository/github/paulohrodrigues/api-test)
[![tests](https://github.com/paulohrodrigues/api-test/workflows/tests/badge.svg?branch=main)](https://github.com/paulohrodrigues/api-test/actions)


# API TEST - PARKING

Technologies:

- ORM ([Mongoose](https://mongoosejs.com))
- Tests ([Mocha](https://mochajs.org) and [Super Test](https://github.com/visionmedia/supertest))
- API Documentation ([apidoc](https://apidocjs.com))
- Babel ([Babel](https://babeljs.io))

# Getting started

## Configure and understand your project

### Environment settings
You will need a `.env` file. In this file, you put all your sensitive and environment info.

Note: You can just make a copy of `.env.example` and name it as `.env`

**Is recommended to not commit the `.env` file.**

### Endpoints:

    POST /parking - Input
    PATCH /parking/:id/out - Out
    PATCH /parking/:id/pay - payment
    GET /parking/:plate - Historic

#### [Complete Documentation](https://paulohrodrigues.github.io/api-test)

## Documentation

API comes with [apidoc](https://apidocjs.com). Run `npm run doc` to generate de doc on `/doc` folder.

Consider consulting the [apidoc documentation](https://apidocjs.com/#getting-started) to learn more.

## Install your node dependencies

    npm install

## Running

    npm start
    
## Test
    
    npm run test
