import type { AuthStore } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: '',
            setAccessToken: (newVal: string) => set({ accessToken: newVal }),
            loggedIn: false,
            setLoggedIn: (val: boolean) => set({ loggedIn: val }),
            refreshToken: localStorage.getItem('refreshToken') || "",
            setRefreshToken: (newVal: string) => {
                set({ refreshToken: newVal })
                localStorage.setItem("refreshToken", newVal)
            }
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ accessToken: state.accessToken }),
        }
    )
);