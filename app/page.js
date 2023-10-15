"use client";

import Contacts from "@/components/contactsPage";
import Dashboard from "@/components/dashboard";
import Navbar from "@/components/navbar";
import Upload from "@/components/upload";
import axios from "axios";
import { useState } from "react";
import createToast from "./UI/toast";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Upload />
      <Contacts />
    </div>
  );
}
