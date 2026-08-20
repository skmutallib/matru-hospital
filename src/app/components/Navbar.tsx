import Link from "next/link";

const NAV_LINKS = ["Home", "About", "Departments", "PMV", "Testimonials", "Gallery"];

// Links that point to real pages route there; the rest stay in-page anchors.
const ROUTES: Record<string, string> = {
  Home: "/",
  About: "/about",
  Departments: "/departments",
  PMV: "/pmv",
  Testimonials: "/testimonials",
  Gallery: "/gallery",
};

const hrefFor = (link: string) => ROUTES[link] ?? `#${link.toLowerCase()}`;

export default function Navbar() {
  return (
    <header className="animate-navbar-drop fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <nav className="relative mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center overflow-hidden border border-white/10 bg-gradient-to-b from-neutral-900/90 to-neutral-950/90 px-4 py-2.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.6)] ring-1 ring-white/5 backdrop-blur-xl sm:px-6">
        {/* Subtle dotted texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:10px_10px]"
          aria-hidden="true"
        />

        {/* Left logo */}
        <Link
          href="/"
          className="group relative flex items-center justify-self-start"
          aria-label="Mātru Multispeciality Hospital — home"
        >
          <img
            src="/matru-primarylogo.png"
            alt="Mātru Multispeciality Hospital"
            className="h-9 w-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.18)] transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.04] sm:h-11"
          />
        </Link>

        {/* Center links */}
        <ul className="relative hidden items-center gap-1 justify-self-center md:flex">
          {NAV_LINKS.map((link, i) => (
            <li key={link} className="flex items-center">
              <Link
                href={hrefFor(link)}
                className="rounded-lg px-3 py-1.5 text-[15px] font-medium text-slate-300 transition-colors duration-200 hover:text-primary-400"
              >
                {link}
              </Link>
              {i < NAV_LINKS.length - 1 && (
                <span
                  className="mx-1 h-1 w-1 rotate-90 rounded-[1px] bg-white/20"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#book-appointment"
          className="group relative flex items-center gap-3 justify-self-end bg-primary-500 py-2 pl-4 pr-2 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all duration-300 hover:bg-primary-600 hover:shadow-lg"
        >
          <span className="hidden sm:inline">Book appointment</span>
          <span className="sm:hidden">Book</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-colors duration-300 group-hover:bg-white/20">
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 14L14 6M14 6H7M14 6v7" />
            </svg>
          </span>
        </a>
      </nav>
    </header>
  );
}
