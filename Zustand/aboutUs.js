import createToast from "@/app/UI/toast";
import { create } from "zustand";

const useAboutUsStore = create((set) => ({
  aboutUs: {},
  saveAboutUs: async (aboutUsData) => {
    const response = await fetch("/api/aboutus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(aboutUsData),
    });
    const data = await response.json();
    if (data.success) {
      createToast(data.msg, data.success);
    }
  },
  getLatestAboutUs: async () => {
    const response = await fetch("/api/aboutus");
    const data = await response.json();
    set({ aboutUs: data });
  },
}));

export default useAboutUsStore;
