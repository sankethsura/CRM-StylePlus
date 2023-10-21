import Upload from "@/components/upload";
import React from "react";

export default function layout({ children }) {
  return (
    <div className="w-full h-full ">
      <section className="py-5 sticky top-0 left-0 z-[10] -translate-y-5 bg-gradient-to-r from-25% from-customColorPurple">
        <Upload />
      </section>
      <section className="w-full h-full">
        {children}
      </section>
    </div>
  );
}
