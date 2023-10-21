"use client";

import Spinner from "@/app/UI/spinner";
import createToast from "@/app/UI/toast";
import useDashboardStore from "@/Zustand/dashboard";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const { fetchInfos, saveChanges, infos, loading } = useDashboardStore();
  const [newInfos, setNewInfos] = useState(infos);

  useEffect(() => {
    fetchInfos();
  }, []);

  useEffect(() => {
    setNewInfos(infos);
  }, [infos]);

  if (loading) {
    return (
      <div className="flex gap-5 w-full h-full items-center justify-center">
        <Spinner />
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      {newInfos &&
        newInfos?.map((box, index) => {
          return (
            <div
              key={index + 1}
              className="bg-gradient-to-br from-customColorPurple2 to-customColorPurple rounded-lg p-5 w-full text-white text-sm flex flex-col gap-3"
            >
              <p className="text-xl"> # {index + 1}</p>
              <p className="text-white/60">Title : </p>
              <input
                value={box?.title}
                className="w-full bg-gradient-to-br from-25% from-customColorPurple t-0 to-customColorPurple/90 p-3 rounded outline-none "
                onChange={(e) => {
                  setNewInfos((prevInfos) => {
                    const newInfos = [...prevInfos];
                    newInfos[index].title = e.target.value;
                    return newInfos;
                  });
                }}
              />
              <p className="text-white/60">Description : </p>
              <input
                value={box?.description}
                className="w-full bg-gradient-to-br from-25% from-customColorPurple t-0 to-customColorPurple/90 p-3 rounded outline-none "
                onChange={(e) => {
                  // setInfos((prev) => {
                  //   let newInfos = [...prev];
                  //   newInfos[index].description = e.target.value;
                  //   return newInfos;
                  // });
                }}
              />
            </div>
          );
        })}
      <div>
        <button
          className="
        bg-blue-500
        hover:bg-blue-700
        text-white
        font-bold
        py-2
        px-4
        rounded
        "
          onClick={async () => {
            await saveChanges(newInfos);
            await fetchInfos();
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
