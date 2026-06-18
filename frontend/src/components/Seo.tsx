import { useEffect } from "react";

const SITE_URL = "https://shivshaktitechnology.com";
const SITE_NAME = "ShivShakti Technology";
const DEFAULT_IMAGE = `${SITE_URL}/shivshakti-logo.png`;

export interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function Seo({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, path ? undefined : "/");
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    upsertMeta("description", description);
    upsertMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", url);

    upsertMeta("og:type", type, "property");
    upsertMeta("og:site_name", SITE_NAME, "property");
    upsertMeta("og:title", fullTitle, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:url", url, "property");
    upsertMeta("og:image", image, "property");

    upsertMeta("twitter:card", "summary_large_image");
    upsertMeta("twitter:title", fullTitle);
    upsertMeta("twitter:description", description);
    upsertMeta("twitter:image", image);
  }, [title, description, path, image, type, noindex]);

  return null;
}
