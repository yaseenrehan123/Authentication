import isTokenExpired from "@/lib/isTokenExpired";
import useRefreshAccessToken from "@/hooks/useRefreshAccessToken";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";

function useAutoAuth() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const setAccessToken = useAuthStore((state => state.setAccessToken));
    const setLoggedIn = useAuthStore((state) => state.setLoggedIn);

    const { mutate } = useRefreshAccessToken();

    useEffect(() => {
        if (!document.cookie.includes('hasRefreshToken'))
            return;
        if (!accessToken || isTokenExpired(accessToken)) {
            mutate();
        }

    }, [accessToken, setAccessToken, setLoggedIn])
}

export default useAutoAuth;