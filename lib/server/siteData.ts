// lib/server/siteData.ts
import fs from "fs/promises";
import path from "path";
import { put, list, del } from "@vercel/blob";

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

const filePath = path.join(process.cwd(), "data", "site.json");

// ใช้ตรวจว่าโปรเจกต์มี Blob token ไหม
const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
// path ที่จะเก็บ config ใน Blob
const CONFIG_BLOB_PATH = "config/site.json";

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
  return {
    ...defaultConfig,
    ...parsed,
    services: Array.isArray(parsed.services) ? parsed.services : [],
    products: Array.isArray(parsed.products) ? parsed.products : [],
    productsSections:
      parsed.productsSections ?? { home: [], page2: [] },
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

/* ---------- โหลดจาก Blob ---------- */

async function loadFromBlob(): Promise<SiteConfig> {
  // หา blob ที่ path ตรงกับ CONFIG_BLOB_PATH
  const { blobs } = await list({
    prefix: CONFIG_BLOB_PATH,
    limit: 1,
  });

  if (!blobs || blobs.length === 0) {
    // ถ้ายังไม่มีไฟล์เลย → seed ด้วย defaultConfig
    await saveToBlob(defaultConfig);
    return defaultConfig;
  }

  const blob = blobs[0];

  const res = await fetch(blob.url, {
    // กัน cache เก่า
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch config blob");
  }

  const json = (await res.json()) as Partial<SiteConfig>;
  return normalizeConfig(json);
}

async function saveToBlob(cfg: SiteConfig): Promise<void> {
  const normalized = normalizeConfig(cfg);

  // ลบ blob เดิม (ถ้ามี) ก่อน เพื่อให้ใช้ path เดิมได้
  await del(CONFIG_BLOB_PATH).catch(() => {});

  await put(
    CONFIG_BLOB_PATH,
    JSON.stringify(normalized),
    {
      access: "public",
      contentType: "application/json",
      // cache ที่ edge 1 นาทีพอ เวลาแก้ config แล้วจะไม่ค้างนาน
      cacheControlMaxAge: 60,
    }
  );
}

/* ---------- Fallback เป็นไฟล์ local ---------- */

async function loadFromFile(): Promise<SiteConfig> {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(content);
    return normalizeConfig(parsed);
  } catch (err: any) {
    if (err.code === "ENOENT") {
      const normalized = normalizeConfig(defaultConfig);
      const dir = path.dirname(filePath);
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(
        filePath,
        JSON.stringify(normalized, null, 2),
        "utf8"
      );
      return normalized;
    }
    throw err;
  }
}

async function saveToFile(cfg: SiteConfig): Promise<void> {
  const normalized = normalizeConfig(cfg);
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    filePath,
    JSON.stringify(normalized, null, 2),
    "utf8"
  );
}

/* ---------- ฟังก์ชันที่ใช้จริงในโปรเจกต์ ---------- */

export async function loadSiteData(): Promise<SiteConfig> {
  if (hasBlob) {
    return loadFromBlob();
  }
  return loadFromFile();
}

export async function saveSiteData(data: SiteConfig): Promise<void> {
  if (hasBlob) {
    await saveToBlob(data);
    return;
  }
  await saveToFile(data);
}
