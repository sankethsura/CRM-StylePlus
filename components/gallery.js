"use client";

import createToast from "@/app/UI/toast";
import useGalleryStore from "@/Zustand/gallery";
import { X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";

export default function Gallery() {
  const {
    images,
    selected,
    getAllImages,
    moveToSelected,
    removeFromSelected,
    removeFromAllImages,
  } = useGalleryStore();

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 w-full">
        <section className="w-full">
          <p>Selected Images</p>
          <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-3">
            {selected?.map((image, idx) => {
              return (
                <div
                  key={idx}
                  className="p-8 rounded border bg-gray-50 relative "
                >
                  <X
                    size={24}
                    className="p-2 bg-black text-white m-1 absolute top-2 right-2 rounded cursor-pointer"
                    onClick={() => {
                      removeFromSelected(image);
                    }}
                  />
                  <img src={image.url} className="w-60 h-60 object-cover" />
                </div>
              );
            })}
          </div>
        </section>

        <section className="w-full">
          <p>All Images</p>
          <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-3">
            {images?.map((image, idx) => {
              return (
                <div key={idx} className="p-5 rounded border bg-gray-50 relative">
                  <p
                    className="text-black"
                    onClick={() => {
                      moveToSelected(image);
                    }}
                  >
                    Move to selected
                  </p>
                  <X
                    size={24}
                    className="p-2 bg-black text-white m-1 absolute top-2 right-2 rounded cursor-pointer"
                    onClick={() => {
                      removeFromAllImages(image);
                    }}
                  />
                  <img src={image.url} className="w-60 h-60 object-cover" />
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
