import weddingImg from "@/assets/wedding.jpg";
import corporateImg from "@/assets/corporate.jpg";
import birthdayImg from "@/assets/birthday.jpg";
import rentalsImg from "@/assets/rentals.jpg";
import gallery1 from "@/assets/gallery1.jpg";
import gallery2 from "@/assets/gallery2.jpg";
import gallery3 from "@/assets/gallery3.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export const services = [
  {
    slug: "weddings",
    title: "Weddings",
    tagline: "Luxury Weddings",
    description: "From traditional ceremonies to contemporary celebrations, we create dream weddings that reflect your unique love story. Our dedicated team handles every aspect — from venue selection and décor to catering and entertainment — ensuring your special day is nothing short of magical.",
    image: weddingImg,
    features: ["Venue Selection & Décor", "Catering & Menu Design", "Photography & Videography", "Entertainment & Music", "Guest Management"],
  },
  {
    slug: "corporate-events",
    title: "Corporate Events",
    tagline: "Corporate Excellence",
    description: "Impress stakeholders with perfectly orchestrated conferences, product launches, and corporate galas. We understand corporate culture and deliver events that enhance your brand image and create meaningful connections.",
    image: corporateImg,
    features: ["Conference Setup", "Product Launches", "Team Building Events", "Award Ceremonies", "Brand Activations"],
  },
  {
    slug: "birthday-parties",
    title: "Birthday Parties",
    tagline: "Celebration Moments",
    description: "Celebrate milestones with themed parties, elegant décor, and unforgettable entertainment experiences. From intimate gatherings to grand celebrations, we make every birthday special.",
    image: birthdayImg,
    features: ["Themed Décor", "Custom Cakes & Catering", "Entertainment Acts", "Photo Booths", "Party Favors"],
  },
  {
    slug: "rentals",
    title: "Rentals",
    tagline: "Premium Setups",
    description: "Premium event equipment, furniture, and décor rentals to elevate any occasion with sophistication. Our extensive inventory includes everything you need for a flawless event.",
    image: rentalsImg,
    features: ["Furniture & Seating", "Lighting & Sound", "Tents & Canopies", "Table Settings", "Stage & Podium"],
  },
];

export const galleryImages = [
  { src: gallery1, alt: "Elegant floral centerpieces", category: "weddings" },
  { src: gallery2, alt: "Dramatic venue lighting", category: "corporate-events" },
  { src: gallery3, alt: "Outdoor sunset event", category: "weddings" },
  { src: weddingImg, alt: "Wedding ceremony setup", category: "weddings" },
  { src: corporateImg, alt: "Corporate event stage", category: "corporate-events" },
  { src: rentalsImg, alt: "Premium tent setup", category: "rentals" },
  { src: birthdayImg, alt: "Birthday celebration", category: "birthday-parties" },
  { src: heroBg, alt: "Grand event venue", category: "corporate-events" },
];

export const heroSlides = [
  { image: weddingImg, title: "Luxury Weddings", subtitle: "Creating fairy-tale moments" },
  { image: corporateImg, title: "Corporate Excellence", subtitle: "Elevating your brand presence" },
  { image: birthdayImg, title: "Celebration Moments", subtitle: "Milestones worth remembering" },
  { image: heroBg, title: "Grand Events", subtitle: "Where vision meets perfection" },
];

export const testimonials = [
  {
    name: "Priya Menon",
    event: "Wedding",
    service: "weddings",
    text: "Round Events transformed our wedding into a fairy tale. Every detail was perfect, from the floral arrangements to the lighting. Absolutely magical!",
    rating: 5,
  },
  {
    name: "Rahul Sharma",
    event: "Corporate Gala",
    service: "corporate-events",
    text: "Professional, creative, and incredibly efficient. Our annual corporate gala was a resounding success thanks to the Round Events team.",
    rating: 5,
  },
  {
    name: "Anjali Nair",
    event: "Birthday Party",
    service: "birthday-parties",
    text: "They made my daughter's 1st birthday celebration so special. The themed décor was beyond what we imagined. Highly recommend!",
    rating: 5,
  },
  {
    name: "Deepak Varma",
    event: "Wedding",
    service: "weddings",
    text: "From start to finish, Round Events exceeded our expectations. The coordination was seamless and the results were breathtaking.",
    rating: 5,
  },
  {
    name: "Meera Krishnan",
    event: "Corporate Conference",
    service: "corporate-events",
    text: "Our annual conference ran flawlessly. The AV setup, catering, and venue management were all top-notch. Will definitely work with them again.",
    rating: 5,
  },
  {
    name: "Suresh Pillai",
    event: "Rental Services",
    service: "rentals",
    text: "The rental equipment was premium quality and delivered on time. Their furniture and lighting transformed our venue completely.",
    rating: 5,
  },
];

export const credentials = [
  { title: "Best Event Planner 2024", subtitle: "Kerala Tourism Awards" },
  { title: "ISO 9001 Certified", subtitle: "Quality Management" },
  { title: "Top 10 in India", subtitle: "Wedding Wire Awards 2023" },
  { title: "Excellence Award", subtitle: "South India Event Forum" },
];

export const stats = [
  { value: "500+", label: "Events Completed" },
  { value: "300+", label: "Happy Clients" },
  { value: "15+", label: "Awards Won" },
  { value: "10+", label: "Years Experience" },
];
