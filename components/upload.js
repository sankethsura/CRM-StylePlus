"use client";

import createToast from "@/app/UI/toast";
import React, { useState } from "react";
import useGalleryStore from "../Zustand/gallery";
import { Paperclip, UploadSimple } from "@phosphor-icons/react/dist/ssr";
import Title from "@/app/UI/Title";
import Spinner from "@/app/UI/spinner";

export default function Upload() {
  const [file, setFile] = useState();

  const { getUrl, addToGallery, getAllImages, loading } = useGalleryStore();

  async function handleUpload() {
    const response = await getUrl(file);
    await addToGallery(response);
    await getAllImages();
  }

  return (
    <div className="flex items-center gap-5 ">
      <Title>Upload Image</Title>
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        className="flex items-center gap-2 p-2 bg-customColorPurple2 rounded hover:bg-customColorPurple2/50 duration-300  max-w-[250px]"
        onClick={() => {
          document.getElementById("fileInput").click();
        }}
      >
        <p className="w-[200px] truncate">

        {file?.name ? file?.name : " Select Image"}
        </p>
        <Paperclip size={22} />
      </button>
      <button
        disabled={!file}
        className="flex items-center gap-2 p-2 bg-customColorPurple2 rounded hover:bg-customColorPurple2/50 duration-300  "
        onClick={(e) => {
          if (file) {
            handleUpload();
          } else {
            createToast("Please select a file", "error");
          }
        }}
      >
        Upload
        <UploadSimple size={22} />
      </button>

      {loading && (
        <div className="flex items-center gap-2">
          <Spinner />
          Uploading...
        </div>
      )}

    </div>
  );
}
