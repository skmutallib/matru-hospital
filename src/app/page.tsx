import HeroSection from "./home/components/HeroSection";
import BrandFilmSection from "./home/components/BrandFilmSection";
import StatementSection from "./home/components/StatementSection";
import ValuesSection from "./home/components/ValuesSection";
import MarqueeSection from "./home/components/MarqueeSection";
import InsuranceSection from "./home/components/InsuranceSection";
import FaqSection from "./home/components/FaqSection";
import DarkZone from "./home/components/DarkZone";

export default function Page() {
  return (
    <main className="flex-1">
      <HeroSection />
      <BrandFilmSection />
      <StatementSection />
      <ValuesSection />
      <MarqueeSection />
      <InsuranceSection />
      <DarkZone>
        <FaqSection />
      </DarkZone>
    </main>
  );
}
