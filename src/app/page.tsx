import Banner from "./_home/Banner";
import CallToAction from "./_home/CallToAction";
import KeyPrograms from "./_home/KeyPrograms";
import MissionVision from "./_home/MissionVision";
import Testimonials from "./_home/Testimonials";

export default function Home() {
  return (
    <div className="w-full">
      <Banner />
      <MissionVision />
      <KeyPrograms />
      <CallToAction />
      <Testimonials />
    </div>
  );
}
