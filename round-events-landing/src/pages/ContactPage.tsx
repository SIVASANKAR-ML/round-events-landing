import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import SectionHeader from "@/components/SectionHeader";
import { submitEnquiry } from "@/api/index";

const BUDGET_OPTIONS = [
  "Under ₹1 Lakh",
  "₹1 - 5 Lakhs",
  "₹5 - 10 Lakhs",
  "₹10 - 25 Lakhs",
  "₹25 Lakhs+",
] as const;

const ContactPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", phone: "", date: "", budget: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({ title: "Please fill in required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      await submitEnquiry({
        fullName: form.name,
        phone: form.phone,
        eventDate: form.date || undefined,
        budgetRange: form.budget || undefined,
      });
      toast({ title: "Enquiry sent!", description: "We'll get back to you within 24 hours." });
      setForm({ name: "", phone: "", date: "", budget: "" });
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        (err as Error)?.message ||
        "Something went wrong. Please try again.";
      toast({ title: "Submission failed", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <section className="section-padding" ref={ref}>
          <div className="container mx-auto">
            <SectionHeader label="Get In Touch" title="Let's Plan Your" highlight="Event" />

            <div className="grid lg:grid-cols-2 gap-12">
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="glass-card p-8 space-y-5"
              >
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Phone *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={15} className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Event Date</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Budget Range</label>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className="w-full bg-secondary/50 border border-border/50 rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors">
                    <option value="">Select budget range</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <button type="submit" disabled={submitting} className="cta-button w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {submitting ? "Sending..." : "Send Enquiry"}
                </button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass-card p-6 flex items-start gap-4 group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 cursor-pointer">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors duration-200">Our Office</p>
                    <p className="text-sm text-muted-foreground">MG Road, Ernakulam, Kochi, Kerala 682011</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass-card p-6 flex items-start gap-4 group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 cursor-pointer">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors duration-200">Call Us</p>
                    <a href="tel:+919876543210" className="text-sm text-primary hover:underline">+91 98765 43210</a>
                  </div>
                </motion.div>
                <motion.div whileHover={{ y: -4, scale: 1.02 }} className="glass-card p-6 flex items-start gap-4 group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 cursor-pointer">
                  <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                  <div>
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors duration-200">Email</p>
                    <a href="mailto:hello@roundevents.in" className="text-sm text-primary hover:underline">hello@roundevents.in</a>
                  </div>
                </motion.div>
                <div className="glass-card overflow-hidden rounded-xl">
                  <iframe
                    title="Round Events Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0!2d76.2999!3d9.9816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNTgnNTMuOCJOIDc2wrAxNyc1OS42IkU!5e0!3m2!1sen!2sin!4v1"
                    width="100%"
                    height="220"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <FloatingButtons />
    </main>
  );
};

export default ContactPage;
