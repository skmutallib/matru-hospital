import HeroSection from "./home/components/HeroSection";
import StatsSection from "./home/components/StatsSection";
import MarqueeSection from "./home/components/MarqueeSection";
import SpecialitiesSection from "./home/components/SpecialitiesSection";

export default function Page() {
  return (
    <main className="flex-1">
      <HeroSection />
      <StatsSection />
      <MarqueeSection />
      <SpecialitiesSection />
    </main>
  );
}
