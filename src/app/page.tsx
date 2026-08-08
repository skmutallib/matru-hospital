import HeroSection from "./home/components/HeroSection";
import StatsSection from "./home/components/StatsSection";
import MarqueeSection from "./home/components/MarqueeSection";
import LeadershipSection from "./home/components/LeadershipSection";
import SpecialitiesSection from "./home/components/SpecialitiesSection";
import MessageSection from "./home/components/MessageSection";
import FaqSection from "./home/components/FaqSection";
import DarkZone from "./home/components/DarkZone";

export default function Page() {
  return (
    <main className="flex-1">
      <HeroSection />
      <StatsSection />
      <MarqueeSection />
      <LeadershipSection />
      <DarkZone>
        <SpecialitiesSection />
        <MessageSection />
        <FaqSection />
      </DarkZone>
    </main>
  );
}
