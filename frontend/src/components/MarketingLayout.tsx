import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ConsultationModal } from "./ConsultationModal";
import { PageLoader } from "./PageLoader";

export function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ConsultationModal />
    </div>
  );
}
