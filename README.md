# Serverless Sub Routing POC

This project is a Node.js application utilising routing-controllers for route management, a Service Layer for business logic, and a Repository Pattern for database interactions, specifically with DynamoDB.

```
serverless-sub-routing /
│
├── src/
│   ├── proxy/
│   │   ├── resources/      # HTTP routing
│   │   │    └── UserResource.ts
│   │   ├── services/       # Business logic implementation
│   │   │    └── UserService.ts
│   │   ├── providers/
│   │   │    └── UserProvider.ts
│   │   └── middleware/
│   │        └── BeforeMiddleware.ts
│   │        └── CustomErrorMiddleware.ts
│   │        └── NotFoundMiddleware.ts
│   │
│   └── functions/
│       └── getUser/
│         └── resource.ts
│
├── package.json
├── tsconfig.json
└── README.md

```

## Prerequisites

- Node.js
- npm

## Getting started

1. `npm i` - Installs dependencies
2. `npm run setup` - Installs Serverless DynamoDB local
3. `npm run start` - Starts Serverless offline

###### `npm run package` - Packages the project and outputs to `/artifacts/*.zip`

# Architecture

### Dependency Injection

We use Dependency Injection (DI) for managing dependencies between classes, making the application modular and testable.

## Using an API Gateway Proxy

### Resources

Resources in `src/proxy/resources` handle incoming HTTP requests and delegate complex business logic to the services. They are responsible for responding to the client.

### Services

The `src/proxy/services` directory contains service classes. Services encapsulate the core business logic of the application. They interact with the repository layer to fetch and manipulate data.

### Providers

Providers in `src/proxy/providers` are responsible for direct database interactions. They abstract the data layer, making it easier to manage data operations.

### Middleware

Middleware in `src/proxy/middleware` is used to handle errors and other request/response operations. They are useful to hooking into parts of the lambda invocation.

## Lambda Functions

Functions not using an API Gateway Proxy are in `src/functions`. They are responsible for handling the event and context passed to the lambda function.

## Tests

### Unit Tests
Tests are written using Jest and can be found in the `tests` directory.

The `unit/` folder should mimic the `src/` directory.
