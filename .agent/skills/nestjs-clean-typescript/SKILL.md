---
name: nestjs-ddd-backend
description: Backend server development with NestJS and TypeScript using Clean Architecture, Domain-Driven Design, explicit use cases, rich domain models, and disciplined infrastructure boundaries.
---

# NestJS DDD Backend

Guidelines for developing backend servers with NestJS and TypeScript using Clean Architecture and Domain-Driven Design. These rules prioritize domain modeling, business use cases, architectural boundaries, maintainability, and framework-independent core logic.

## Architectural Priorities

- Design the system around business domains and bounded contexts
- Prefer Clean Architecture dependency flow: presentation -> application -> domain <- infrastructure
- Keep the domain layer independent from NestJS, ORM, HTTP, and external services
- Model business behavior explicitly instead of organizing code around CRUD only
- Favor maintainability, testability, and explicit boundaries over rapid but leaky abstractions

## TypeScript General Principles

- Always declare explicit types for public APIs, function parameters, and return values
- Avoid using any; define proper domain, application, and transport types
- Prefer type aliases and interfaces where they clarify intent and boundaries
- Use readonly and immutable patterns where possible
- Represent constrained values with union types, value objects, or enums when appropriate
- Keep types close to the layer they belong to; do not reuse transport types as domain types
- One export per file when it improves clarity and discoverability

## Naming Conventions

- PascalCase for classes, interfaces, entities, value objects, use cases, and repositories
- camelCase for variables, functions, and methods
- kebab-case for files and directories
- UPPERCASE for environment variables
- Boolean variables should use prefixes such as is, has, can, should
- Use explicit names based on business intent, such as CreateShipmentUseCase, ShipmentRepository, ShipmentStatus

## Module and Folder Organization

- Organize modules by bounded context, not by route-first or technical-first structure
- Structure each module into:
  - presentation
  - application
  - domain
  - infrastructure
- Keep shared technical concerns in shared, common, or infrastructure modules
- Avoid mixing controllers, ORM schemas, and domain entities in the same folder

## Domain Layer Rules

- Put core business rules in entities, value objects, domain services, and domain events
- Keep domain entities behavior-rich; avoid anemic domain models
- Use value objects for validated concepts such as email, money, weight, status, code, and identifiers when useful
- Protect invariants inside domain methods instead of duplicating rules in controllers or repositories
- Use factories or static creation methods for complex aggregate creation
- Define repository contracts in the domain layer or at the application-domain boundary
- Do not import NestJS decorators, Prisma types, or HTTP DTOs into the domain layer

## Application Layer Rules

- Prefer one use case per business action over one service per entity
- Each use case should have a single clear responsibility
- Use use cases to orchestrate domain objects, repositories, transactions, and side effects
- Keep application services thin; they coordinate but should not hold core domain rules
- Use command-style inputs and explicit result objects when helpful
- Validate existence, permissions, and orchestration concerns in use cases, while keeping business invariants inside the domain model

## Presentation Layer Rules

- Keep controllers thin and focused on transport concerns
- Use DTOs only at the presentation boundary
- Validate request DTOs with class-validator
- Map DTOs to application input models explicitly
- Never expose domain entities directly as HTTP responses
- Use response models or presenters when response shaping differs from domain representation
- Keep exception mapping, serialization, and transport formatting out of the domain layer

## Infrastructure Layer Rules

- Treat Prisma as a persistence tool, not as the domain model
- Implement repository interfaces in infrastructure
- Map explicitly between persistence models and domain entities
- Isolate external integrations such as queues, email, cache, storage, and third-party APIs behind ports/adapters
- Keep ORM-specific query logic out of controllers and domain entities
- Centralize environment access, logging adapters, and external clients in infrastructure

## Function and Class Design

- Write small functions with one purpose
- Prefer early returns to reduce nesting
- Use object arguments when a function requires many parameters
- Keep classes focused and cohesive
- Avoid god services, god modules, and massive utility files
- Prefer explicit collaborators over hidden shared state

## Error Handling and Cross-Cutting Concerns

- Model expected business failures explicitly
- Use domain-specific exceptions or result patterns for business rule violations
- Use global filters, interceptors, guards, pipes, and middlewares in shared/common/infrastructure modules
- Keep authentication, authorization, validation, logging, and tracing outside the domain layer
- Standardize API error responses at the presentation layer

## Testing Strategy

- Prioritize unit tests for domain entities, value objects, and use cases
- Test business rules without requiring NestJS testing utilities when possible
- Use integration tests for repositories, database mappings, and infrastructure adapters
- Use end-to-end tests for critical HTTP flows
- Mock ports/interfaces at architectural boundaries, not internal domain behavior
- Test invariants, edge cases, and failure paths, not only happy paths

## Recommended Backend Practices

- Prefer aggregate-oriented writes and query-oriented reads when useful
- Keep transactions close to the application use case boundary
- Use pagination, filtering, and sorting contracts explicitly in query use cases
- Separate write models from read models when complexity justifies it
- Use domain events for cross-aggregate workflows and side effects
- Avoid premature microservices; start with a modular monolith unless clear constraints demand otherwise

## Anti-Patterns to Avoid

- One service per entity
- Fat controllers
- Anemic entities with all logic pushed into services
- Direct controller-to-repository coupling
- Reusing Prisma models as domain entities
- Sharing DTOs across presentation, application, and domain layers
- Leaking framework concerns into the domain model
- Building modules around routes instead of business capabilities
