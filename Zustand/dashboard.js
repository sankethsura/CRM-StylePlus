// src/store/dashboardStore.js
import createToast from "@/app/UI/toast";
import { create } from "zustand";

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
  setInfos: (e) => set({ infos: e }),

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
  saveChanges: async (newInfos) => {
    try {
      const res = await fetch("api/dashboard", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          whatWeDo: newInfos,
        }),
      });

      const data = await res.json();
      if (data?.success) {
        console.log("Changes saved successfully.");
        createToast("Changes saved successfully","success");
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  },
}));

export default useDashboardStore;
