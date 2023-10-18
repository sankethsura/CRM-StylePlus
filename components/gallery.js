"use client";

import useGalleryStore from "@/Zustand/gallery";
import { X } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import All from "./ImgComponents/All";
import Selected from "./ImgComponents/Selected";

export default function Gallery() {
  const { getAllImages } = useGalleryStore();

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 w-full">
        <Selected />
        <All />
      </div>
    </div>
  );
}
