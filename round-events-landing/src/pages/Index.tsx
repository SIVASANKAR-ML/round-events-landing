import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Star, Quote, Trophy, Shield, Medal, Calendar, Users, Award, Warehouse, Clock, Wrench, Cpu, LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SectionHeader from "@/components/SectionHeader";
import { useFrappe } from "@/hooks/useFrappe";
import { getServices, getGallery, getAwards } from "@/api/index";
import type { Service, GalleryImage, Award as AwardType } from "@/types/api";
import { testimonials, stats } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = { Trophy, Shield, Medal };

const ServiceCardSkeleton = () => (
  <div className="glass-card overflow-hidden animate-pulse">
    <div className="h-48 bg-secondary/50" />
    <div className="p-5 space-y-2">
      <div className="h-4 bg-secondary/50 rounded w-3/4" />
      <div className="h-3 bg-secondary/50 rounded w-full" />
      <div className="h-3 bg-secondary/50 rounded w-2/3" />
    </div>
  </div>
);

const GalleryCardSkeleton = () => (
  <div className="relative overflow-hidden rounded-xl h-full bg-secondary/50 animate-pulse" />
);

const AwardCardSkeleton = () => (
  <div className="glass-card p-6 text-center animate-pulse space-y-2">
    <div className="w-10 h-10 rounded-full bg-secondary/50 mx-auto" />
    <div className="h-3 bg-secondary/50 rounded w-2/3 mx-auto" />
    <div className="h-2 bg-secondary/50 rounded w-1/2 mx-auto" />
  </div>
);

const AnimatedSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const whyUs = [
  {
    icon: Warehouse,
    title: "Massive In-House Infrastructure",
    description:
      "We own all our equipment — German Hangar Tents, AC units, stages, barricades, and more — giving you better quality control and cost-effectiveness.",
  },
  {
    icon: Clock,
    title: "25 Years of Experience",
    description:
      "Since 1999, we have seen and solved every challenge the industry can throw at us. Thousands of events. Zero compromises.",
  },
  {
    icon: Wrench,
    title: "Custom Fabrication",
    description:
      "If it doesn't exist, we build it. Our in-house workshops craft bespoke sets and décor tailored precisely to your theme and vision.",
  },
  {
    icon: Cpu,
    title: "Technological Edge",
    description:
      "We constantly explore new techniques to stay ahead of global trends, from cutting-edge lighting rigs to modern event tech.",
  },
];

const faqs = [
  {
    question: "Why should we hire an event management company?",
    answer: "Partnering with an event management company streamlines the entire event process, freeing up your time and reducing costs. Our experienced team handles every detail — from planning to execution — so your event unfolds exactly the way you envisioned.",
  },
  {
    question: "Can you arrange a corporate event for my office?",
    answer: "Absolutely. As one of Kerala's leading corporate event specialists, we deliver end-to-end solutions tailored to your organization's specific needs — ensuring a polished, professional event every time.",
  },
  {
    question: "What does your unique service include?",
    answer: "Our portfolio covers a wide spectrum — from high-profile corporate gatherings and dream weddings to live artist showcases. Each service is crafted to align precisely with your goals and expectations.",
  },
  {
    question: "Can you handle crowded events?",
    answer: "Yes. We have extensive experience managing events with audiences from 500 to 30,000 attendees. We handle venue selection, crowd logistics, and on-ground management to keep everything running smoothly.",
  },
  {
    question: "How much will it cost to hire your event management services?",
    answer: "Pricing varies based on the scope of your event. Key factors include the venue, event date, number of guests, type of event, catering requirements, and planned activities. We'll work with you to build a package that fits your vision and budget.",
  },
  {
    question: "Can you customise my corporate events?",
    answer: "Absolutely. Customization is at the heart of what we do. Share your vision and requirements with us, and our team will build a completely tailored plan from the ground up.",
  },
  {
    question: "What is the best time to hire an event management company?",
    answer: "The sooner, the better. As soon as you decide to host an event, reach out to us. Early engagement allows us to cover every aspect — from concept and theme to décor and design — without any last-minute rush.",
  },
  {
    question: "Can you arrange events in a budget-friendly manner?",
    answer: "Yes. We specialize in creating memorable experiences within your budget. Our goal is to deliver maximum impact without unnecessary expenditure, so you can celebrate stress-free.",
  },
  {
    question: "Why should we include entertainment at an event?",
    answer: "Entertainment elevates any event from ordinary to extraordinary. Whether it's a live band, DJ, EMCEE, or a special performance, the right entertainment keeps energy high and creates lasting memories for your guests.",
  },
  {
    question: "Can you help me find the perfect venue for corporate and wedding events?",
    answer: "Yes. We help you discover and secure the ideal venue for your event — from intimate spaces to grand luxury halls. With our network of venues across various budgets, finding the perfect fit has never been easier.",
  },
];

const FaqAccordion = ({ faqs }: { faqs: { question: string; answer: string }[] }) => (
  <div className="space-y-2">
    {faqs.map((faq, i) => (
      <div key={i} className="rounded-xl bg-card/40 backdrop-blur-sm px-6 py-5">
        <p className="font-heading text-sm font-semibold brand-text mb-2">{faq.question}</p>
        <p className="text-foreground/70 text-sm leading-relaxed">{faq.answer}</p>
      </div>
    ))}
  </div>
);

