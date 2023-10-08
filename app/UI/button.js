import React from "react";

export default function Button({text}) {
  return (
    <button className="border px-4 py-2 mt-4 border-white text-white">
      {text}
    </button>
  );
}
