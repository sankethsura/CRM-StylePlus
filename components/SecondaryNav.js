"use client";

import React from "react";
import { SubNavMenu } from "./utils";
import { usePathname, useRouter } from "next/navigation";

export default function SecondaryNav() {
  const router = useRouter();
  const pathname = usePathname();

  const activePath = SubNavMenu.find((item) => item.path === pathname);

  console.log("activePath", activePath);

  return (
    <div className="flex items-center gap-4 text-sm text-white/60 overflow-x-scroll cursor-pointer">
      {SubNavMenu.map((item, index) => {
        return (
          <div
            className={`${
              activePath?.path === item?.path ? "text-white" : ""
            } ${
              !item?.active
                ? "cursor-not-allowed text-white/30"
                : "hover:text-white/90 cursor-pointer"
            }  duration-300`}
          >
            <p
              onClick={() => {
                if (!item?.active) return;
                router.push(item?.path);
              }}
            >
              {item?.name}
            </p>
          </div>
        );
      })}
    </div>
  );
}
