# warp-run-server

Warp Run is an MMO browser-based game based around travelling between star systems and trading resources.

This is the REST API of the application. The client side is https://github.com/Michal-Delikat/warp-run-client

## Tech Stack

- **Runtime**: Node.js v24.19.0
- **Language**: TypeScript
- **Framework**: Express
- **Database**: PostgreSQL via Supabase
- **ORM**: Drizzle
- **Testing**: Vitest, Supertest

## Getting Started

### Prerequisites

- Node.js v24.19.0
- Docker (required for Testcontainers to run the test suite)

### Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Create a `.env` file with your `DATABASE_URL` (pointing to a Supabase instance) and other environment variables as stated in .env.example.
4. Use `npm run dev` to start the server.

### Scripts

- `npm run dev`: Runs the server in development mode with watch (`src/index.ts`).
- `npm run build`: Compiles the TypeScript codebase to `dist/`.
- `npm run start`: Runs the compiled server (`dist/index.js`).
- `npm run typecheck`: Validates TypeScript types without compiling.
- `npm run test`: Runs the test suite in isolated mode (full DB lifecycle).
- `npm run test:watch`: Runs tests in watch mode.

## License

Copyright (c) 2026 Michał Delikat. All rights reserved.
This code is not licensed for reuse, modification, or distribution.