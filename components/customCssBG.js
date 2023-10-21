import React from "react";

export default function CustomCssBG() {
  return (
    <div className="fixed w-[100vw] h-[100vh]  z-[-1]">
      <div className="relative w-full h-full">
        <section className="w-[25vw] h-[25vw] bg-customColorPink3/30 absolute top-[5vw] left-[5vh] blur-2xl rounded-full"></section>
        <section className="w-[40vw] h-[40vw] bg-customColorPink3/40 absolute top-[10vw] left-[85vh] blur-3xl rounded-full"></section>
      </div>
    </div>
  );
}
