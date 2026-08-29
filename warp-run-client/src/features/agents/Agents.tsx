import { useQuery } from '@tanstack/react-query';
import api from '../../api/api';
import type { AgentModel } from './types';
import Agent from "./Agent"; 

function Agents() {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['me/agents'],
        queryFn: async () => {
            const meAgentsResponse = await api.get('/me/agents');
            return meAgentsResponse.data;
        }
    });

    if (isPending) return <p>Player agents loading...</p>;
    if (isError) return <p>Error occured: {error.message}</p>;

    return (
        <>
            <h2>Agents</h2>
            <ul>
                {data.map((agent: AgentModel) => {
                    return <li key={agent.id}><Agent agentData={agent}/></li>
                })}
            </ul>
        </>
    );
}

export default Agents;