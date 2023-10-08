"use client";

import Spinner from "@/app/UI/spinner";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Contacts() {
  let [contacts, setContacts] = useState([]);
  let [loading, setLoading] = useState(true);
  const getAllContacts = async () => {
    const res = await fetch("/api/contact", {
      method: "GET",
    });
    const data = await res.json();
    setContacts(data?.contacts);
    setLoading(false);
  };
  useEffect(() => {
    getAllContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-5 w-full h-full items-center justify-center">
        <Spinner />
        Loading...
      </div>
    );
  }

  //map all the contacts with fullname, email, message, phoneNumber
  return (
    <div className="m-5">
      <h1 className='text-2xl py-4'>All Contacts</h1>
      <div className="flex flex-col gap-3">
        {contacts &&
          contacts?.map((contact, idx) => {
            return (
              <div key={idx} className="border rounded flex flex-col gap-3 p-5">
                <h3>Name : {contact.fullname}</h3>
                <p>Email : {contact.email}</p>
                <p>Message : {contact.message}</p>
                <p>Phone Number : {contact.phoneNumber}</p>
                <p>Date : {moment(contact.date).format("ll")}</p>
                <p>{moment(contact.date).fromNow()}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
