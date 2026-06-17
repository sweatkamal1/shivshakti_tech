import { FadeIn } from "../motion/FadeIn";

export function WhyChooseSection({ items }: { items: { label: string; icon: string }[] }) {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <div className="mb-12 text-center">
            <h2 className="section-title">
              Why Choose ShivShakti: Your IT Consulting Partner?
            </h2>
            <p className="section-subtitle mx-auto">
              Highly skilled team and a proven track record — we consult, implement, develop,
              and integrate technology platforms to unleash the full potential of your business.
            </p>
          </div>
        </FadeIn>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-1/2 top-1/2 z-10 hidden h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-[#0052cc] bg-white shadow-lg md:flex">
            <span className="text-center text-xs font-bold leading-tight text-[#0052cc]">
              ShivShakti
              <br />
              Tech
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {items.map((item, i) => (
              <FadeIn key={item.label} delay={i}>
                <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-5 text-center transition hover:border-[#0052cc]/30 hover:shadow-md">
                  <span className="mb-3 text-2xl">{item.icon}</span>
                  <span
                    className={`font-semibold text-slate-800 ${
                      item.label === "Continuous improvement" ? "whitespace-nowrap text-[13px]" : "text-sm"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
