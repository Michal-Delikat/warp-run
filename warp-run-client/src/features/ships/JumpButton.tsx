import { useQueryClient, useMutation } from "@tanstack/react-query";
import api from "../../api/api.ts";

interface JumpButtonProps {
    shipId: string;
}

function JumpButton({ shipId }: JumpButtonProps) {
    const queryClient = useQueryClient();

    const jumpMutation = useMutation({
        mutationFn: async () => {
            const response = await api.post(
                `/ships/${shipId}/jump`,
                {},
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['me/ships']});
        },
    })

    return <button onClick={() => jumpMutation.mutate()} disabled={jumpMutation.isPending}>Jump</button>
}

export default JumpButton;
