# faculty-api-nodejs

> Faculty Review API

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

## About

This is a RESTful API for the Faculty Review application.

## Tech Stack

- [NodeJS](https://nodejs.org/)
- [FeathersJS](https://feathersjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/)

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Clone this repository and install its dependencies:

```bash
git clone https://github.com/iot-lab-kiit/faculty-api-nodejs
```

```bash
cd faculty-api-nodejs
```

```bash
yarn
```

3. Configure environment variables:

Add mongoDB connection string. Check [.env.example](.env.example) for reference.

4. Add firebase service account

Add firebase service account configs in the `src/service.json`. Check [service.json.example](service.json.example) for reference.

5. Start your app locally:

```bash
yarn local
```