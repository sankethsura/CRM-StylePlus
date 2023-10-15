"use client";

import createToast from "@/app/UI/toast";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function Upload() {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  const getAllImages = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    setImages(data.gallery[0].gallery);
    setSelected(data.gallery[0].selected);
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const uploadResumeToS3 = async (file, url, filePath, fileExtension) => {
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
  };

  async function getUrl(file) {
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

    console.log(presignedURL);
    const response = await uploadResumeToS3(
      file,
      presignedURL,
      filePath,
      fileExtension
    );
    addToGallery(response.data);
  }

  async function addToGallery(gallery) {
    const allImages = [...images, { url: gallery }];
    const res = await fetch("api/gallery", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        gallery: allImages,
        selected,
      }),
    });
    const data = await res.json();
    if (data.success) {
      createToast("Image added to gallery", "success");
      getAllImages();
    }
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
            getUrl(file);
          } else {
            console.error("No file selected.");
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}
