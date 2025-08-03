import React from "react";
import ContactBanner from "./ContactBanner";
import SocialMediaContact from "./SocialMediaContact";
import ContactSection from "./ContactSection";

export default function page() {
  return (
    <div>
      <ContactBanner />
      <SocialMediaContact />
      <ContactSection />
    </div>
  );
}
