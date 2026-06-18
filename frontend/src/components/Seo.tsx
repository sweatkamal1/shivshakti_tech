import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "../lib/seo-config";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: BreadcrumbItem[];
}

function buildUrl(path: string) {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return normalizedPath ? `${SITE_URL}${normalizedPath}` : `${SITE_URL}/`;
}

function buildTitle(title: string) {
  return title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
}

export function Seo({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
  breadcrumbs,
}: SeoProps) {
  const url = buildUrl(path);
  const fullTitle = buildTitle(title);
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  const schemas: Record<string, unknown>[] = [];
  if (jsonLd) {
    schemas.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]));
  }
  if (breadcrumbs?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: buildUrl(item.path),
      })),
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
