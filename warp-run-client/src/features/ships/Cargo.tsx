import type { CargoItemModel } from "./types";

interface CargoProps {
    cargo: Array<CargoItemModel>;
    cargoCapacity: number;
}

function Cargo({ cargo, cargoCapacity }: CargoProps) {

    return (
        <>
            <h4>Cargo</h4>
            <p>Max cargo capacity: {cargoCapacity}</p>
            <ul>
                {cargo.map((cargoItem: CargoItemModel) => <li key={cargoItem.id}>{cargoItem.quantity} {cargoItem.resource.name}</li>)}
            </ul>
        </>
    );
}

export default Cargo;