const Index = () => {
  const statIcons = [Calendar, Users, Award, Star];

  const { data: services, loading: servicesLoading } = useFrappe<Service[]>(getServices);
  const { data: galleryImages, loading: galleryLoading } = useFrappe<GalleryImage[]>(getGallery);
  const { data: awards, loading: awardsLoading } = useFrappe<AwardType[]>(getAwards);

  return (
    <main>
      <Navbar />
      <HeroCarousel />

      {/* About Preview */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeader label="About Us" title="South India's" highlight="Event Alchemists" />
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-foreground/70 leading-relaxed mb-6">
                Founded in 1999, Round Events is South India&apos;s premier event production and management company.
                We specialize in transforming simple concepts into grand spectacles — blending creativity with
                flawless technical execution for over 25 years.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, i) => {
                  const Icon = statIcons[i];
                  return (
                    <motion.div
                      key={stat.label}
                      whileHover={{ y: -6, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="glass-card p-4 text-center cursor-default group hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                    >
                      <Icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                      <div className="font-heading text-2xl brand-text">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
              <Link to="/about" className="cta-button-outline text-sm inline-flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto">
          <SectionHeader label="What We Do" title="Our" highlight="Services" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {servicesLoading
              ? Array.from({ length: 4 }).map((_, i) => <ServiceCardSkeleton key={i} />)
              : services?.slice(0, 4).map((service) => (
                  <AnimatedSection key={service.slug}>
                    <Link to={`/services/${service.slug}`}>
                      <motion.div
                        whileHover={{ y: -8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glass-card overflow-hidden group block h-full hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-500" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-heading text-lg mb-2 brand-text group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                          <p className="text-foreground/60 text-sm leading-relaxed line-clamp-2">{service.short_description}</p>
                          <span className="inline-flex items-center gap-1 text-primary text-xs font-medium mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            Learn More <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  </AnimatedSection>
                ))}
          </div>
          <div className="text-center">
            <Link to="/services" className="cta-button-outline text-sm inline-flex items-center gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeader label="Our Work" title="Event" highlight="Gallery" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] mb-10">
            {galleryLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <AnimatedSection key={i}><GalleryCardSkeleton /></AnimatedSection>
                ))
              : galleryImages?.slice(0, 4).map((img, i) => (
                  <AnimatedSection key={img.name ?? i}>
                    <motion.div
                      whileHover={{ scale: 1.04 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="relative overflow-hidden rounded-xl group cursor-pointer h-full shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <img src={img.image} alt={img.alt_text} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end justify-center pb-4">
                        <p className="text-foreground font-medium text-sm backdrop-blur-sm bg-background/30 px-3 py-1 rounded-full">{img.alt_text}</p>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
          </div>
          <div className="text-center">
            <Link to="/gallery" className="cta-button-outline text-sm inline-flex items-center gap-2">
              View Full Gallery <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Round Events */}
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto">
          <SectionHeader label="Why Choose Us" title="The Round Events" highlight="Difference" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item, i) => (
              <AnimatedSection key={item.title}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card p-6 text-center group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default h-full"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <item.icon className="w-7 h-7 text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                  </div>
                  <h3 className="font-heading text-base mb-2 brand-text">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeader label="Testimonials" title="What Our" highlight="Clients Say" />
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {testimonials.slice(0, 3).map((t) => (
              <AnimatedSection key={t.name}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="glass-card p-8 relative h-full hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-300 group"
                >
                  <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-300" />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-6 italic font-subheading text-base">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.event}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
          <div className="text-center">
            <Link to="/testimonials" className="cta-button-outline text-sm inline-flex items-center gap-2">
              Read More Reviews <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Awards Preview
      <section className="section-padding bg-secondary/30">
        <div className="container mx-auto">
          <SectionHeader label="Our Credentials" title="Awards &" highlight="Certificates" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {awardsLoading
              ? Array.from({ length: 4 }).map((_, i) => <AwardCardSkeleton key={i} />)
              : awards?.map((award) => {
                  const Icon = iconMap[award.icon] ?? Trophy;
                  return (
                    <AnimatedSection key={award.name}>
                      <motion.div
                        whileHover={{ y: -6, scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="glass-card p-6 text-center group hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-default"
                      >
                        <Icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
                        <h3 className="font-semibold text-sm mb-1">{award.title}</h3>
                        <p className="text-xs text-muted-foreground">{award.issuing_body}</p>
                      </motion.div>
                    </AnimatedSection>
                  );
                })}
          </div>
          <div className="text-center">
            <Link to="/awards" className="cta-button-outline text-sm inline-flex items-center gap-2">
              View All Awards <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section> */}

      {/* FAQs */}
      <section className="section-padding">
        <div className="container mx-auto">
          <SectionHeader label="FAQs" title="Frequently Asked" highlight="Questions" />
          <AnimatedSection className="max-w-3xl mx-auto">
            <FaqAccordion faqs={faqs} />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding">
        <div className="container mx-auto text-center">
          <SectionHeader label="Get In Touch" title="Let's Plan Your" highlight="Dream Event" />
          <AnimatedSection>
            <p className="text-foreground/70 max-w-xl mx-auto mb-8">
              From intimate gatherings to massive corporate summits — we are with you from day one.
              Contact us for a free consultation with South India&apos;s most trusted event alchemists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="cta-button text-base">
                Request a Quote
              </Link>
              <a href="tel:+919846007575" className="cta-button-outline text-base">
                Call Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default Index;