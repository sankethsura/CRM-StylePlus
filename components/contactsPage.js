"use client";

import Spinner from "@/app/UI/spinner";
import useContactStore from "@/Zustand/contact";
import { Notepad, Star, X } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef, useState } from "react";
import { contactSchema } from "./utils";
import createToast from "@/app/UI/toast";

export default function Contacts() {
  const { contacts, loading, getAllContacts } = useContactStore();

  const [selectedContact, setSelectedContact] = useState(0);
  const [text, setText] = useState("");

  const CreateNotes = async (notes, bookmark, contactId) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ notes, bookmark, contactId }),
    });
    const data = await res.json();
    if (data.success) {
      setSelectedContact(0);
      createToast("Notes saved successfully", "success");
      getAllContacts();
    }
  };

  const getNotes = async (contactId) => {
    const res = await fetch(`/api/notes?contactId=${contactId}`);
    const data = await res.json();
    if (data.notes.length) {
      setText(data.notes[0].notes);
    }
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <style>
        {`
          .trapezium {
            clip-path: polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%);
          }
          `}
      </style>
      {contacts &&
        contacts?.map((contact, idx) => {
          const contactInfo = contactSchema(contact);
          return (
            <div
              key={idx}
              className="flex flex-col gap-3 rounded-lg p-5 bg-gradient-to-br from-customColorPurple2 to-customColorPurple mt-8 relative border border-customColorPurple text-white"
            >
              <div className=" trapezium sm:w-[220px] sm:h-[32px] w-[100px] h-[20px] bg-gradient-to-br from-customColorPurple2 to-customColorPurple sm:-top-[32px] -top-[20px] left-2 absolute" />
              <div className="absolute h-full w-8 flex flex-col justify-start items-center gap-3 top-4 right-4">
                <section className="p-2 rounded hover:bg-customColorPurple shadow duration-300 cursor-pointer">
                  <Star
                    size={22}
                    weight={contact?.note?.bookmark ? "fill" : "light"}
                    onClick={(e) => {
                      e.stopPropagation();
                      CreateNotes(
                        contact?.note?.notes,
                        !contact?.note?.bookmark,
                        contact._id
                      );
                    }}
                  />
                </section>
                <section
                  className={`p-2 rounded hover:bg-customColorPurple shadow duration-300 cursor-pointer ${
                    selectedContact === idx + 1
                      ? "bg-darkColor1/60 sm:w-[250px] w-[200px] h-[220px] sm:translate-x-[-110px] translate-x-[-77.5px] z-[20]"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setText(contact?.note?.notes);
                    setSelectedContact(idx + 1);
                  }}
                >
                  {selectedContact === idx + 1 ? (
                    <div className="w-full h-full flex flex-col gap-2">
                      <section className="flex items-center justify-between text-white/60">
                        <p className="text-sm">Notes</p>
                        <X
                          size={22}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedContact(0);
                          }}
                        />
                      </section>
                      <section className="h-full">
                        <textarea
                          value={text}
                          onChange={(e) => {
                            setText(e.target.value);
                          }}
                          className="w-full h-full rounded p-2 bg-darkColor1/60 text-white/90 resize-none outline-none focus:ring-1 focus:ring-customColorPurple2"
                          placeholder="Write your notes here..."
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              e.stopPropagation();
                              CreateNotes(text, false, contact._id);
                            }
                          }}
                        />
                      </section>
                      <section className="w-full">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!text) {
                              createToast("Please enter a note", "error");
                              return;
                            }
                            CreateNotes(text, false, contact._id);
                          }}
                          className="bg-customColorPurple2 text-white/90 rounded px-3 py-1 hover:bg-customColorPurple duration-300 w-full"
                        >
                          Save
                        </button>
                      </section>
                    </div>
                  ) : (
                    <Notepad weight="light" size={22} />
                  )}
                </section>
              </div>
              {contactInfo?.map((info, i) => (
                <div className="flex flex-col gap-1" key={i}>
                  <p className="text-xs text-white/60">{info.name} :</p>{" "}
                  <p className="text-sm">{info.value}</p>
                </div>
              ))}
            </div>
          );
        })}
    </div>
  );
}
