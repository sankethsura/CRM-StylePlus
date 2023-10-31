"use client";

import {
  AddressBook,
  Chalkboard,
  FolderStar,
  UserCircle,
} from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import React from "react";

export default function TitleNav() {
  const router = useRouter();
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
    <div className="flex gap-3 items-center justify-center">
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
    </div>
  );
}
