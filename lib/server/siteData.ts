// lib/server/siteData.ts
import { getDb } from "./mongodb";

export type ServiceItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type ProductItem = {
  page: number;
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
  seoServiceDetailDescriptionSuffix: string;
  seoServiceDetailTitlePrefix: string;

  heroTitle?: string;
  heroSubtitle?: string;
  heroImageUrl?: string;
  phone?: string;
  line?: string;
  lineUrl?: string;
  facebook?: string;
  facebookUrl?: string;
  mapUrl?: string;

  businessName?: string;
  businessAddress?: string;
  businessGeoLat?: number;
  businessGeoLng?: number;

  seoTitleHome?: string;
  seoDescriptionHome?: string;

  services: ServiceItem[];
  products?: ProductItem[];
  productsSections?: {
    home: ProductItem[];
    page2: ProductItem[];
  };
  topics?: TopicItem[];
  serviceDetails?: ServiceDetailItem[];

  theme?: ThemeColors;
  homeGallery?: string[];
};

export const defaultTheme: ThemeColors = {
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
  businessName: "ShodaiEV",
  businessAddress: "",
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
  seoServiceDetailDescriptionSuffix: "",
  seoServiceDetailTitlePrefix: "",
};

function normalizeConfig(raw: Partial<SiteConfig> | null): SiteConfig {
  const parsed = raw || {};

  // ====== จัดการ productsSections ให้มีค่าเสมอ ======
  const normalizedProductsSections = {
    home: Array.isArray(parsed.productsSections?.home)
      ? parsed.productsSections!.home
      : Array.isArray(parsed.products)
      ? parsed.products!
      : [],
    page2: Array.isArray(parsed.productsSections?.page2)
      ? parsed.productsSections!.page2
      : [],
  };

  // ====== จัดการ products ให้ sync กับ productsSections.home ======
  const normalizedProducts =
    Array.isArray(parsed.products) && parsed.products.length > 0
      ? parsed.products
      : normalizedProductsSections.home;

  return {
    ...defaultConfig,
    ...parsed,

    // list หลักต่าง ๆ
    services: Array.isArray(parsed.services) ? parsed.services : [],

    // ใช้ normalizedProducts ที่ซิงค์ไว้แล้ว
    products: normalizedProducts,

    productsSections: normalizedProductsSections,

    topics: Array.isArray(parsed.topics) ? parsed.topics : [],
    serviceDetails: Array.isArray(parsed.serviceDetails)
      ? parsed.serviceDetails
      : [],
    homeGallery: Array.isArray(parsed.homeGallery)
      ? parsed.homeGallery
      : [],

    theme: parsed.theme
      ? { ...defaultTheme, ...parsed.theme }
      : defaultTheme,
  };
}


const COLLECTION = "site_config";
const DOC_ID = "main";

export async function loadSiteData(): Promise<SiteConfig> {
  const db = await getDb();
  const col =
    db.collection<{ _id: string; data: SiteConfig }>(COLLECTION);
  const doc = await col.findOne({ _id: DOC_ID });

  if (!doc || !doc.data) {
    const normalized = normalizeConfig(defaultConfig);
    await col.updateOne(
      { _id: DOC_ID },
      { $set: { data: normalized } },
      { upsert: true }
    );
    return normalized;
  }

  return normalizeConfig(doc.data);
}

export async function saveSiteData(data: SiteConfig): Promise<void> {
  const db = await getDb();
  const col =
    db.collection<{ _id: string; data: SiteConfig }>(COLLECTION);
  const normalized = normalizeConfig(data);

  await col.updateOne(
    { _id: DOC_ID },
    { $set: { data: normalized } },
    { upsert: true }
  );
}

/* -------------------------------------------------------------
 *  Section-based save helpers
 * ------------------------------------------------------------*/

export type HeroPayload = Pick<
  SiteConfig,
  | "heroTitle"
  | "heroSubtitle"
  | "heroImageUrl"
  | "phone"
  | "line"
  | "lineUrl"
  | "facebook"
  | "facebookUrl"
  | "mapUrl"
>;

export async function saveHeroSection(payload: HeroPayload) {
  const current = await loadSiteData();
  await saveSiteData({ ...current, ...payload });
}

export type HomeGalleryPayload = Pick<SiteConfig, "homeGallery">;

export async function saveHomeGallerySection(
  payload: HomeGalleryPayload
) {
  const current = await loadSiteData();
  await saveSiteData({ ...current, ...payload });
}

export type ServicesPayload = Pick<SiteConfig, "services">;

export async function saveServicesSection(payload: ServicesPayload) {
  const current = await loadSiteData();
  await saveSiteData({ ...current, ...payload });
}

export type TopicsPayload = Pick<SiteConfig, "topics">;

export async function saveTopicsSection(payload: TopicsPayload) {
  const current = await loadSiteData();
  await saveSiteData({ ...current, ...payload });
}

export type ServiceDetailPayload = Pick<SiteConfig, "serviceDetails">;

export async function saveServiceDetailSection(
  payload: ServiceDetailPayload
) {
  const current = await loadSiteData();
  await saveSiteData({ ...current, ...payload });
}

export type ContactPayload = Pick<
  SiteConfig,
  "phone" | "line" | "lineUrl" | "facebook" | "mapUrl"
>;

export async function saveContactSection(payload: ContactPayload) {
  const current = await loadSiteData();
  await saveSiteData({ ...current, ...payload });
}

export type ThemePayload = Pick<SiteConfig, "theme">;

export async function saveThemeSection(payload: ThemePayload) {
  const current = await loadSiteData();
  await saveSiteData({ ...current, ...payload });
}
