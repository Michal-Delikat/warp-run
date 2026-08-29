import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../api/api";
import { PlayerContext } from "./PlayerContext";

export function PlayerProvider({ children }: { children: ReactNode }) {
    const { data: player, isPending } = useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const meResponse = await api.get('/me');
            return meResponse.data;
        }
    });

    return (
        <PlayerContext.Provider value={{ player, isLoading: isPending }}>
          {children}
        </PlayerContext.Provider>
      );
}