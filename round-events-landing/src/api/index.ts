import api from "./axiosInstance";
import type {
  HeroSlide,
  GalleryImage,
  Service,
  ServiceDetail,
  CareerOpening,
  Award,
  SubmitEnquiryParams,
  SubmitJobApplicationParams,
  SuccessResponse,
  GetGalleryParams,
} from "@/types/api";

// src/api/index.ts

const APP = "round_events";

export const getHeroSlides = (): Promise<HeroSlide[]> =>
  api.get(`/api/method/${APP}.api.hero_slides.get_hero_slides`).then((r) => r.data.message);

export const getGallery = ({ category, featuredOnly = false }: GetGalleryParams = {}): Promise<GalleryImage[]> =>
  api.get(`/api/method/${APP}.api.gallery.get_gallery`, {
    params: {
      ...(category && { category }),
      featured_only: featuredOnly ? 1 : 0,
    },
  }).then((r) => r.data.message);

export const getServices = (): Promise<Service[]> =>
  api.get(`/api/method/${APP}.api.services.get_services`).then((r) => r.data.message);

export const getService = (slug: string): Promise<ServiceDetail> =>
  api.get(`/api/method/${APP}.api.services.get_service`, { params: { slug } }).then((r) => r.data.message);

export const submitEnquiry = ({ fullName, phone, eventDate, budgetRange }: SubmitEnquiryParams): Promise<SuccessResponse> =>
  api.post(`/api/method/${APP}.api.enquiry.submit_enquiry`, {
    full_name: fullName, phone, event_date: eventDate, budget_range: budgetRange,
  }).then((r) => r.data.message);

export const getCareerOpenings = (): Promise<CareerOpening[]> =>
  api.get(`/api/method/${APP}.api.careers.get_career_openings`).then((r) => r.data.message);

export const submitJobApplication = ({ fullName, email, phone, positionApplied, message }: SubmitJobApplicationParams): Promise<SuccessResponse> =>
  api.post(`/api/method/${APP}.api.careers.submit_job_application`, {
    full_name: fullName, email, phone, position_applied: positionApplied, message,
  }).then((r) => r.data.message);

export const getAwards = (): Promise<Award[]> =>
  api.get(`/api/method/${APP}.api.awards.get_awards`).then((r) => r.data.message);