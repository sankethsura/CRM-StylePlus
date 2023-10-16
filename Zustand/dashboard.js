// src/store/dashboardStore.js
import { create } from "zustand";
import produce from "immer";

const useDashboardStore = create((set) => ({
  infos: [
    {
      title: "",
      description: "",
    },
    {
      title: "",
      description: "",
    },
    {
      title: "",
      description: "",
    },
  ],
  loading: true,
  setLoading: (loading) => set(() => ({ loading })),
  setInfos: (newInfos) =>
    set((state) =>
      produce(state, (draft) => {
        draft.infos = newInfos;
      })
    ),
  fetchInfos: async () => {
    try {
      // Set loading to true before the API call
      set({ loading: true });

      const res = await fetch("api/dashboard", { method: "GET" });
      const data = await res.json();

      if (data?.dashboard && data.dashboard[0]?.whatWeDo) {
        set({ infos: data.dashboard[0].whatWeDo });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Set loading to false after the API call completes
      set({ loading: false });
    }
  },
  saveChanges: async () => {
    try {
      const res = await fetch("api/dashboard", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          whatWeDo: this.getState().infos,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        console.log("Changes saved successfully.");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  },
}));

export default useDashboardStore;
