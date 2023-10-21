import useGalleryStore from "@/Zustand/gallery";
import Title from "@/app/UI/Title";
import { X } from "@phosphor-icons/react";
import React from "react";

export default function Selected() {
  const { selected, removeFromSelected } = useGalleryStore();
  return (
    <section className="w-full h-full overflow-y-scroll scrollHide">
      <Title>Selected Images</Title>
      <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-3">
        {selected?.map((image, idx) => {
          return (
            <div
              key={idx}
              className="p-2.5 flex flex-col gap-3 rounded shadow-xl border border-customColorPurple2/30 bg-gradient-to-br from-customColorPurple "
            >
              <section className="flex items-center w-full justify-between bg-customColorPink3/5 px-2.5">
                <div />
                <X
                  size={24}
                  className="p-2 bg-darkColor1/30 border border-customColorPurple2/20 text-white m-1 top-2 right-2 rounded cursor-pointer"
                  onClick={() => {
                    removeFromSelected(image);
                  }}
                />
              </section>
              <img
                src={image.url}
                className="w-full h-60 object-cover rounded "
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
