import { DEFAULT_OG_IMAGE, SITE_EMAIL, SITE_NAME, SITE_PHONE, SITE_URL } from "./seo-config";

const address = {
  "@type": "PostalAddress",
  streetAddress: "Baijani",
  addressLocality: "Bhagalpur",
  addressRegion: "Bihar",
  postalCode: "812001",
  addressCountry: "IN",
};

const geo = {
  "@type": "GeoCoordinates",
  latitude: 25.2425,
  longitude: 86.9842,
};

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: DEFAULT_OG_IMAGE,
    description:
      "Software development and IT consulting company in Bhagalpur, Bihar offering web, mobile, CRM, and cloud solutions.",
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    address,
    sameAs: [],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: DEFAULT_OG_IMAGE,
    url: SITE_URL,
    telephone: SITE_PHONE,
    email: SITE_EMAIL,
    priceRange: "₹₹",
    address,
    geo,
    areaServed: ["Bhagalpur", "Bihar", "India"],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/services?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema(title: string, description: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: { "@type": "State", name: "Bihar" },
    url: `${SITE_URL}/services/${slug}`,
  };
}

export function blogPostingSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishedAt?: string;
  coverImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
    },
    datePublished: post.publishedAt ?? new Date().toISOString(),
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: post.coverImage ?? DEFAULT_OG_IMAGE,
  };
}

export function jobPostingSchema(job: {
  title: string;
  description: string;
  slug: string;
  location: string;
  employmentType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
      logo: DEFAULT_OG_IMAGE,
    },
    jobLocation: {
      "@type": "Place",
      address: { ...address, addressLocality: job.location || "Bhagalpur" },
    },
    employmentType: job.employmentType.toUpperCase().replace("-", "_"),
    url: `${SITE_URL}/careers/${job.slug}`,
  };
}

export function homePageSchemas() {
  return [organizationSchema(), localBusinessSchema(), websiteSchema()];
}
