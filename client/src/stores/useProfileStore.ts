import type { ProfileStore } from "@/types";
import { create } from "zustand";

export const useProfileStore = create<ProfileStore>((set) => ({
    id: "",
    username: "",
    email: "",
    createdAt: null,
    updatedAt: null,
    setId: (newVal: string) => set(({ id: newVal })),
    setUsername: (newVal: string) => set(({ username: newVal })),
    setEmail: (newVal: string) => set(({ email: newVal })),
    setCreatedAt: (newVal: Date | null) => set(({ createdAt: newVal })),
    setUpdatedAt: (newVal: Date | null) => set(({ updatedAt: newVal }))
}));