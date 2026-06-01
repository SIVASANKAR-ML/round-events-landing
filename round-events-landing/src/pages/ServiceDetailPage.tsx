import { useParams, Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, Star, Quote, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import { useFrappe } from "@/hooks/useFrappe";
import { getService, getGallery } from "@/api/index";
import type { ServiceDetail, GalleryImage } from "@/types/api";
import { testimonials } from "@/lib/data";

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: service, loading, error } = useFrappe<ServiceDetail>(
    () => getService(slug!),
    [slug]
  );
  const { data: serviceGallery } = useFrappe<GalleryImage[]>(
    () => getGallery({ category: slug }),
    [slug]
  );

  const serviceTestimonials = testimonials.filter((t) => t.service === slug);

  if (loading) {
    return (
      <main>
        <Navbar />
        <div className="pt-20 section-padding">
          <div className="animate-pulse space-y-8 container mx-auto">
            <div className="h-[50vh] bg-secondary/50 rounded-xl" />
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-3">
                <div className="h-6 bg-secondary/50 rounded w-1/3" />
                <div className="h-4 bg-secondary/50 rounded w-full" />
                <div className="h-4 bg-secondary/50 rounded w-5/6" />
              </div>
              <div className="space-y-3">
                <div className="h-6 bg-secondary/50 rounded w-1/3" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-4 bg-secondary/50 rounded w-3/4" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !service) {
    return (
      <main>
        <Navbar />
        <div className="pt-20 section-padding text-center">
          <h1 className="font-heading text-3xl mb-4">Service Not Found</h1>
          <Link to="/services" className="cta-button-outline text-sm">Back to Services</Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="pt-20" ref={ref}>
        {/* Hero */}
        <section className="relative h-[50vh] overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/services" className="text-primary text-sm flex items-center gap-2 mb-4 hover:gap-3 transition-all">
                <ArrowLeft className="w-4 h-4" /> All Services
              </Link>
              <h1 className="font-heading text-4xl md:text-5xl brand-text">{service.title}</h1>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-2xl mb-6">About This Service</h2>
                <p className="text-foreground/70 leading-relaxed mb-8 whitespace-pre-line">{service.full_description}</p>
                <Link to="/contact" className="cta-button inline-block">Request Quote</Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-heading text-xl mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f.feature} className="flex items-center gap-3 text-foreground/70">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                      {f.feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {(serviceGallery?.length ?? 0) > 0 && (
          <section className="section-padding bg-secondary/30">
            <div className="container mx-auto">
              <h2 className="font-heading text-2xl text-center mb-10">
                {service.title} <span className="brand-text">Gallery</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {serviceGallery!.map((img, i) => (
                  <motion.div
                    key={img.name ?? i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="relative overflow-hidden rounded-xl aspect-[4/3] group"
                  >
                    <img src={img.image} alt={img.alt_text} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials (static, no API exists) */}
        {serviceTestimonials.length > 0 && (
          <section className="section-padding">
            <div className="container mx-auto">
              <h2 className="font-heading text-2xl text-center mb-10">
                Client <span className="brand-text">Reviews</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {serviceTestimonials.map((t) => (
                  <div key={t.name} className="glass-card p-8 relative">
                    <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-foreground/70 leading-relaxed mb-6 italic font-subheading text-base">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.event}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default ServiceDetailPage;
