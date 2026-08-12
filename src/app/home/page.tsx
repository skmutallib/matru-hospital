import HeroSection from "./components/HeroSection";
import BrandFilmSection from "./components/BrandFilmSection";
import StatementSection from "./components/StatementSection";
import ValuesSection from "./components/ValuesSection";
import MarqueeSection from "./components/MarqueeSection";
import InsuranceSection from "./components/InsuranceSection";
import FaqSection from "./components/FaqSection";
import DarkZone from "./components/DarkZone";

export default function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <BrandFilmSection />
      <StatementSection />
      <MarqueeSection />
      <ValuesSection />
      <InsuranceSection />
      <DarkZone>
        <FaqSection />
      </DarkZone>
    </main>
  );
}
