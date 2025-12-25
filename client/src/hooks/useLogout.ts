import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";

function useLogout() {
    const accessToken = useAuthStore((state) => state.accessToken);

    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
    const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

    const logoutMutation = useMutation({
        mutationKey: ['logout'],
        mutationFn: async () => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/logout`;
            const res = await fetch(path, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body.error || "Unknown error occured");
            };
        },
        onSuccess: () => {
            setAccessToken('');
            setLoggedIn(false);
            setRefreshToken("")
        }
    });
    return logoutMutation;
};

export default useLogout;