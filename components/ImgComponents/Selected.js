import useGalleryStore from "@/Zustand/gallery";
import { X } from "@phosphor-icons/react";
import React from "react";

export default function Selected() {
  const { selected, removeFromSelected } = useGalleryStore();
  return (
    <div>
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
    </div>
  );
}
