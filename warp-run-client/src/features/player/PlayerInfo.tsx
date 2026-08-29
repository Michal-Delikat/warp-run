import { usePlayer } from "../../context/PlayerContext";
import LogOutButton from "./LogOutButton";

function PlayerInfo() {
    const { player, isLoading } = usePlayer();

    if (isLoading) {
        return (
            <p>Player info loading</p>
        );
    }

    return (
        <div className="player-info-wrapper">
            <p className="player-username">{player!.username}</p>
            <p className="player-cash">{player!.cash}$</p>
            <LogOutButton></LogOutButton>
        </div>
    );
}

export default PlayerInfo;