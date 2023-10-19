import VerticalNav from "@/components/VerticalNav";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="w-full h-full ">
      <section className="w-full h-full overflow-y-scroll ">{children}</section>
      <section></section>
    </div>
  );
}
