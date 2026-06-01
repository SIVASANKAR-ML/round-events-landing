import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Menon",
    event: "Wedding",
    text: "Round Events transformed our wedding into a fairy tale. Every detail was perfect, from the floral arrangements to the lighting. Absolutely magical!",
    rating: 5,
  },
  {
    name: "Rahul Sharma",
    event: "Corporate Gala",
    text: "Professional, creative, and incredibly efficient. Our annual corporate gala was a resounding success thanks to the Round Events team.",
    rating: 5,
  },
  {
    name: "Anjali Nair",
    event: "Birthday Party",
    text: "They made my daughter's 1st birthday celebration so special. The themed décor was beyond what we imagined. Highly recommend!",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding bg-secondary/30">
      <div className="container mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-subheading text-primary tracking-[0.2em] uppercase text-sm mb-3">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl md:text-4xl">
            What Our <span className="gold-text">Clients</span> Say
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card p-8 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-6 right-6" />
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
