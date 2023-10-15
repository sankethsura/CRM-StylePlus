import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <div className="h-[50px] flex items-center justify-center gap-5">
     <Link href='/'>
      <p>Contacts</p>
     </Link>
     <Link href='/dashboard'>
      <p>Dashboard Info</p>
      </Link>
      <Link href='/gallery'>
      <p>Gallery</p>
      </Link>
    </div>
  );
}
