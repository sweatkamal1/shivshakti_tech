import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SITE_URL = "https://shivshaktitechnology.com";
const today = new Date().toISOString().slice(0, 10);

const staticPages = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/about", priority: "0.8", changefreq: "monthly" },
  { loc: "/services", priority: "0.9", changefreq: "weekly" },
  { loc: "/contact", priority: "0.8", changefreq: "monthly" },
  { loc: "/pricing", priority: "0.7", changefreq: "monthly" },
  { loc: "/blog", priority: "0.8", changefreq: "weekly" },
  { loc: "/careers", priority: "0.7", changefreq: "weekly" },
  { loc: "/privacy", priority: "0.3", changefreq: "yearly" },
  { loc: "/terms", priority: "0.3", changefreq: "yearly" },
];

const serviceSlugs = [
  "web-development", "mobile-app-development", "saas-product-development",
  "crm-development", "erp-development", "ai-solutions-automation",
  "custom-software-development", "ecommerce-development", "cloud-solutions",
  "api-development", "devops-services", "maintenance-support", "it-consulting",
  "seo-services", "digital-marketing", "social-media-marketing", "ui-ux-design",
  "figma-design", "branding", "logo-design", "poster-banner-design",
];

const careerSlugs = ["senior-full-stack-developer", "ui-ux-designer"];

const blogSlugs = [
  "shivshakti-technology-it-company-bhagalpur-bihar",
  "web-development-services-bihar-shivshakti",
  "mobile-app-development-india-shivshakti",
  "salesforce-consulting-india-shivshakti",
  "digital-transformation-small-business-2026",
  "cloud-migration-aws-gcp-azure-shivshakti",
  "why-custom-software-2026",
  "signs-digital-transformation",
];

function urlEntry(loc, priority, changefreq) {
  return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const urls = [
  ...staticPages.map((p) => urlEntry(p.loc, p.priority, p.changefreq)),
  ...serviceSlugs.map((s) => urlEntry(`/services/${s}`, "0.7", "monthly")),
  ...careerSlugs.map((s) => urlEntry(`/careers/${s}`, "0.6", "weekly")),
  ...blogSlugs.map((s) => urlEntry(`/blog/${s}`, "0.6", "monthly")),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`Sitemap written: ${out} (${urls.length} URLs)`);
