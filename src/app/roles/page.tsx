import React from "react";
import RolesBanner from "./RolesBanner";
import TeacherEngagement from "./TeacherEngagement";
import VolunteerOpportunities from "./VolunteerOpportunitie";
import DonorImpact from "./DonorImpact";

export default function page() {
  return (
    <div>
      <RolesBanner />
      <TeacherEngagement />
      <VolunteerOpportunities />
      <DonorImpact />
    </div>
  );
}
