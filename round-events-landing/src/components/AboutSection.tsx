import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Calendar, Star } from "lucide-react";

const stats = [
  { icon: Calendar, value: "500+", label: "Events Completed" },
  { icon: Users, value: "300+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Awards Won" },
  { icon: Star, value: "10+", label: "Years Experience" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="font-subheading text-primary tracking-[0.2em] uppercase text-sm mb-3">
              About Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              Where Elegance Meets <span className="gold-text">Excellence</span>
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Round Events is Kochi&apos;s premier event management company,
              dedicated to curating world-class experiences that leave lasting
              impressions. Our team of passionate professionals blends creativity
              with precision, ensuring every detail is meticulously planned and
              flawlessly executed.
            </p>
            <p className="text-foreground/70 leading-relaxed mb-8">
              From intimate celebrations to grand corporate galas, we bring your
              vision to life with sophistication and style that sets new
              standards in the industry.
            </p>

            {/* Video placeholder */}
            <div className="glass-card aspect-video flex items-center justify-center cursor-pointer group">
              <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-primary border-b-8 border-b-transparent ml-1" 
                  style={{ borderLeftWidth: '14px' }}
                />
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="glass-card p-6 text-center group hover:border-primary/30 transition-colors"
              >
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="font-heading text-3xl gold-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
