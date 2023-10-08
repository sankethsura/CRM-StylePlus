"use client";

import Contacts from "@/components/contactsPage";
import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import { useState } from "react";

export default function Home() {
 const [renderElement, setRenderElement] = useState("contacts");

 const RenderFile = () => {
    switch (renderElement) {
      case "contacts":
        return <Contacts />;
      case "dashboardInfo":
        return <div><Dashboard /></div>;
      default:
        return <Contacts />;
    }
  };
  return (
    <div>
      <Navbar setRenderElement={setRenderElement} />
     {RenderFile()}
    </div>
  );
}
