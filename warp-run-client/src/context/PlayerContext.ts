import { createContext, useContext } from "react";
import type { PlayerModel } from "../features/player/types";

type PlayerContextModel = {
    player: PlayerModel | null;
    isLoading: boolean;
}

export const PlayerContext = createContext<PlayerContextModel | undefined>(undefined);

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
    throw new Error("usePlayer must be used inside PlayerProvider");
  }
  return context;
}