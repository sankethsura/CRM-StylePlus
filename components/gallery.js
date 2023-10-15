"use client";

import createToast from "@/app/UI/toast";
import React, { useEffect, useState } from "react";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState([]);

  const getAllImages = async () => {
    const res = await fetch("/api/gallery", { next: { revalidate: 1 } });
    const data = await res.json();
    setImages(data.gallery[0].gallery);
    setSelected(data.gallery[0].selected);
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const moveToSelected = async (image) => {
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        gallery :[...images],
        selected : selected ? [...selected,image] : [image]
      }),
    });
    const data = await res.json();
    if(data.success)
    createToast("Image moved to selected","success")
    getAllImages();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-5 w-full">
        <section className="w-full">
          <p>Selected Images</p>
          <div className="w-full grid gap-5 grid-cols-1 sm:grid-cols-3">
            {selected?.map((image, idx) => {
              return (
                <div className="p-5 rounded border bg-gray-50">
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
                <div className="p-5 rounded border bg-gray-50">
                  <p
                    className="text-black"
                    onClick={() => {
                        moveToSelected(image);
                    }}
                  >
                    Move to selected
                  </p>
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
