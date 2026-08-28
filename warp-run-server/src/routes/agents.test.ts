import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.ts";
import { db } from "../db/index.ts";
import { players, planets, agents, starSystems } from "../db/schema.ts";
import jwt from "jsonwebtoken";

describe("GET /me/agents", () => {
  it("should return the player's agents", async () => {
    const [player] = await db.insert(players).values({
      email: "test@example.com",
      username: "testuser",
      passwordHash: "hash",
    }).returning();

    const [system] = await db.insert(starSystems).values({
      name: "Test System",
      orbitalDistance: 0,
      orbitalAngle: 0,
    }).returning();

    const [planet] = await db.insert(planets).values({
      name: "Test Planet",
      starSystemId: system.id,
      orbitalDistance: 10,
      orbitalAngle: 0,
    }).returning();

    await db.insert(agents).values({
      playerId: player.id,
      planetId: planet.id,
      name: "Test Agent",
    });

    const token = jwt.sign({ playerId: player.id }, process.env.JWT_SECRET!);

    const response = await request(app)
      .get("/me/agents")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toMatchObject({
      name: "Test Agent",
      planet: {
        name: "Test Planet",
      },
    });
  });

  it("should return 401 if no token is provided", async () => {
    const response = await request(app).get("/me/agents");
    expect(response.status).toBe(401);
  });
});
