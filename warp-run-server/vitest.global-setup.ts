import { PostgreSqlContainer } from "@testcontainers/postgresql";
import type { StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "node:child_process";

let container: StartedPostgreSqlContainer;

export async function setup() {
  container = await new PostgreSqlContainer("postgres:17-alpine")
    .withDatabase("warprun_test")
    .withUsername("warprun")
    .withPassword("warprun")
    .start();

  const connectionUri = container.getConnectionUri();
  process.env.DATABASE_URL = connectionUri;

  try {
    execSync("npx drizzle-kit push", {
      env: { ...process.env, DATABASE_URL: connectionUri },
      stdio: "pipe",
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Database sync failed:", error.message);
    } else {
      console.error("Database sync failed:", error);
    }
    throw error;
  }
}

export async function teardown() {
  if (container) await container.stop();
}