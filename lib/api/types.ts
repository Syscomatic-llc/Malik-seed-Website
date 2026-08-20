export interface ApiCtaButton {
  type: string;
  text: string;
  link: string;
}

export interface ApiHeroSlide {
  id: number;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  background_image: string;
  mobile_image?: string | null;
  background_video?: string | null;
  primary_cta_text?: string | null;
  primary_cta_link?: string | null;
  secondary_cta_text?: string | null;
  secondary_cta_link?: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiAboutStat {
  value: string;
  label: string;
}

export interface ApiAbout {
  id: number;
  title: string;
  subtitle: string | null;
  description: string;
  image_url: string;
  gallery_images: string[] | null;
  video_url: string | null;
  video_thumbnail: string | null;
  cta_text: string;
  cta_link: string;
  stats: ApiAboutStat[] | string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ApiService {
  id: number;
  title: string;
  description: string;
  icon: string;
  image_url: string;
  link: string;
  link_text: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiTestimonial {
  id: number;
  name: string;
  designation: string;
  company: string;
  content: string;
  rating: number;
  avatar_url: string | null;
  video_url: string | null;
  video_thumbnail: string | null;
  testimonial_type: string;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiTimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  image_url: string | null;
  gallery_images: string[] | null;
  is_milestone: boolean;
  milestone_icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiPartner {
  id: number;
  name: string;
  logo_url: string;
  is_active?: boolean;
}

export interface ApiNewsArticle {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  image_url: string;
  display_date: string;
  article_slug: string | null;
  external_link: string | null;
  publish_date: string | null;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiCtaBanner {
  id: number;
  title: string;
  subtitle: string;
  description: string | null;
  background_image: string;
  background_color: string | null;
  cta_text: string;
  cta_link: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiHomepageData {
  hero: ApiHeroSlide[] | { slides: ApiHeroSlide[]; cta_buttons?: ApiCtaButton[] };
  about: ApiAbout;
  services: ApiService[];
  brands: unknown[];
  testimonials: ApiTestimonial[];
  timeline: ApiTimelineItem[];
  partners: ApiPartner[];
  news: ApiNewsArticle[];
  cta_banners: ApiCtaBanner[];
}

export interface ApiNewsArticle {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  tags: string[];
  meta_keywords: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  featured_image: string | null;
  gallery_images: string[];
  video_url: string | null;
  video_thumbnail: string | null;
  author_name: string | null;
  author_title: string | null;
  author_bio: string | null;
  author_avatar: string | null;
  is_active: boolean;
  is_featured: boolean;
  is_published: boolean;
  view_count: number;
  share_count: number;
  related_article_ids: number[];
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface ApiNewsCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  icon: string | null;
  article_count: number;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiPressRelease {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published_at: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface ApiNewsPageData {
  articles: ApiNewsArticle[];
  featured_articles: ApiNewsArticle[];
  categories: ApiNewsCategory[];
  press_releases: ApiPressRelease[];
}

export interface ApiContactInfo {
  id: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postal_code: string | null;
  phone_primary: string | null;
  phone_secondary: string | null;
  email_primary: string | null;
  email_secondary: string | null;
  facebook_url: string | null;
  twitter_url: string | null;
  instagram_url: string | null;
  linkedin_url: string | null;
  youtube_url: string | null;
  map_image_url: string | null;
  map_embed_url: string | null;
  business_hours: { day: string; hours: string }[] | null;
  is_active: boolean;
  footer_description: string | null;
  subject_options: string[];
  created_at: string;
  updated_at: string;
}

export interface ApiContactLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  postal_code: string | null;
  phone: string | null;
  email: string | null;
  image_url: string | null;
  map_url: string | null;
  is_headquarters: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiFaq {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_featured: boolean;
  sort_order: number;
  is_active: boolean;
  view_count: number;
  created_at: string;
  updated_at: string | null;
}

export interface ApiContactPageData {
  info: ApiContactInfo;
  locations: ApiContactLocation[];
  faqs: ApiFaq[];
  featured_faqs: ApiFaq[];
}

export interface ApiContactSubmitResponse {
  status: string;
  message: string;
  id?: number;
}

export interface ApiGalleryItem {
  thumbnail_url: string | null;
  id: number;
  description: string | null;
  tags: string[];
  date_taken: string | null;
  is_active: boolean;
  created_at: string;
  title: string;
  image_url: string;
  category: string | null;
  location: string | null;
  is_featured: boolean;
  sort_order: number;
  updated_at: string | null;
}

export interface ApiGalleryCategory {
  name: string;
  cover_image: string | null;
  item_count: number;
  sort_order: number;
  updated_at: string | null;
  slug: string;
  description: string | null;
  id: number;
  is_active: boolean;
  created_at: string;
}

export interface ApiGalleryVideo {
  id: number;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface ApiGalleryData {
  items: ApiGalleryItem[];
  featured_items: ApiGalleryItem[];
  categories: ApiGalleryCategory[];
  videos: ApiGalleryVideo[];
}

export interface ApiOurStoryHero {
  id: number;
  title: string;
  subtitle: string;
  background_image: string;
  background_video: string | null;
  background_images: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiOurStoryMission {
  id: number;
  title: string;
  description: string;
  vision_title?: string | null;
  vision_description: string | null;
  image_url: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiOurStoryValue {
  id: number;
  title: string;
  description: string;
  icon: string | null;
  image_url: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiOurStoryTimelineItem {
  id: number;
  year: string;
  title: string;
  description: string;
  image_url: string | null;
  is_milestone: boolean;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiOurStoryData {
  hero: ApiOurStoryHero;
  mission: ApiOurStoryMission;
  values: ApiOurStoryValue[];
  timeline: ApiOurStoryTimelineItem[];
  team: unknown[];
  leadership: unknown[];
  awards: unknown[];
}

export interface ApiJobPosition {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  job_type: string;
  experience_required: string;
  education_required: string | null;
  salary?: string | null;
  salary_range: string | null;
  salary_currency: string;
  salary_note?: string | null;
  is_active: boolean;
  is_featured: boolean;
  is_urgent: boolean;
  positions_available: number;
  description: string;
  short_description: string;
  requirements: string[];
  responsibilities: string[];
  skills_required: string[];
  benefits: string[];
  has_assessment: boolean;
  assessment_duration: number;
  passing_score?: number | null;
  view_count: number;
  application_count: number;
  application_deadline: string | null;
  created_at: string;
  updated_at: string | null;
  details_pdf_url: string | null;
  sort_order?: number;
}

export interface ApiJobPositionDetailResponse {
  position: ApiJobPosition;
  assessment_questions: any[];
}


export interface ApiHiringBenefit {
  id: number;
  title: string;
  description: string | null;
  icon: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiHiringTestimonial {
  id: number;
  name: string;
  designation: string;
  content: string;
  avatar_url: string | null;
  department: string;
  years_at_company: number | null;
  video_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ApiHiringPageContent {
  id?: number;
  heroSection?: {
    badge?: string;
    ctaSecondary?: {
      href: string;
      label: string;
    };
    teamImage?: string;
  };
  careerManifesto?: {
    badge?: string;
    images?: string[];
  };
  teamCulture?: {
    badge?: string;
    images?: string[];
  };
  futureProgram?: {
    badge?: string;
    image?: string;
  };
  is_active?: boolean;
  created_at?: string;
  updated_at?: string | null;
}

export interface ApiHiringData {
  page_content: ApiHiringPageContent | null;
  positions: ApiJobPosition[];
  benefits: ApiHiringBenefit[];
  testimonials: ApiHiringTestimonial[];
}

export interface ApiBrand {
  id: number;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  long_description: string | null;
  logo_url: string | null;
  image_url: string | null;
  hero_image: string | null;
  gallery_images: string[];
  features: string[];
  stats: any[];
  link: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string | null;
}

export interface SiteSettings {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  logoUrl: string;
  googleAnalyticsId: string;
  googleSearchConsoleVerification: string;
  maintenanceMode: boolean;
}

export interface ApiSiteSettings {
  id: number;
  site_name: string;
  site_tagline: string | null;
  site_description: string | null;
  logo_url: string | null;
  google_analytics_id: string | null;
  google_search_console_verification: string | null;
  maintenance_mode?: boolean | null;
}

export interface ApiPageSeo {
  id: number;
  page_path: string;
  title: string;
  meta_title: string;
  meta_description: string;
  meta_keywords?: string | null;
  og_image?: string | null;
  og_title?: string | null;
  og_description?: string | null;
}

// Potato Seed Brand API Response
export interface ApiPotatoSeedDataResponse {
  potatoSeedData?: {
    hero?: {
      bgImage?: string;
    };
    intro?: {
      highlights?: string[];
    };
    grid?: {
      badge?: string;
      images?: string[];
    };
    split?: {
      badge?: string;
      image?: string;
    };
    youtube?: {
      youtubeUrl?: string;
      images?: string[];
      brandLogo?: string;
    };
  };
}

export interface ApiInnovationDevelopmentProject {
  title?: string;
  duration?: string;
  focus?: string;
  location?: string;
  donor?: string;
}

export interface ApiInnovationDevelopmentDataResponse {
  innovationDevelopmentData?: {
    hero?: {
      bgImage?: string;
    };
    intro?: {
      stats?: Array<{
        label?: string;
        value?: number | string;
        suffix?: string;
      }>;
      highlights?: string[];
    };
    split1?: {
      badge?: string;
      image?: string;
    };
    grid?: {
      badge?: string;
      images?: string[];
    };
    split2?: {
      badge?: string;
      image?: string;
    };
    Projects?: ApiInnovationDevelopmentProject[];
  };
}

export interface ApiMaliksFarmContent {
  hero?: {
    bgImage?: string;
  };
  intro?: {
    stats?: Array<{
      label?: string;
      value?: number | string;
      suffix?: string;
    }>;
  };
  split1?: {
    badge?: string;
    image?: string;
  };
  split2?: {
    badge?: string;
    image?: string;
    images?: string[];
    gallery?: string[];
    tags?: Record<string, string[]>;
  };
  process?: {
    badge?: string;
    images?: string[];
  };
  training?: {
    badge?: string;
    programs?: Array<{
      id?: string;
      title?: string;
      image?: string;
    }>;
    facilities?: Array<{
      title?: string;
      description?: string;
      image?: string;
      beds?: number;
      capacity?: number;
    }>;
  };
  testimonials?: {
    badge?: string;
    visitorScans?: Array<{
      image?: string;
      title?: string;
    }>;
  };
  cropPortfolio?: {
    groups?: Array<{
      category?: string;
      items?: any[];
    }>;
  };
}

export interface ApiMaliksFarmDataResponse extends ApiMaliksFarmContent {
  maliksFarmData?: ApiMaliksFarmContent;
}

export interface ApiMaliksFlowerContent {
  hero?: {
    bgImage?: string;
  };
  intro?: {
    highlights?: string[];
  };
  grid?: {
    badge?: string;
    images?: string[];
  };
  split?: {
    badge?: string;
    image?: string;
  };
  portfolio?: {
    badge?: string;
    card?: Array<{
      name?: string;
      image?: string;
    }>;
  };
}

export interface ApiMaliksFlowerDataResponse extends ApiMaliksFlowerContent {
  maliksFlowerData?: ApiMaliksFlowerContent;
}









