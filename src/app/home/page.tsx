import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import MarqueeSection from "./components/MarqueeSection";
import SpecialitiesSection from "./components/SpecialitiesSection";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <StatsSection />
      <MarqueeSection />
      <SpecialitiesSection />
    </main>
  );
}
