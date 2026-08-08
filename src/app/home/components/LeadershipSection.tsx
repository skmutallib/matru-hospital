type Leader = {
  tag: string;
  specialty: string;
  name: string;
  role: string;
  desc: string;
};

const LEADERS: Leader[] = [
  {
    tag: "Founder",
    specialty: "Internal Medicine",
    name: "Dr. Krishna Rajendra",
    role: "Founder | Internal Medicine",
    desc: "Legacy story, founding vision, 1985 journey, patient-care philosophy, achievements.",
  },
  {
    tag: "Chairman",
    specialty: "Orthopaedics",
    name: "Dr. Mahendra",
    role: "Chairman | Orthopaedic Surgeon",
    desc: "Clinical leadership, orthopaedic excellence, surgeries, associations, awards, institutional growth.",
  },
  {
    tag: "CEO",
    specialty: "Fertility & IVF",
    name: "Dr. Preeti Mahendra",
    role: "CEO | Founder, Matru Garbhadatri",
    desc: "Next-generation leadership, fertility vision, hospital brand growth, IVF milestone, media proof.",
  },
];

const ArrowUpRight = (
  <svg
    className="h-5 w-5"
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
);

export default function LeadershipSection() {
  return (
    <section className="w-full bg-white py-24 sm:py-32">
      <div className="w-full px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div data-reveal>
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Leadership
            </h2>
            <p className="mt-3 max-w-md text-base text-neutral-500">
              The people shaping preventive-focused care at Mātru.
            </p>
          </div>

          {/* Decorative carousel controls */}
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 text-neutral-600">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5l-5 5 5 5" />
              </svg>
            </span>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-500 text-white">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 5l5 5-5 5" />
              </svg>
            </span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LEADERS.map((leader) => (
            <article
              key={leader.name}
              data-reveal
              className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-neutral-100 bg-gradient-to-b from-primary-50 via-white to-secondary-50 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)]"
            >
              {/* Demo profile photo */}
              <img
                src="/doctor-placeholder.png"
                alt={leader.name}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />

              {/* Top pills */}
              <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm ring-1 ring-black/5">
                {leader.tag}
              </span>
              <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-800 shadow-sm ring-1 ring-black/5">
                {leader.specialty}
                <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              </span>

              {/* Bottom overlay: primary gradient behind name + designation */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-primary-600 via-primary-500/70 to-transparent p-5 pt-16">
                <div>
                  <h3 className="text-lg font-bold leading-tight text-white">
                    {leader.name}
                  </h3>
                  <p className="mt-1 text-sm text-white/85">{leader.role}</p>
                </div>
                <a
                  href="#leadership"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-primary-600 transition hover:bg-neutral-100"
                  aria-label={`More about ${leader.name}`}
                >
                  {ArrowUpRight}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
