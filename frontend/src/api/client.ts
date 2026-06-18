const API_BASE = import.meta.env.VITE_API_URL || "";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: unknown;
}

export async function api<T>(
  path: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = json.errors ? ` — ${JSON.stringify(json.errors)}` : "";
    throw new Error((json.message || "Request failed") + detail);
  }
  return json;
}

export const publicApi = {
  services: () => api<Service[]>("/api/services"),
  service: (slug: string) => api<Service>(`/api/services/${slug}`),
  blog: () => api<BlogPost[]>("/api/blog"),
  blogPost: (slug: string) => api<BlogPost>(`/api/blog/${slug}`),
  careers: () => api<Career[]>("/api/careers"),
  career: (slug: string) => api<Career>(`/api/careers/${slug}`),
  testimonials: () => api<Testimonial[]>("/api/testimonials"),
  faqs: () => api<FAQ[]>("/api/faqs"),
  stats: () => api<HomepageStat[]>("/api/stats"),
};

export interface User {
  id: string;
  email: string;
  role: "CLIENT" | "ADMIN" | "STAFF";
  profile?: {
    firstName: string;
    lastName: string;
    company?: string;
    phone?: string;
  };
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  features: string[];
  technologies: string[];
  isFeatured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  publishedAt?: string;
}

export interface Career {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  company?: string;
  role?: string;
  content: string;
  rating: number;
  status?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface HomepageStat {
  value: number;
  suffix?: string;
  label: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  status: string;
  progress: number;
  milestones?: { id: string; title: string; status: string }[];
}

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
}
