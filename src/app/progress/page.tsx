import React from "react";
import ProgressBanner from "./ProgressBanner";
import FutureGoals from "./FutureGoals";
import ImpactStories from "./ImpactStories";

export default function page() {
  return (
    <div>
      <ProgressBanner />
      <FutureGoals />
      <ImpactStories />
    </div>
  );
}
