// src/store/contactStore.js
import { create } from "zustand";

const useContactStore = create((set) => ({
  contacts: [],
  loading: true,
  setContacts: (newContacts) =>
    set((state) => {
      state.contacts = newContacts;
      return state;
    }),
  setLoading: (loading) => set(() => ({ loading })),
  getAllContacts: async () => {
    try {
      const res = await fetch("/api/contact", { method: "GET" });
      const data = await res.json();
      if (data?.contacts) {
        set({ contacts: data.contacts });
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useContactStore;
