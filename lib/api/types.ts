export interface ApiHeroSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  background_image: string;
  mobile_image: string | null;
  background_video: string | null;
  primary_cta_text: string;
  primary_cta_link: string;
  secondary_cta_text: string;
  secondary_cta_link: string;
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
  hero: ApiHeroSlide[];
  about: ApiAbout;
  services: ApiService[];
  brands: unknown[];
  testimonials: ApiTestimonial[];
  timeline: ApiTimelineItem[];
  partners: ApiPartner[];
  news: ApiNewsArticle[];
  cta_banners: ApiCtaBanner[];
}
