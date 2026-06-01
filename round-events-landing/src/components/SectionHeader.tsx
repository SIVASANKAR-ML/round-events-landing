import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  highlight: string;
}

const SectionHeader = ({ label, title, highlight }: SectionHeaderProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <p className="font-subheading text-primary tracking-[0.2em] uppercase text-sm mb-3">
        {label}
      </p>
      <h2 className="font-heading text-3xl md:text-4xl">
        {title} <span className="brand-text">{highlight}</span>
      </h2>
    </motion.div>
  );
};

export default SectionHeader;
