import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Trophy, Shield, Medal, Award as AwardIcon, LucideIcon } from "lucide-react";
import { useFrappe } from "@/hooks/useFrappe";
import { getAwards } from "@/api";
import type { Award } from "@/types/api";

const iconMap: Record<string, LucideIcon> = {
  trophy: Trophy,
  shield: Shield,
  medal: Medal,
  award: AwardIcon,
};

const AwardsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: awards, loading, error } = useFrappe<Award[]>(getAwards);

  return (
    <section id="awards" className="section-padding">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-subheading text-primary tracking-[0.2em] uppercase text-sm mb-3">
            Our Credentials
          </p>
          <h2 className="font-heading text-3xl md:text-4xl">
            Awards & <span className="gold-text">Certificates</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {loading && (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card p-6 text-center animate-pulse">
                <div className="w-10 h-10 rounded-full bg-muted mx-auto mb-4" />
                <div className="h-3 bg-muted rounded w-3/4 mx-auto mb-2" />
                <div className="h-2 bg-muted rounded w-1/2 mx-auto" />
              </div>
            ))
          )}

          {!loading && !error && awards?.map((award, i) => {
            const Icon = iconMap[award.icon?.toLowerCase()] ?? Trophy;
            return (
              <motion.div
                key={award.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 text-center group hover:border-primary/30 transition-colors"
              >
                <Icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-sm mb-1">{award.title}</h3>
                <p className="text-xs text-muted-foreground">{award.issuing_body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;