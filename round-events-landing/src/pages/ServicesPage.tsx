import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SectionHeader from "@/components/SectionHeader";
import { useFrappe } from "@/hooks/useFrappe";
import { getServices } from "@/api/index";
import type { Service } from "@/types/api";

const ServiceSkeleton = () => (
  <div className="glass-card overflow-hidden animate-pulse">
    <div className="h-56 bg-secondary/50" />
    <div className="p-6 space-y-3">
      <div className="h-5 bg-secondary/50 rounded w-1/2" />
      <div className="h-3 bg-secondary/50 rounded w-full" />
      <div className="h-3 bg-secondary/50 rounded w-3/4" />
    </div>
  </div>
);

const ServicesPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: services, loading, error } = useFrappe<Service[]>(getServices);

  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <section className="section-padding" ref={ref}>
          <div className="container mx-auto">
            <SectionHeader label="What We Do" title="Our" highlight="Services" />
            {error && (
              <p className="text-center text-muted-foreground py-12">Failed to load services. Please try again later.</p>
            )}
            <div className="grid md:grid-cols-2 gap-8">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <ServiceSkeleton key={i} />)
                : services?.map((service, i) => (
                    <motion.div
                      key={service.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link to={`/services/${service.slug}`} className="glass-card overflow-hidden group block hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30 transition-all duration-200">
                        <div className="relative h-56 overflow-hidden">
                          <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent group-hover:from-card/80 transition-colors duration-500" />
                        </div>
                        <div className="p-6">
                          <h3 className="font-heading text-xl mb-3 brand-text group-hover:text-primary transition-colors">{service.title}</h3>
                          <p className="text-foreground/60 text-sm leading-relaxed mb-4">{service.short_description}</p>
                          <span className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                            Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default ServicesPage;
