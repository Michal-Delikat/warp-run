import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api.ts";
import type { TradeOptionModel } from "../types";
import type { CargoItemModel } from "./types";
import type { PlayerModel } from "../player/types.ts";

interface TradeControlProps {
    currentPlanetId: string | undefined;
    shipId: string;
    cargo: CargoItemModel[];
    cargoCapacity: number;
}

function TradeControls({ currentPlanetId, shipId, cargo, cargoCapacity }: TradeControlProps) {
    const queryClient = useQueryClient();

    const { data: playerData } = useQuery<PlayerModel>({
        queryKey: ['me'],
        queryFn: async () => {
            const response = await api.get('/me');
            return response.data;
        }
    });

    const { data: marketData } = useQuery({
        queryKey: ['planet-market', currentPlanetId],
        queryFn: async () => {
            const response = await api.get(`/planets/${currentPlanetId}/market`);
            return response.data;
        },
        enabled: !!currentPlanetId,
    });

    const buyMutation = useMutation({
        mutationFn: async ({resourceId, quantity}: { resourceId: string; quantity: number }) => {
            const response = await api.post(
                `/planets/${currentPlanetId}/market/buy`,
                { resourceId, quantity, shipId },
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me']});
            queryClient.invalidateQueries({ queryKey: ['me/ships']});
            queryClient.invalidateQueries({ queryKey: ['planet-market', currentPlanetId]});
        },
    });

    const sellMutation = useMutation({
        mutationFn: async ({resourceId, quantity}: { resourceId: string, quantity: number }) => {
            const response = await api.post(
                `/planets/${currentPlanetId}/market/sell`,
                { resourceId, quantity, shipId },
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me']});
            queryClient.invalidateQueries({ queryKey: ['me/ships']});
            queryClient.invalidateQueries({ queryKey: ['planet-market', currentPlanetId]});
        },
    });

    const usedCargo = cargo.reduce((sum, item) => sum + item.quantity, 0);
    const freeCargo = cargoCapacity - usedCargo;

    return (
        <>
            <h4>Trade options</h4>
            <ul>
                {marketData?.map((tradeOption: TradeOptionModel) => {
                    const ownedQuantity = cargo.find(cargoItem => cargoItem.resource.id === tradeOption.resource.id)?.quantity ?? 0;
                    const canBuy = 
                        (playerData?.cash ?? 0) >= tradeOption.price * 5 &&
                        tradeOption.stock >= 5 &&
                        freeCargo >= 5;

                    const canSell = ownedQuantity >= 5;

                    return (
                        <li key={tradeOption.id}>
                            <p>{tradeOption.resource.name}: {tradeOption.price} $</p>
                            <button onClick={() => buyMutation.mutate({ resourceId: tradeOption.resource.id, quantity: 5 })} disabled={!canBuy}>Buy 5</button>
                            <button onClick={() => sellMutation.mutate({ resourceId: tradeOption.resource.id, quantity: 5 })} disabled={!canSell}>Sell 5</button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default TradeControls;
