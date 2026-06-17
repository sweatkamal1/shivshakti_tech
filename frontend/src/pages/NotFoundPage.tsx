import { Link } from "react-router-dom";
import { FadeIn } from "../components/motion/FadeIn";

export function NotFoundPage() {
  return (
    <div className="section-padding flex min-h-[60vh] items-center justify-center">
      <FadeIn>
        <div className="mx-auto max-w-lg px-4 text-center">
          <p className="text-6xl font-bold text-brand">404</p>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
          <p className="mt-3 text-slate-600">
            The page you are looking for does not exist or may have been moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
