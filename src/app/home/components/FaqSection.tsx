"use client";

import { useState } from "react";

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "Do you offer 24x7 emergency care?",
    a: "Yes. Our emergency department is staffed round the clock with critical-care specialists and fully equipped ICUs for rapid, expert response.",
  },
  {
    q: "Which specialities are available?",
    a: "From maternity, paediatrics and orthopaedics to surgery, diagnostics and cosmetic care — a full range of specialities, all under one roof.",
  },
  {
    q: "Do you accept insurance and cashless claims?",
    a: "We are empanelled with major insurers and TPAs and support cashless admissions for eligible policies. Our desk assists with the paperwork.",
  },
  {
    q: "How do I book an appointment?",
    a: "Book online, call our helpline, or walk in — our care team will match you with the right specialist at a time that suits you.",
  },
  {
    q: "Do you provide preventive health check-ups?",
    a: "Yes. We offer tailored preventive packages including diagnostics, screenings and wellness consultations — prevention is at our core.",
  },
];

function Toggle({ open }: { open: boolean }) {
  return (
    <span
      className={[
        "relative block h-4 w-4 shrink-0",
        open ? "text-white" : "text-neutral-500",
      ].join(" ")}
    >
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
      <span
        className={[
          "absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300",
          open ? "scale-y-0" : "scale-y-100",
        ].join(" ")}
      />
    </span>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq-anchor w-full bg-transparent py-24 sm:py-32">
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-10 rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.25)] sm:p-12 lg:grid-cols-[2fr_3fr] lg:gap-16 lg:p-16">
          {/* Left column */}
          <div className="flex flex-col" data-reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
              <span className="h-2 w-2 rounded-full bg-primary-500" />
              FAQ
            </span>
            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-secondary-900 sm:text-5xl">
              Frequently Asked
              <br />
              Questions
            </h2>

            <div className="mt-auto pt-12">
              <p className="text-lg font-semibold text-secondary-900">
                Still have a question?
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-neutral-500">
                Our care team is here to help — reach out and we&rsquo;ll guide
                you to the right specialist.
              </p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-primary-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:-translate-y-0.5 hover:bg-primary-600"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => {
              const open = openIndex === i;
              return (
                <div
                  key={faq.q}
                  data-reveal
                  className={[
                    "rounded-2xl transition-colors duration-300",
                    open ? "bg-primary-500" : "bg-neutral-50 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-5 px-6 py-5 text-left"
                  >
                    <span
                      className={[
                        "text-sm font-medium tabular-nums",
                        open ? "text-white/70" : "text-neutral-400",
                      ].join(" ")}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={[
                        "flex-1 text-base font-semibold sm:text-lg",
                        open ? "text-white" : "text-secondary-900",
                      ].join(" ")}
                    >
                      {faq.q}
                    </span>
                    <Toggle open={open} />
                  </button>

                  {/* Smooth expand */}
                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 pl-[3.25rem] text-sm leading-relaxed text-white/85 sm:text-base">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
