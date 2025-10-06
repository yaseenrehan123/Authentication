import type { AuthStore } from "@/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: '',
            setAccessToken: (newVal: string) => set({ accessToken: newVal }),
            loggedIn: false,
            setLoggedIn: (val: boolean) => set({ loggedIn: val }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ accessToken: state.accessToken }),
        }
    )
);