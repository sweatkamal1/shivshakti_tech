import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MarketingLayout } from "./components/MarketingLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PageLoader } from "./components/PageLoader";

const HomePage = lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import("./pages/ServicesPage").then((m) => ({ default: m.ServicesPage })));
const ServiceDetailPage = lazy(() => import("./pages/ServiceDetailPage").then((m) => ({ default: m.ServiceDetailPage })));
const BlogPage = lazy(() => import("./pages/BlogPage").then((m) => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import("./pages/BlogDetailPage").then((m) => ({ default: m.BlogDetailPage })));
const CareersPage = lazy(() => import("./pages/CareersPage").then((m) => ({ default: m.CareersPage })));
const CareerDetailPage = lazy(() => import("./pages/CareerDetailPage").then((m) => ({ default: m.CareerDetailPage })));
const ContactPage = lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const PricingPage = lazy(() => import("./pages/PricingPage").then((m) => ({ default: m.PricingPage })));
const LoginPage = lazy(() => import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import("./pages/RegisterPage").then((m) => ({ default: m.RegisterPage })));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));
const PrivacyPage = lazy(() => import("./pages/LegalPage").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import("./pages/LegalPage").then((m) => ({ default: m.TermsPage })));

const DashboardLayout = lazy(() => import("./pages/dashboard/DashboardLayout").then((m) => ({ default: m.DashboardLayout })));
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome").then((m) => ({ default: m.DashboardHome })));
const DashboardProjects = lazy(() => import("./pages/dashboard/DashboardProjects").then((m) => ({ default: m.DashboardProjects })));
const DashboardTickets = lazy(() => import("./pages/dashboard/DashboardTickets").then((m) => ({ default: m.DashboardTickets })));
const DashboardTestimonials = lazy(() => import("./pages/dashboard/DashboardTestimonials").then((m) => ({ default: m.DashboardTestimonials })));
const DashboardProfile = lazy(() => import("./pages/dashboard/DashboardProfile").then((m) => ({ default: m.DashboardProfile })));

const AdminLayout = lazy(() => import("./pages/admin/AdminLayout").then((m) => ({ default: m.AdminLayout })));
const AdminHome = lazy(() => import("./pages/admin/AdminHome").then((m) => ({ default: m.AdminHome })));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads").then((m) => ({ default: m.AdminLeads })));
const AdminContacts = lazy(() => import("./pages/admin/AdminContacts").then((m) => ({ default: m.AdminContacts })));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials").then((m) => ({ default: m.AdminTestimonials })));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog").then((m) => ({ default: m.AdminBlog })));
const AdminCareers = lazy(() => import("./pages/admin/AdminCareers").then((m) => ({ default: m.AdminCareers })));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers").then((m) => ({ default: m.AdminUsers })));
const AdminProjects = lazy(() => import("./pages/admin/AdminProjects").then((m) => ({ default: m.AdminProjects })));
const AdminTickets = lazy(() => import("./pages/admin/AdminTickets").then((m) => ({ default: m.AdminTickets })));
const AdminHomepageStats = lazy(() => import("./pages/admin/AdminHomepageStats").then((m) => ({ default: m.AdminHomepageStats })));

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<PageLoader />}>{element}</Suspense>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route index element={withSuspense(<HomePage />)} />
            <Route path="about" element={withSuspense(<AboutPage />)} />
            <Route path="services" element={withSuspense(<ServicesPage />)} />
            <Route path="services/:slug" element={withSuspense(<ServiceDetailPage />)} />
            <Route path="blog" element={withSuspense(<BlogPage />)} />
            <Route path="blog/:slug" element={withSuspense(<BlogDetailPage />)} />
            <Route path="careers" element={withSuspense(<CareersPage />)} />
            <Route path="careers/:slug" element={withSuspense(<CareerDetailPage />)} />
            <Route path="contact" element={withSuspense(<ContactPage />)} />
            <Route path="pricing" element={withSuspense(<PricingPage />)} />
            <Route path="login" element={withSuspense(<LoginPage />)} />
            <Route path="register" element={withSuspense(<RegisterPage />)} />
            <Route path="privacy" element={withSuspense(<PrivacyPage />)} />
            <Route path="terms" element={withSuspense(<TermsPage />)} />
            <Route path="*" element={withSuspense(<NotFoundPage />)} />
          </Route>

          <Route element={<ProtectedRoute roles={["CLIENT"]} />}>
            <Route path="dashboard" element={withSuspense(<DashboardLayout />)}>
              <Route index element={withSuspense(<DashboardHome />)} />
              <Route path="projects" element={withSuspense(<DashboardProjects />)} />
              <Route path="tickets" element={withSuspense(<DashboardTickets />)} />
              <Route path="testimonials" element={withSuspense(<DashboardTestimonials />)} />
              <Route path="profile" element={withSuspense(<DashboardProfile />)} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={["ADMIN", "STAFF"]} />}>
            <Route path="admin" element={withSuspense(<AdminLayout />)}>
              <Route index element={withSuspense(<AdminHome />)} />
              <Route path="leads" element={withSuspense(<AdminLeads />)} />
              <Route path="contacts" element={withSuspense(<AdminContacts />)} />
              <Route path="testimonials" element={withSuspense(<AdminTestimonials />)} />
              <Route path="blog" element={withSuspense(<AdminBlog />)} />
              <Route path="careers" element={withSuspense(<AdminCareers />)} />
              <Route path="users" element={withSuspense(<AdminUsers />)} />
              <Route path="projects" element={withSuspense(<AdminProjects />)} />
              <Route path="tickets" element={withSuspense(<AdminTickets />)} />
              <Route path="homepage-stats" element={withSuspense(<AdminHomepageStats />)} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
