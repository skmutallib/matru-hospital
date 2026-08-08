import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import MarqueeSection from "./components/MarqueeSection";
import LeadershipSection from "./components/LeadershipSection";
import SpecialitiesSection from "./components/SpecialitiesSection";
import MessageSection from "./components/MessageSection";
import FaqSection from "./components/FaqSection";
import DarkZone from "./components/DarkZone";

export default function HomePage() {
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
