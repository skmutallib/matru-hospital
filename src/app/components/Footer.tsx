const NAV_LEFT = ["Home", "About", "Departments"];
const NAV_RIGHT = ["PMV", "Testimonials", "Gallery"];

const IconLinkedIn = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.4 8.65 21 11 21 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3s-2.3 1.57-2.3 3.2V21H9z" />
  </svg>
);
const IconInstagram = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconFacebook = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M14 9h3V5h-3c-2.2 0-4 1.8-4 4v2H7v4h3v6h4v-6h3l1-4h-4V9c0-.6.4-1 1-1z" />
  </svg>
);
const IconYouTube = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
    <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C19.3 5 12 5 12 5s-7.3 0-8.8.5A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.8 1.8C4.7 19 12 19 12 19s7.3 0 8.8-.5a2.5 2.5 0 0 0 1.8-1.8C23 15.2 23 12 23 12zM10 15V9l5 3z" />
  </svg>
);

const SOCIALS = [
  { label: "LinkedIn", icon: IconLinkedIn },
  { label: "Instagram", icon: IconInstagram },
  { label: "Facebook", icon: IconFacebook },
  { label: "YouTube", icon: IconYouTube },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#141517] text-primary-500">
      <div className="mx-auto w-full max-w-[100rem] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        {/* Top */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          {/* Left — headline + CTA */}
          <div className="max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-primary-500 sm:text-5xl lg:text-6xl">
              Where Prevention
              <br />
              Meets Cure
            </h2>
            <a
              href="#book-appointment"
              className="group mt-10 inline-flex items-center gap-4 border-2 border-primary-500 px-7 py-4 text-sm font-semibold uppercase tracking-wide text-primary-500 transition-colors duration-300 hover:bg-primary-500 hover:text-[#141517]"
            >
              Book Appointment
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>

          {/* Right — contact + socials */}
          <div className="flex flex-col items-start gap-8 md:items-end md:text-right">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-500">
                Contact Us
              </p>
              <div className="mt-4 space-y-1 text-primary-500/80">
                <p>+91 98765 43210</p>
                <p>+91 91234 56789</p>
              </div>
              <p className="mt-4 text-primary-500/60">
                info@matruhospital.com
              </p>
            </div>

            <div className="flex items-center gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-500/40 text-primary-500 transition-colors duration-300 hover:bg-primary-500 hover:text-[#141517]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="mt-16 flex flex-col gap-6 border-t border-primary-500/20 py-8 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {NAV_LEFT.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-semibold uppercase tracking-wide text-primary-500 transition-colors hover:text-primary-300"
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
                className="text-sm font-semibold uppercase tracking-wide text-primary-500 transition-colors hover:text-primary-300"
              >
                {l}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t border-primary-500/20 pt-8 text-xs uppercase tracking-wide text-primary-500/60 sm:flex-row sm:items-center sm:justify-between">
          <p>Mātru Multispeciality Hospital — All Rights Reserved © 2026</p>
          <div className="flex gap-8">
            <a href="#" className="transition-colors hover:text-primary-500">
              Terms and Conditions
            </a>
            <a href="#" className="transition-colors hover:text-primary-500">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
