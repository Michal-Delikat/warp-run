import type { StarSystem, Planet } from "../types/bodies.ts";

export function getSystemGlobalPosition(system: StarSystem) {
  const angleRad = (system.orbitalAngle * Math.PI) / 180;
  return {
    x: system.orbitalDistance * Math.cos(angleRad),
    y: system.orbitalDistance * Math.sin(angleRad),
  };
}

export function getPlanetGlobalPosition(planet: Planet, allPlanets: Planet[], system: StarSystem): { x: number; y: number } {
  const angleRad = (planet.orbitalAngle * Math.PI) / 180;

  const parentPosition = planet.orbitalParentId
    ? getPlanetGlobalPosition(
        allPlanets.find(p => p.id === planet.orbitalParentId)!,
        allPlanets,
        system
      )
    : getSystemGlobalPosition(system);

  return {
    x: parentPosition.x + planet.orbitalDistance * Math.cos(angleRad),
    y: parentPosition.y + planet.orbitalDistance * Math.sin(angleRad),
  };
}

export function distanceBetweenPlanets(
  planetA: Planet, 
  planetB: Planet, 
  allPlanets: Planet[], 
  systemA: StarSystem, 
  systemB: StarSystem
): number {
  const posA = getPlanetGlobalPosition(planetA, allPlanets, systemA);
  const posB = getPlanetGlobalPosition(planetB, allPlanets, systemB);

  return Math.sqrt(
    Math.pow(posB.x - posA.x, 2) + 
    Math.pow(posB.y - posA.y, 2)
  );
}