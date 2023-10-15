import Gallery from "@/components/gallery";
import Navbar from "@/components/navbar";
import Upload from "@/components/upload";
import React from "react";

export default function Index() {
  return (
    <div>
      <Navbar />
      <Upload />
      <Gallery />
    </div>
  );
}
