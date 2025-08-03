import React from "react";
import ContactDataData from "./ContactDataData";

export default async function page() {
  return (
    <div className="overflow-auto w-full">
      <ContactDataData />
    </div>
  );
}
