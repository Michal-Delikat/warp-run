export interface CargoItemModel {
    id: string;
    quantity: number;
    resource: {
        id: string;
        name: string;
    }
}

export interface ShipModel {
    id: string;
    name: string;
    currentPlanet: { id: string; name: string; } | null;
    departurePlanet: { name: string } | null;
    destinationPlanet: { name: string } | null;
    arrivalAt: string | null;
    fuel: number;
    cargoCapacity: number;
    cargo: Array<CargoItemModel>;
}

