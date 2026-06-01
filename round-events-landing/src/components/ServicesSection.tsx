import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useFrappe } from "@/hooks/useFrappe";
import { getServices } from "@/api";
import type { Service } from "@/types/api";

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: services, loading, error } = useFrappe<Service[]>(getServices);

  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-subheading text-primary tracking-[0.2em] uppercase text-sm mb-3">
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl">
            Our <span className="gold-text">Services</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card overflow-hidden animate-pulse">
                <div className="h-56 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-2 bg-muted rounded w-full" />
                  <div className="h-2 bg-muted rounded w-4/5" />
                </div>
              </div>
            ))}

          {!loading && !error && services?.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="glass-card overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                <motion.div
                  className="absolute bottom-4 left-6"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.3 }}
                >
                  <h3 className="font-heading text-xl gold-text drop-shadow-lg">
                    {service.title}
                  </h3>
                </motion.div>
              </div>
              <div className="p-6">
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  {service.short_description}
                </p>
                <button className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all duration-300">
                  Request Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;