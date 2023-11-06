"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const Profile = () => {
  const session = useSession({
    required:true,
    onUnauthenticated(){
      redirect("/authentication/signin")
    }
  });

  return (
    <div>
      Profile
      <br />
      {session?.data?.user?.email}
      <br />
      {session?.data?.user?.name}
      <br />
      {/* gives user info. if signin = email and password only email else can get name too*/}
      <button onClick={()=>signOut()}>
        Sign out
      </button>
    </div>
  );
};

export default Profile;
