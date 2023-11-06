"use client";

import useGalleryStore from "@/Zustand/gallery";
import React, { useEffect } from "react";
import All from "./ImgComponents/All";
import Selected from "./ImgComponents/Selected";

export default function Gallery() {
  const { getAllImages, images, selected } = useGalleryStore();

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 w-full">
        {selected?.length > 0 ? <Selected /> : ""}
        {images?.length > 0 ? <All /> : ""}
      </div>
    </div>
  );
}
