import { clientBrands } from "../../lib/site-data";

export function ClientLogos() {
  const brands = clientBrands;
  const doubled = [...brands, ...brands];

  return (
    <section className="overflow-hidden bg-white py-14">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-3 text-center text-2xl font-bold text-slate-900 md:text-3xl">
          Our Valued Customers
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-slate-600">
          We are trusted by exceptional brands as well as SMEs in different industries because
          we believe in providing real value and easing complex business processes with our solutions.
        </p>
      </div>
      <div className="relative flex overflow-hidden border-y border-slate-100 bg-slate-50 py-8">
        <div className="animate-marquee flex shrink-0 items-center gap-16 whitespace-nowrap px-8">
          {doubled.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="text-xl font-bold uppercase tracking-wide text-slate-300 transition hover:text-slate-500"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
