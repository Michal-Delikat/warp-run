import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import type { TradeOptionModel } from "../types";
import type { AgentModel } from "./types";

interface AgentProps {
    agentData: AgentModel;
}

function Agent({ agentData }: AgentProps) {
    const { token } = useAuth();
    const { data: marketData } = useQuery({
        queryKey: ['planet-market', agentData.planet.id],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:3000/planets/${agentData.planet.id}/market`,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            return response.data;
        },
        enabled: !!token
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