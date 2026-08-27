export interface StarSystem {
  orbitalDistance: number;
  orbitalAngle: number;
}

export interface Planet {
  id: string;
  orbitalAngle: number;
  orbitalDistance: number;
  orbitalParentId: string | null;
}