import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, Users, Award, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SectionHeader from "@/components/SectionHeader";
import { stats } from "@/lib/data";

const AboutPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const statIcons = [Calendar, Users, Award, Star];

  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <section className="section-padding" ref={ref}>
          <div className="container mx-auto">
            <SectionHeader label="About Us" title="South India's" highlight="Event Alchemists" />

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <h3 className="font-heading text-2xl mb-4 brand-text">Our Story</h3>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Founded in 1999,Round Events is South India&apos;s premier event production and management
                  company. Known as &quot;South India&apos;s Event Alchemists,&quot; we specialize in transforming
                  simple concepts into grand spectacles with 25 years of experience and a passion for precision.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  We have evolved from a local service provider to a high-capacity production company capable of
                  handling events of any scale, no matter the complexity. Our massive in-house infrastructure and
                  diverse team of skilled craftsmen, creative designers, and expert event managers set us apart.
                </p>
                <p className="text-foreground/70 leading-relaxed mb-6 italic border-l-2 border-primary pl-4">
                  &quot;At Round Events, we don&apos;t just manage events; we create memories. For 25 years, our goal
                  has been to bridge the gap between imagination and reality.&quot;
                </p>
                <p className="text-sm text-muted-foreground mb-8">— Chairman, Round Events India</p>

                {/* Video placeholder */}
                <div className="glass-card aspect-video flex items-center justify-center cursor-pointer group">
                  <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div
                      className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent ml-1"
                      style={{ borderLeftWidth: "14px", borderLeftColor: "hsl(var(--primary))" }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="grid grid-cols-2 gap-6"
              >
                {stats.map((stat, i) => {
                  const Icon = statIcons[i];
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                      whileHover={{ y: -6, scale: 1.03 }}
                      className="glass-card p-6 text-center group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-200"
                    >
                      <Icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                      <div className="font-heading text-3xl brand-text mb-1">{stat.value}</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Team placeholder */}
            <div className="mt-20">
              <h3 className="font-heading text-2xl text-center mb-10 brand-text">Meet Our Team</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["Chairman", "Creative Director", "Operations Head", "Marketing Lead"].map((role) => (
                  <motion.div
                    key={role}
                    whileHover={{ y: -6, scale: 1.03 }}
                    className="glass-card p-6 text-center group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <Users className="w-8 h-8 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
                    </div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">Round Events</p>
                    <p className="text-xs text-muted-foreground">{role}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default AboutPage;