import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Shield, Medal, LucideIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SectionHeader from "@/components/SectionHeader";
import { useFrappe } from "@/hooks/useFrappe";
import { getAwards } from "@/api/index";
import type { Award } from "@/types/api";

const iconMap: Record<string, LucideIcon> = { Trophy, Shield, Medal };

const AwardsPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: awards, loading, error } = useFrappe<Award[]>(getAwards);

  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <section className="section-padding" ref={ref}>
          <div className="container mx-auto">
            <SectionHeader label="Our Credentials" title="Awards &" highlight="Certificates" />
            {error && (
              <p className="text-center text-muted-foreground py-12">Failed to load awards. Please try again later.</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="glass-card p-8 text-center animate-pulse space-y-3">
                      <div className="w-12 h-12 rounded-full bg-secondary/50 mx-auto" />
                      <div className="h-4 bg-secondary/50 rounded w-2/3 mx-auto" />
                      <div className="h-3 bg-secondary/50 rounded w-1/2 mx-auto" />
                    </div>
                  ))
                : awards?.map((award, i) => {
                    const Icon = iconMap[award.icon] ?? Trophy;
                    return (
                      <motion.div
                        key={award.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        whileHover={{ y: -6, scale: 1.03 }}
                        className="glass-card p-8 text-center group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
                      >
                        <Icon className="w-12 h-12 text-primary mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{award.title}</h3>
                        <p className="text-sm text-muted-foreground">{award.issuing_body}</p>
                      </motion.div>
                    );
                  })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default AwardsPage;
