import { create } from "zustand";
import axios from "axios";
import createToast from "@/app/UI/toast";

const useGalleryStore = create((set) => ({
  images: [],
  selected: [],

  getAllImages: async () => {
    try {
      const res = await fetch("/api/gallery", { next: { revalidate: 1 } });
      const data = await res.json();
      if (data.gallery && data.gallery[0]) {
        set({
          images: data.gallery[0].gallery,
          selected: data.gallery[0].selected,
        });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  },

  moveToSelected: async (image) => {
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          gallery: [...useGalleryStore.getState().images],
          selected: useGalleryStore.getState().selected
            ? [...useGalleryStore.getState().selected, image]
            : [image],
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Image moved to selected");
        useGalleryStore.getState().getAllImages();
        createToast("Image moved to selected", "success");
      }
    } catch (error) {
      console.error("Error moving image to selected:", error);
    }
  },

  // New functions
  uploadResumeToS3: async (file, url, filePath, fileExtension) => {
    const fileType = file.type;

    const savingURL = url.split(fileExtension)[0];

    try {
      await axios.put(url, file, {
        headers: {
          "Content-Type": fileType,
          "Access-Control-Allow-Origin": "*",
        },
      });
      return { success: true, data: savingURL + fileExtension, error: null };
    } catch (error) {
      return { success: false, data: null, error: error.message };
    }
  },

  getUrl: async (file) => {
    const fileNames = file.name.split(".");
    const fileExtension = fileNames[fileNames.length - 1];
    const fileName = fileNames.slice(0, fileNames.length - 1).join("");
    const filePath = `${fileName}.${fileExtension}`;
    const fileType = file.type;

    const res = await fetch("api/uploadURL", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        fileName,
        filePath,
        fileType,
      }),
    });

    const data = await res.json();

    const presignedURL = data.url;

    const response = await useGalleryStore
      .getState()
      .uploadResumeToS3(file, presignedURL, filePath, fileExtension);

    return response.data;
  },

  addToGallery: async (gallery) => {
    const state = useGalleryStore.getState();
    const allImages = [...state.images, { url: gallery }];

    try {
      const res = await fetch("api/gallery", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          gallery: allImages,
          selected: state.selected,
        }),
      });
      const data = await res.json();
      if (data.success) {
        console.log("Image added to gallery");
        createToast("Image added to gallery", "success");
        state.getAllImages();
      }
    } catch (error) {
      createToast("Error adding image to gallery", "error");
      console.error("Error adding image to gallery:", error);
    }
  },
}));

export default useGalleryStore;
