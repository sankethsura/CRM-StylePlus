import VerticalNav from "@/components/VerticalNav";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="w-[100vw] h-[100vh] flex ">
      <section className="h-full overflow-y-scroll">{children}</section>
      <section></section>
    </div>
  );
}
