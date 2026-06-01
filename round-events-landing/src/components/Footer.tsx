import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <Link to="/" className="font-heading text-xl brand-text mb-4 tracking-widest block">ROUND EVENTS</Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kochi&apos;s premier event management company. Crafting unforgettable moments since 2014.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Gallery", to: "/gallery" },
                { label: "Contact", to: "/contact" },
              ].map((l) => (
                <Link key={l.label} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Youtube, href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" /> +91 98765 43210
              </a>
              <a href="mailto:hello@roundevents.in" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5" /> hello@roundevents.in
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/20 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Round Events. All rights reserved. | Best Event Planners in Kochi, Kerala
        </div>
      </div>
    </footer>
  );
};

export default Footer;
