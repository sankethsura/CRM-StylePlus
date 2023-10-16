"use client";

import createToast from "@/app/UI/toast";
import useGalleryStore from "@/Zustand/gallery";
import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState();

  const { getUrl, addToGallery, getAllImages } = useGalleryStore();

  async function handleUpload() {
    const response = await getUrl(file);
    await addToGallery(response);
    await getAllImages();
  }

  return (
    <div>
      <input
        type="file"
        id="fileInput"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={(e) => {
          if (file) {
            handleUpload();
          } else {
            createToast("Please select a file", "error");
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}
