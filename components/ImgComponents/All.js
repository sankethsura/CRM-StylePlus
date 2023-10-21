import useGalleryStore from "@/Zustand/gallery";
import Title from "@/app/UI/Title";
import { X } from "@phosphor-icons/react";
import { Star } from "@phosphor-icons/react/dist/ssr";
import React from "react";

export default function All() {
  const { images, moveToSelected, removeFromAllImages } = useGalleryStore();

  return (
    <section className="w-full flex flex-col gap-3 overflow-y-scroll scrollHide pb-5">
      <Title>All Images</Title>
      <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-3">
        {images?.map((image, idx) => {
          return (
            <div key={idx} className="p-2.5 flex flex-col gap-3 rounded shadow-xl border border-customColorPurple2/30 bg-gradient-to-br from-customColorPurple ">
              <section className="flex items-center w-full justify-between bg-customColorPink3/5 px-2.5">

              <p
                className="text-customColorWhite/70 text-xs cursor-pointer flex items-center gap-2 hover:text-customColorWhite/90 duration-300"
                onClick={() => {
                  moveToSelected(image);
                }}
                >
                Move to selected <Star size={18} />
              </p>
              <X
                size={24}
                className="p-2 bg-darkColor1/30 border border-customColorPurple2/20 text-white m-1 top-2 right-2 rounded cursor-pointer"
                onClick={() => {
                  removeFromAllImages(image);
                }}
                />
                </section>
              <img src={image.url} className="w-full h-60 object-cover rounded " />
            </div>
          );
        })}
      </div>
    </section>
  );
}
