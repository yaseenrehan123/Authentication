import type { ProfileFormFields } from "@/types";
import { create } from "zustand";
export const useProfileFormStore = create<ProfileFormFields>((set, get) => ({
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
        const username = get().username;
        const editingFields = get().editingFields;

        const fields = Array.from(editingFields);
        const result: Record<string, string> = {};

        for (const field of fields) {
            // Check each editable field
            if (field === "username" && username.trim() !== "") {
                result.username = username;
            }
            // You can add more fields here later, like:
            // if (field === "bio" && bio.trim() !== "") { result.bio = bio; }
        }

        console.log("✅ Confirmed editable fields:", result);

        // Optionally clear after confirming
        set({ editingFields: new Set() });

    }
}));