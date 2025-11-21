import type { DeleteAccountConfirmationStore } from "@/types";
import { create } from "zustand";

const useDeleteAccountConfirmationStore = create<DeleteAccountConfirmationStore>((set) => ({
    enabled: false,
    setEnabled: (newVal: boolean) => set(({ enabled: newVal }))
}));

export default useDeleteAccountConfirmationStore;