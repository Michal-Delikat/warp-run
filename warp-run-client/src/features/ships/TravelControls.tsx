import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import api from "../../api/api";

interface TravleControlsProps {
    shipId: string;
    currentPlanetId: string | undefined;
}

function TravelControls({ shipId, currentPlanetId }: TravleControlsProps) {
    const queryClient = useQueryClient();

    const { data: neighbors } = useQuery({
        queryKey: ['planet-neighbors', currentPlanetId],
        queryFn: async () => {
            const response = await api.get(
                `/planets/${currentPlanetId}/neighbors`,
            );
            return response.data;
        },
        enabled: !!currentPlanetId,
    });

    const travelMutation = useMutation({
        mutationFn: async (destinationPlanetId: string) => {
            const response = await api.post(
                `/ships/${shipId}/travel`,
                { destinationPlanetId },
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me/ships'] });
        },
    });

    return (
        <div className="travel-controls-wrapper">
            <h4>Travel options</h4>
            {neighbors?.map((planet: {id: string; name: string }) => (
                <button 
                    key={planet.id}
                    onClick={() => travelMutation.mutate(planet.id)} 
                    disabled={travelMutation.isPending}
                >
                    Travel to {planet.name}
                </button>
            ))}
        </div>
    );
}

export default TravelControls;
