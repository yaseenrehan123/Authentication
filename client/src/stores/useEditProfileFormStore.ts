import type { EditProfileFormStore } from "@/types";
import { create } from "zustand";
export const useEditProfileFormStore = create<EditProfileFormStore>((set, get) => ({
    username: '',
    setUsername: (newVal: string) => set(({ username: newVal })),
    editingFields: new Set(),
    startEditing: (field: string) => set((state) => ({ editingFields: new Set([...state.editingFields, field]) })),
    stopEditing: (field: string) => {
        set((state) => {
            const newSet = new Set(state.editingFields);
            newSet.delete(field);
            return { editingFields: newSet };
        });
    },
    clearEditing: () => set(() => ({ editingFields: new Set() })),
    confirmEditing: () => {
        const state = get();
        const editingFields = Array.from(state.editingFields);

        const result: Record<string, any> = {};

        for (const field of editingFields) {
            const value = state[field as keyof typeof state];

            // Ensure it's a non-empty string (you can customize this rule)
            if (typeof value === "string" && value.trim() !== "") {
                result[field] = value;
            }
        }

        set({ editingFields: new Set() });

        return result

    }
}));