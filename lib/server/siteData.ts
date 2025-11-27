// lib/server/siteData.ts
import { kv } from "@vercel/kv";

export type ServiceItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type ProductItem = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
};

export type TopicItem = {
  id: string;
  title: string;
  summary?: string;
  detail?: string;
  thumbnailUrl?: string;
};

export type ServiceDetailSection = {
  id: string;
  title: string;
  description?: string;
  images?: string[];
};

export type ServiceDetailItem = {
  id: string;
  topicId: string;
  title: string;
  description?: string;
  images?: string[];
  sections?: ServiceDetailSection[];
};

export type ThemeColors = {
  primary: string;
  primarySoft: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
};

export type SiteConfig = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  phone?: string;
  line?: string;
  lineUrl?: string;
  facebook?: string;
  mapUrl?: string;
  services: ServiceItem[];
  products?: ProductItem[];
  productsSections?: {
    home: ProductItem[];
    page2: ProductItem[];
  };
  topics?: TopicItem[];
  serviceDetails?: ServiceDetailItem[];
  homeGallery?: string[];
  theme?: ThemeColors;
};

const defaultTheme: ThemeColors = {
  primary: "#f97316",
  primarySoft: "#ffedd5",
  accent: "#dc2626",
  background: "#ffffff",
  surface: "#fef3c7",
  text: "#0f172a",
};

const defaultConfig: SiteConfig = {
  heroTitle: "ShodaiEV",
  heroSubtitle: "ขายของเกี่ยวกับรถ",
  phone: "",
  line: "",
  lineUrl: "",
  facebook: "",
  mapUrl: "",
  services: [],
  products: [],
  productsSections: {
    home: [],
    page2: [],
  },
  topics: [],
  serviceDetails: [],
  homeGallery: [],
  theme: defaultTheme,
};

const SITE_CONFIG_KEY = "site-config-v1";

export async function loadSiteData(): Promise<SiteConfig> {
  const stored = await kv.get<SiteConfig>(SITE_CONFIG_KEY);

  if (!stored) {
    await kv.set(SITE_CONFIG_KEY, defaultConfig);
    return defaultConfig;
  }

  const parsed = stored || {};

  return {
    ...defaultConfig,
    ...parsed,
    services: Array.isArray(parsed.services) ? parsed.services : [],
    products: Array.isArray(parsed.products) ? parsed.products : [],
    productsSections: parsed.productsSections ?? { home: [], page2: [] },
    topics: Array.isArray(parsed.topics) ? parsed.topics : [],
    serviceDetails: Array.isArray(parsed.serviceDetails)
      ? parsed.serviceDetails
      : [],
    homeGallery: Array.isArray(parsed.homeGallery) ? parsed.homeGallery : [],
    theme: parsed.theme ?? defaultTheme,
  };
}

export async function saveSiteData(data: SiteConfig): Promise<void> {
  await kv.set(SITE_CONFIG_KEY, data);
}
