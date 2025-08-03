import React from "react";
import AboutUsBanner from "./AboutUsBanner";
import MissionValues from "./MissionValues";
import TeamLeadership from "./TeamLeadership";

export default function page() {
  return (
    <div>
      <AboutUsBanner />
      <MissionValues />
      <TeamLeadership />
    </div>
  );
}
