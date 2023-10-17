"use client";

import Contacts from "@/components/contactsPage";
import Navbar from "@/components/navbar";
import Upload from "@/components/upload";


export default function Home() {
  return (
    <div>
      <Navbar />
      <Upload />
      <Contacts />
    </div>
  );
}
