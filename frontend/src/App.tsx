import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MarketingLayout } from "./components/MarketingLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServiceDetailPage } from "./pages/ServiceDetailPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { CareersPage } from "./pages/CareersPage";
import { CareerDetailPage } from "./pages/CareerDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { PricingPage } from "./pages/PricingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardLayout } from "./pages/dashboard/DashboardLayout";
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { DashboardProjects } from "./pages/dashboard/DashboardProjects";
import { DashboardTickets } from "./pages/dashboard/DashboardTickets";
import { DashboardTestimonials } from "./pages/dashboard/DashboardTestimonials";
import { DashboardProfile } from "./pages/dashboard/DashboardProfile";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminHome } from "./pages/admin/AdminHome";
import { AdminLeads } from "./pages/admin/AdminLeads";
import { AdminContacts } from "./pages/admin/AdminContacts";
import { AdminTestimonials } from "./pages/admin/AdminTestimonials";
import { AdminBlog } from "./pages/admin/AdminBlog";
import { AdminCareers } from "./pages/admin/AdminCareers";
import { AdminUsers } from "./pages/admin/AdminUsers";
import { AdminProjects } from "./pages/admin/AdminProjects";
import { AdminTickets } from "./pages/admin/AdminTickets";
import { AdminHomepageStats } from "./pages/admin/AdminHomepageStats";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PrivacyPage, TermsPage } from "./pages/LegalPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogDetailPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="careers/:slug" element={<CareerDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="pricing" element={<PricingPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route element={<ProtectedRoute roles={["CLIENT"]} />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="projects" element={<DashboardProjects />} />
              <Route path="tickets" element={<DashboardTickets />} />
              <Route path="testimonials" element={<DashboardTestimonials />} />
              <Route path="profile" element={<DashboardProfile />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute roles={["ADMIN", "STAFF"]} />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="leads" element={<AdminLeads />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="careers" element={<AdminCareers />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="homepage-stats" element={<AdminHomepageStats />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
