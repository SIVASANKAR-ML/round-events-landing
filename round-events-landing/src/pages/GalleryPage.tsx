import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SectionHeader from "@/components/SectionHeader";
import { useFrappe } from "@/hooks/useFrappe";
import { getGallery } from "@/api/index";
import type { GalleryImage } from "@/types/api";

const categories = [
  { label: "All", value: "all" },
  { label: "Weddings", value: "weddings" },
  { label: "Corporate", value: "corporate-events" },
  { label: "Birthday", value: "birthday-parties" },
  { label: "Rentals", value: "rentals" },
];

const GalleryPage = () => {
  const [filter, setFilter] = useState("all");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: allImages, loading, error } = useFrappe<GalleryImage[]>(getGallery);

  const filtered = filter === "all"
    ? (allImages ?? [])
    : (allImages ?? []).filter((img) => img.category === filter);

  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <section className="section-padding" ref={ref}>
          <div className="container mx-auto">
            <SectionHeader label="Our Work" title="Event" highlight="Gallery" />

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setFilter(cat.value)}
                  className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === cat.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground/70 hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {error && (
              <p className="text-center text-muted-foreground py-12">Failed to load gallery. Please try again later.</p>
            )}

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="rounded-xl aspect-[4/3] bg-secondary/50 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map((img, i) => (
                  <motion.div
                    key={img.name ?? i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-200"
                  >
                    <img src={img.image} alt={img.alt_text} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/50 backdrop-blur-0 group-hover:backdrop-blur-[2px] transition-all duration-500 flex items-end p-4">
                      <p className="text-foreground font-medium opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-sm">{img.alt_text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default GalleryPage;
