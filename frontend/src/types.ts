export type TStrapiResponse<T> = {
  data: T | null;
  meta?: Record<string, unknown>;
  error?: {
    status?: number;
    name?: string;
    message?: string;
    details?: unknown;
  };
  success?: boolean;
  status?: number;
};

export type TImage = {
  id: number;
  documentId?: string;
  url: string;
  alternativeText?: string | null;
  width?: number;
  height?: number;
};

export type TLink = {
  id: number;
  href: string;
  label: string;
  isExternal?: boolean | null;
};

export type TFeature = {
  id: number;
  heading: string;
  subHeading: string;
  icon: "CLOCK_ICON" | "CHECK_ICON" | "CLOUD_ICON";
};

export type THeroSection = {
  id: number;
  documentId?: string;
  __component: "layout.hero-section";
  heading: string;
  subHeading: string;
  image?: TImage | null;
  link?: TLink | null;
};

export type TFeaturesSection = {
  id: number;
  documentId?: string;
  __component: "layout.features-section";
  title: string;
  description: string;
  features?: TFeature[] | null;
};

export type THomePageBlock = THeroSection | TFeaturesSection;

export type THomePage = {
  id: number;
  documentId: string;
  blocks: THomePageBlock[];
};

export type THeader = {
  id: number;
  logoText: TLink;
  ctaButton: TLink;
};

export type TFooter = {
  id: number;
  logoText: TLink;
  text: string;
  socialLink: TLink[];
};

export type TGlobal = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  header: THeader;
  footer: TFooter;
};

export type TMetaData = {
  id: number;
  documentId: string;
  title: string;
  description: string;
};