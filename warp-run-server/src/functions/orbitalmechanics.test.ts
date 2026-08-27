import { describe, it, expect } from "vitest";
import { getSystemGlobalPosition } from "./orbitalMechanics.ts";

describe("getSystemGlobalPosition", () => {
  const dist = 100;

  it("returns orbital distance along the x-axis at angle 0", () => {
    expect(getSystemGlobalPosition({ orbitalDistance: dist, orbitalAngle: 0 })).toEqual({
      x: dist,
      y: 0,
    });
  });

  it("returns orbital distance along the x-axis at angle 180", () => {
    const result = getSystemGlobalPosition({ orbitalDistance: dist, orbitalAngle: 180 });
    expect(result.x).toEqual(-dist);
    expect(result.y).toBeCloseTo(0, 5);
  });
  
});
