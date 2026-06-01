import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFrappe } from "@/hooks/useFrappe";
import { getHeroSlides } from "@/api/index";
import type { HeroSlide } from "@/types/api";

const HeroCarousel = () => {
  const [current, setCurrent] = useState<number>(0);
  const { data: slides, loading, error } = useFrappe<HeroSlide[]>(getHeroSlides);

  const total = slides?.length ?? 1;
  const next = useCallback(() => setCurrent((p) => (p + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + total) % total), [total]);

  useEffect(() => {
    if (!slides?.length) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, slides]);

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/50 animate-pulse">Loading...</p>
      </section>
    );
  }

  if (error || !slides?.length) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-background">
        <p className="text-foreground/50">Unable to load slides.</p>
      </section>
    );
  }

  const slide: HeroSlide = slides[current];

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.p
            key={`sub-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-subheading text-lg md:text-xl text-primary tracking-[0.3em] uppercase mb-4"
          >
            Premium Event Planners in Kochi
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl tracking-wide mb-3 leading-tight"
            >
              {slide.title}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${current}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-subheading text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 italic"
            >
              {slide.subtitle}
            </motion.p>
          </AnimatePresence>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/contact" className="cta-button text-base">
              Request a Quote
            </Link>
            
            <a  href="tel:+919876543210"
              className="cta-button-outline text-base flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-primary w-8" : "bg-foreground/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;