import type { SidebarStore } from "@/types";
import { create } from "zustand";

export const useSidebarStore = create<SidebarStore>((set) => ({
    enabled: false,
    setEnabled: (newVal: boolean) => set(() => ({ enabled: newVal }))
}));