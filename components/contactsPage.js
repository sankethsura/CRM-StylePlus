"use client";

import Spinner from "@/app/UI/spinner";
import useContactStore from "@/Zustand/contact";
import moment from "moment";
import { useEffect, useState } from "react";

export default function Contacts() {
  const { contacts, loading, getAllContacts } = useContactStore();

  useEffect(() => {
    getAllContacts();
  }, []);

  const contactSchema = (contact) => {
    const contactInfo = [
      {
        name: "Name",
        value: contact.fullname,
      },
      {
        name: "Email",
        value: contact.email,
      },
      {
        name: "Message",
        value: contact.message,
      },
      {
        name: "Phone Number",
        value: contact.phoneNumber,
      },
      {
        name: "Date",
        value: moment(contact.date).format("ll"),
      },
      {
        name: "Time",
        value: moment(contact.date).fromNow(),
      },
    ];
    return contactInfo;
  };

  if (loading) {
    return (
      <div className="flex gap-5 w-full h-full items-center justify-center">
        <Spinner />
        Loading...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {contacts &&
        contacts.map((contact, idx) => {
          const contactInfo = contactSchema(contact);
          return (
            <div
              key={idx}
              className="rounded p-5 bg-gradient-to-br from-customColorPurple2 to-customColorPurple"
            >
              {contactInfo.map((info, i) => (
                <div className="flex flex-col gap-2" key={i}>
                  <p className="text-xs">{info.name} :</p> <p>{info.value}</p>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
}
