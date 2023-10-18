import { create } from "zustand";
import axios from "axios";
import createToast from "@/app/UI/toast";

const useGalleryStore = create((set) => ({
  images: [],
  selected: [],

  getAllImages: async () => {
    try {
      const res2 = await fetch("/api/allImages", { next: { revalidate: 1 } });
      const data2 = await res2.json();

      set({
        selected: data2.allImagesSelected,
        images: data2.allImagesNonSelected,
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  },

  moveToSelected: async (image) => {
    try {
      const res = await fetch("/api/allImages/moveToSelected", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: image._id,
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

  removeFromSelected: async (image) => {
    const state = useGalleryStore.getState();

    try {
      const res = await fetch("/api/allImages/deleteFromSelected", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
         _id: image._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("Image removed from selected");
        state.getAllImages();
        createToast("Image removed from selected", "success");
      }
    } catch (error) {
      console.error("Error removing image from selected:", error);
    }
  },

  removeFromAllImages: async (image) => {
    const state = useGalleryStore.getState();
    try {
      const res = await fetch("/api/allImages/deleteFromAllImages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          _id: image._id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        state.getAllImages();
        createToast("Image removed from all images", "success");
      }
    } catch (error) {
      console.error("Error removing image from all images:", error);
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
      const res2 = await fetch("api/allImages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          url: gallery,
        }),
      });

      const data2 = await res2.json();
      if (data2.success) {
        console.log("Image added to all images");
        createToast("Image added to all images", "success");
        state.getAllImages();
      }

      // const res = await fetch("api/gallery", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     gallery: allImages,
      //     selected: state.selected,
      //   }),
      // });
      // const data = await res.json();
      // if (data.success) {
      //   console.log("Image added to gallery");
      //   createToast("Image added to gallery", "success");
      //   state.getAllImages();
      // }
    } catch (error) {
      createToast("Error adding image to gallery", "error");
      console.error("Error adding image to gallery:", error);
    }
  },
}));

export default useGalleryStore;
