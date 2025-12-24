import isTokenExpired from "@/lib/isTokenExpired";
import useRefreshAccessToken from "@/hooks/useRefreshAccessToken";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useProfileStore } from "@/stores/useProfileStore";

function useFetchProfile() {
    const [ready, SetReady] = useState<boolean>(false);

    const loggedIn = useAuthStore((state) => state.loggedIn);
    const accessToken = useAuthStore((state) => state.accessToken);
    const refreshToken = useAuthStore((state) => state.refreshToken);

    const setId = useProfileStore((state) => state.setId);
    const setUsername = useProfileStore((state) => state.setUsername);
    const setEmail = useProfileStore((state) => state.setEmail);
    const setCreatedAt = useProfileStore((state) => state.setCreatedAt);
    const setUpdatedAt = useProfileStore((state) => state.setUpdatedAt);

    const { mutateAsync } = useRefreshAccessToken();
    const { data, isLoading, isSuccess, isError, error } = useQuery({
        queryKey: ['fetchProfile'],
        queryFn: async () => {
            const path: string = `${import.meta.env.VITE_SERVER_PATH}/me`;
            const res = await fetch(path, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            });

            const body = await res.json();

            if (!res.ok) {
                throw new Error(body.error || "Unknown error occured");
            };

            console.log(body);
            return body;
        },
        enabled: ready && loggedIn,
        refetchOnWindowFocus: false
    });

    useEffect(() => {
        const ensureToken = async () => {
            if (!refreshToken) return;
            if (!accessToken || isTokenExpired(accessToken)) {
                await mutateAsync();
            };
            SetReady(true)
        }
        ensureToken();

    }, [accessToken, loggedIn]);

    useEffect(() => {
        if (isLoading) return;
        if (isError) throw new Error(error.message || "Unknown error occured");
        if (isSuccess) {
            const user = data?.user;

            setId(user.id);
            setUsername(user.username);
            setEmail(user.email);
            setCreatedAt(user.createdAt);
            setUpdatedAt(user.updatedAt);
        };
    }, [data]);
}

export default useFetchProfile;