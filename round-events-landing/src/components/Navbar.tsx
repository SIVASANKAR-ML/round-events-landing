import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import logo from "@/assets/logo.png"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Weddings", href: "/services/weddings" },
      { label: "Corporate Events", href: "/services/corporate-events" },
      { label: "Birthday Parties", href: "/services/birthday-parties" },
      { label: "Rentals", href: "/services/rentals" },
    ],
  },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  // { label: "Awards", href: "/awards" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        <Link to="/" className="flex items-center gap-3 font-heading text-xl md:text-2xl tracking-widest brand-text">
          <img 
            src={logo} 
            alt="Round Events India Logo" 
            className="h-10 md:h-12 w-auto object-contain"
            style={{
              mixBlendMode: 'darken',
              filter: 'contrast(1.1) brightness(1.1)'
            }}
          />
          <span className="hidden sm:inline">ROUND EVENTS INDIA</span>
          <span className="sm:hidden">ROUND EVENTS</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                    isActive(link.href) ? "text-primary" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full left-0 mt-2 w-48 glass-card p-2"
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-foreground/70 hover:text-primary hover:bg-secondary/50 rounded-md transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href) ? "text-primary" : "text-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            )
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors text-foreground/70 hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          <a
            href="https://example.com/book"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button text-sm"
          >
            Book Events
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          <button
            className="text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-nav border-t border-border/20 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium transition-colors py-2 ${
                    isActive(link.href) ? "text-primary" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a href="https://example.com/book" target="_blank" rel="noopener noreferrer" className="cta-button text-sm text-center mt-2">
                Book Events
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
