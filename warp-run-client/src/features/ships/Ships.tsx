import { useQuery } from '@tanstack/react-query';
import api from "../../api/api.ts";
import type { ShipData } from './types';
import Ship from "./Ship.tsx"; 

function Ships() {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['me/ships'],
        queryFn: async () => {
            const meShipsResponse = await api.get('/me/ships');
            return meShipsResponse.data;
        }
    });

    if (isPending) return <p>Player ships loading...</p>;
    if (isError) return <p>Error occured: {error.message}</p>;

    return (
        <>
            <h2>Ships</h2>
            <ul>
                {data.map((ship: ShipData) => {
                    return <li key={ship.id}><Ship shipData={ship}/></li>
                })}
            </ul>
        </>
    );
}

export default Ships;