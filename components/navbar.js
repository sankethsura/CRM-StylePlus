import React from "react";

export default function Navbar({ setRenderElement }) {
  return (
    <div className="h-[50px] flex items-center justify-center gap-5">
      <p
        onClick={() => {
          setRenderElement("contacts");
        }}
      >
        Contacts
      </p>
      <p
        onClick={() => {
          setRenderElement("dashboardInfo");
        }}
      >
        Dashboard Info
      </p>
      <p
        onClick={() => {
          setRenderElement("gallery");
        }}
      >
        Gallery
      </p>
    </div>
  );
}
