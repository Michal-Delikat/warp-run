import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import LogOutButton from "./LogOutButton";

function PlayerInfo() {
    const { data, isPending, isError, error } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const meResponse = await api.get('/me');
            return meResponse.data;
        }
    });

    if (isPending) return <p>Player info loading...</p>;
    if (isError) return <p>Error occured: {error.message}</p>;

    return (
        <div className="player-info-wrapper">
            <p className="player-username">{data.username}</p>
            <p className="player-cash">{data.cash}$</p>
            <LogOutButton></LogOutButton>
        </div>
    );
}

export default PlayerInfo;