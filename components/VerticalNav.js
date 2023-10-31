"use client";

import {
  AddressBook,
  Chalkboard,
  FolderStar,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";

export default function VerticalNav() {
  const router = useRouter();
  // UserCircle 
  const ICONS = [
    {
      name: "UserCircle",
      icon: <UserCircle size={22} />,
      path: "/profile",
    },
    {
      name: "AddressBook",
      icon: <AddressBook size={22} />,
      path: "/",
    },
    {
      name: "Chalkboard",
      icon: <Chalkboard size={22} />,
      path: "/dashboard",
    },
    {
      name: "FolderStar",
      icon: <FolderStar size={22} />,
      path: "/gallery",
    },
  ];

  return (
    <div className="w-24 h-full  text-customColorWhite p-5">
      <section className="w-full h-full flex flex-col items-center justify-center gap-4 relative bg-gradient-to-br from-25% from-customColorPurple rounded">
        <div className="absolute w-full h-full bg-gradient-to-br from-25% from-customColorPurple blur-[1px] rounded"></div>
        {ICONS.map((icon, index) => {
          return (
            <div
              onClick={() => {
                router.push(icon.path);
              }}
              key={index}
              className={`
    p-2.5 rounded-full bg-customColorPurple shadow hover:bg-darkColor1/80 duration-300 cursor-pointer z-[1] text-customColorWhite`}
            >
              {icon.icon}
            </div>
          );
        })}
      </section>
    </div>
  );
}
