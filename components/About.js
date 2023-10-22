"use client";

import useAboutUsStore from "@/Zustand/aboutUs";
import React, { useEffect, useState } from "react";

export default function AboutUs() {
  const { aboutUs, getLatestAboutUs, saveAboutUs } = useAboutUsStore();
  const [field, setField] = useState({
    title: "",
    title2: "",
    description: "",
  });

  useEffect(() => {
    if(aboutUs?.aboutUs?.length>0){
      setField(aboutUs.aboutUs[0]);
    }
  }, [aboutUs]);

  useEffect(() => {
    getLatestAboutUs();
  }, []);

  console.log(aboutUs?.aboutUs,field)

  const handleChange = (e) => {
    setField({ ...field, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <label>
        Title
        <input
          name="title"
          value={field?.title}
          onChange={handleChange}
          className="w-full bg-gradient-to-br from-25% from-customColorPurple t-0 to-customColorPurple/90 p-3 rounded outline-none border border-customColorPurple"
        />
      </label>
      <label>
        Title 2
        <input
          name="title2"
          value={field?.title2}
          onChange={handleChange}
          className="w-full bg-gradient-to-br from-25% from-customColorPurple t-0 to-customColorPurple/90 p-3 rounded outline-none border border-customColorPurple"
        />
      </label>
      <label>
        Description
        <input
          name="description"
          value={field?.description}
          onChange={handleChange}
          className="w-full bg-gradient-to-br from-25% from-customColorPurple t-0 to-customColorPurple/90 p-3 rounded outline-none border border-customColorPurple"
        />
      </label>
      <button
        onClick={() => {
          saveAboutUs(field);
        }}
        className="bg-customColorPurple2 text-white/90 rounded px-3 py-2 hover:bg-customColorPurple duration-300 w-full"
      >
        Save
      </button>
    </div>
  );
}
