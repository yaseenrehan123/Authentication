import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";

function useRefreshAccessToken() {
    const setAccessToken = useAuthStore((state => state.setAccessToken));
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

    const refreshAccessTokenMutation = useMutation({
        mutationKey: ['refresh'],
        mutationFn: async () => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/refresh`;
            const res = await fetch(path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body.error || "Unknown error occured");
            };

            const accessToken: string = body?.accessToken;
            if (accessToken) {
                setAccessToken(accessToken);
                setLoggedIn(true);
                return;
            }
        }
    });
    return refreshAccessTokenMutation;
};

export default useRefreshAccessToken;