export interface HeroSlide {
  name: string;
  title: string;
  subtitle: string;
  image: string;
  sort_order: number;
}

// src/types/api.ts  — add this with the rest
export interface GetGalleryParams {
  category?: string;
  featuredOnly?: boolean;
}

export interface GalleryImage {
  name: string;
  image: string;
  alt_text: string;
  category: string;
  is_featured: number;
  sort_order: number;
}

export interface Service {
  name: string;
  title: string;
  slug: string;
  tagline: string;
  short_description: string;
  image: string;
  sort_order: number;
}

export interface ServiceDetail extends Service {
  full_description: string;
  features: { feature: string }[];
}

export interface CareerOpening {
  name: string;
  job_title: string;
  employment_type: string;
  location: string;
  description: string;
}

export interface Award {
  name: string;
  title: string;
  issuing_body: string;
  icon: string;
  sort_order: number;
}

export interface SubmitEnquiryParams {
  fullName: string;
  phone: string;
  eventDate?: string;
  budgetRange?: string;
}

export interface SubmitJobApplicationParams {
  fullName: string;
  email: string;
  phone?: string;
  positionApplied?: string;
  message?: string;
}

export interface SuccessResponse {
  success: boolean;
  message: string;
}