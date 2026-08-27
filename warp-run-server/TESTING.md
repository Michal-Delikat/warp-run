# Testing Guide

This project uses **Vitest**, **Drizzle ORM**, and **Docker** for its testing suite.

## Test Flow

Tests run in **Isolated Mode**. This provides a completely isolated environment for every run to ensure consistency and reliability.

- **Workflow**: Start Docker container -> Sync Schema -> Run Tests -> Stop Docker container.
- **Use Case**: All test executions.
- **Command**: `npm run test`

---

## Database Management

The test suite automatically manages the database lifecycle using `testcontainers`. No manual database setup is required for running tests.

---

## Implementation Details (for AI Agents)

### Lifecycle & State
- **Infrastructure**: `vitest.global-setup.ts` manages the Docker container lifecycle and schema synchronization.
- **State Reset**: `vitest.setup.ts` contains a `beforeEach` hook that dynamically fetches all public tables and performs a `TRUNCATE ... RESTART IDENTITY CASCADE`. This ensures every test starts with a clean database.

### Testing Conventions
- **Floating Point Math**: When testing coordinates or orbital mechanics, **do not** use `.toEqual()` or `.toBe()`. Use `.toBeCloseTo(expected, precision)` to avoid precision errors.
- **API Testing**: Use `supertest` for integration tests to simulate HTTP requests without needing a live network port.
