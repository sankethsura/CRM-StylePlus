"use client";

import Spinner from "@/app/UI/spinner";
import createToast from "@/app/UI/toast";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [infos, setInfos] = useState([
    {
      title: "",
      description: "",
    },
    {
      title: "",
      description: "",
    },
    {
      title: "",
      description: "",
    },
  ]);
  const [loading, setLoading] = useState(true);

  const saveChanges = async () => {
    console.log(infos);

    const res = await fetch("api/dashboard", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        whatWeDo: infos,
      }),
    });

    const data = await res.json();
    if (data?.success) {
      setLoading(false);
      createToast("Changes Saved", "success");
    }
  };

  const getInfos = async () => {
    const res = await fetch("api/dashboard", {
      method: "GET",
    });
    const data = await res.json();
    console.log(data?.dashboard[0]?.whatWeDo);
    setInfos(data?.dashboard[0]?.whatWeDo);
    setLoading(false);
  };

  useEffect(() => {
    getInfos();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-5 w-full h-full items-center justify-center">
        <Spinner />
        Loading...
      </div>
    );
  }

  return (
    <div className="px-5 flex flex-col gap-5 w-full">
      <h1 className="text-2xl py-4">Dashboard</h1>
      {infos.map((box, index) => {
        console.log(box);
        return (
          <div key={index + 1} className="bg-gray-700 rounded-lg p-5 w-full">
            <p>Box : {index + 1}</p>
            <p>Title : </p>
            <input
              value={box?.title}
              className="w-full text-black"
              onChange={(e) => {
                setInfos((prev) => {
                  let obj = prev.find((item, idx) => index === idx);
                  obj.title = e.target.value;
                  return [
                    ...prev?.slice(0, index),
                    obj,
                    ...prev?.slice(index + 1),
                  ];
                });
              }}
            />

            <p>Description : </p>
            <input
              value={box?.description}
              className="w-full text-black"
              onChange={(e) => {
                setInfos((prev) => {
                  let obj = prev.find((item, idx) => index === idx);
                  obj.description = e.target.value;
                  return [
                    ...prev?.slice(0, index),
                    obj,
                    ...prev?.slice(index + 1),
                  ];
                });
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
          onClick={() => {
            saveChanges();
            setLoading(true);
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
