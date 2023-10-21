import SecondaryNav from "@/components/SecondaryNav";
import React from "react";

export default function layout({ children }) {

  return (
    <div className="w-full h-full ">
      <section className="p-5 sticky top-5 left-0 z-[10] text-customColorWhite -translate-y-5 bg-customColorPurple border border-darkColor1/20 mt-5 rounded shadow-xl">
        <SecondaryNav />
      </section>
      <section className="w-full h-full">{children}</section>
    </div>
  );
}
