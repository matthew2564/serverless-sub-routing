# Serverless Sub Routing POC

This project is a Node.js application utilising routing-controllers for route management, a Service Layer for business logic, and a Repository Pattern for database interactions, specifically with DynamoDB.

```
serverless-sub-routing /
│
├── src/
│   ├── resources/       # HTTP routing
│   │   └── UserResource.ts
│   │
│   ├── middleware/       # HTTP route error handling
│   │   └── NotFoundMiddleware.ts
│   │
│   ├── services/          # Business logic implementation
│   │   └── UserService.ts
│   │
│   ├── providers/      # Database interaction layer
│   │   └── UserProvider.ts
│   │
│   └── index.ts           # Application entry point
│
├── package.json
├── tsconfig.json
└── README.md

```

## Prerequisites

- Node.js
- npm

# Architecture

### Resources

Resources in `src/resources` handle incoming HTTP requests and delegate complex business logic to the services. They are responsible for responding to the client.

### Services

The `src/services` directory contains service classes. Services encapsulate the core business logic of the application. They interact with the repository layer to fetch and manipulate data.

### Providers

Providers in `src/providers` are responsible for direct database interactions. They abstract the data layer, making it easier to manage data operations.

### Dependency Injection

We use Dependency Injection (DI) for managing dependencies between classes, making the application more modular and testable.
