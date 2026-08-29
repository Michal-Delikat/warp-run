import { useQuery } from "@tanstack/react-query";
import api from '../../api/api';
import type { TradeOptionModel } from "../types";
import type { AgentModel } from "./types";

interface AgentProps {
    agentData: AgentModel;
}

function Agent({ agentData }: AgentProps) {
    const { data: marketData } = useQuery({
        queryKey: ['planet-market', agentData.planet.id],
        queryFn: async () => {
            const response = await api.get(`/planets/${agentData.planet.id}/market`);
            return response.data;
        }
    })

    return (
        <>
            <h3>{agentData.name} stationed on {agentData.planet.name}</h3>
            <h4>Trade options</h4>
            <ul>
                {marketData?.map((tradeOption: TradeOptionModel) => {
                    return (
                        <li key={tradeOption.id}>
                            <p>{tradeOption.resource.name}: {tradeOption.price} $</p>
                        </li>
                    );
                })}
            </ul>
        </>
    )
}

export default Agent;