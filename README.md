# Serverless Sub Routing POC

This project is a Node.js application utilising routing-controllers for route management, a Service Layer for business logic, and a Repository Pattern for database interactions, specifically with DynamoDB.

```
serverless-sub-routing /
│
├── src/
│   ├── controllers/       # HTTP routing
│   │   └── UserController.ts
│   │
│   ├── middleware/       # HTTP route error handling
│   │   └── NotFoundMiddleware.ts
│   │
│   ├── services/          # Business logic implementation
│   │   └── UserService.ts
│   │
│   ├── repositories/      # Database interaction layer
│   │   └── UserRepository.ts
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

### Controllers

Controllers in `src/controllers` handle incoming HTTP requests and delegate complex business logic to the services. They are responsible for responding to the client.

### Services

The `src/services` directory contains service classes. Services encapsulate the core business logic of the application. They interact with the repository layer to fetch and manipulate data.

### Repositories

Repositories in `src/repositories` are responsible for direct database interactions. They abstract the data layer, making it easier to manage data operations.

### Dependency Injection

We use Dependency Injection (DI) for managing dependencies between classes, making the application more modular and testable.
