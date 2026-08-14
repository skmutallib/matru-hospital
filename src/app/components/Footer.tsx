import {
  ArrowRight,
  LinkedinLogo,
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
} from "@phosphor-icons/react/dist/ssr";

const NAV_LEFT = ["Home", "About", "Departments"];
const NAV_RIGHT = ["PMV", "Testimonials", "Gallery"];

const SOCIALS = [
  { label: "LinkedIn", Icon: LinkedinLogo },
  { label: "Instagram", Icon: InstagramLogo },
  { label: "Facebook", Icon: FacebookLogo },
  { label: "YouTube", Icon: YoutubeLogo },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0E0F11] text-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        {/* Top */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left */}
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-5xl">
              Where Prevention
              <br />
              Meets Cure
            </h2>
            <a
              href="#book-appointment"
              className="group mt-9 inline-flex items-center gap-3 rounded-[10px] bg-primary-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-600 active:translate-y-px"
            >
              Book Appointment
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-col items-start gap-8 md:items-end md:text-right">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                Contact
              </p>
              <div className="mt-4 space-y-1 text-slate-300">
                <p>+91 98765 43210</p>
                <p>+91 91234 56789</p>
              </div>
              <p className="mt-3 text-slate-400">info@matruhospital.com</p>
            </div>

            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, Icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-slate-300 transition-colors duration-200 hover:border-primary-500 hover:text-primary-500"
                >
                  <Icon size={20} weight="fill" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LEFT.map((l) => (
              <a
                key={l}
                href={l === "Home" ? "/" : l === "About" ? "/about" : `#${l.toLowerCase()}`}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {l}
              </a>
            ))}
          </nav>
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_RIGHT.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Matru Multispeciality Hospital. All rights reserved, 2026.</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors hover:text-slate-300">
              Terms and Conditions
            </a>
            <a href="#" className="transition-colors hover:text-slate-300">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
