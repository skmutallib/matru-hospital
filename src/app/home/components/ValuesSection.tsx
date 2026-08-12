type Value = {
  num: string;
  title: string;
  desc: string;
  img: string;
};

const VALUES: Value[] = [
  {
    num: "01",
    title: "Dr. Krishna Rajendra",
    desc: "Founder, Matru Multispeciality Hospital",
    img: "/leader-default.png",
  },
  {
    num: "02",
    title: "Dr. Mahendra S K",
    desc: "Chairman and Chief Orthopaedic Surgeon, Matru Multispeciality Hospital",
    img: "/leader-default.png",
  },
  {
    num: "03",
    title: "Ms. Preeti Mahendra",
    desc: "CEO, Matru Multispeciality Hospital",
    img: "/leader-default.png",
  },
  {
    num: "04",
    title: "Mrs. Vijayalaxmi Mahendra",
    desc: "Administrative Director, Matru Multispeciality Hospital",
    img: "/leader-default.png",
  },
];

export default function ValuesSection() {
  return (
    <section className="w-full bg-[#0a0b0d] py-20 sm:py-28">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="divide-y-[3px] divide-white border-[3px] border-white">
          {VALUES.map((v, i) => {
            const reversed = i % 2 === 1;
            return (
              <div
                key={v.num}
                className={`group flex flex-col md:items-stretch ${
                  reversed ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Text — number, name, role */}
                <div className="flex flex-1 flex-col justify-between gap-10 p-8 sm:p-10 md:p-12 lg:p-14">
                  <div>
                    <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-primary-500 sm:text-5xl">
                      {v.num}
                    </span>
                    <h3 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
                      {v.title}
                    </h3>
                  </div>
                  <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                    {v.desc}
                  </p>
                </div>

                {/* Image — flush to its cell, no outline */}
                <div
                  className={`border-t-[3px] border-white p-6 sm:p-8 md:mt-0 md:w-[32%] md:border-t-0 ${
                    reversed ? "md:border-r-[3px]" : "md:border-l-[3px]"
                  }`}
                >
                  <div className="h-full w-full overflow-hidden">
                    <img
                      src={v.img}
                      alt={v.title}
                      className="aspect-square h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
