import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "./profile.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4"> {/* ✅ added responsive horizontal padding & smaller vertical padding for mobile */}
        <div className="flex items-center justify-between">
          {/* Logo / Profile */}
          <a href="#home" className="flex items-center gap-2 sm:gap-3"> {/* ✅ added gap for consistent spacing */}
            <img
              src={profileImg}
              alt="Profile"
              title="Profile"
              className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-primary" // ✅ responsive logo sizing
            />
            <span className="hidden sm:inline text-lg font-semibold text-foreground/90">Ram Kumar</span> {/* ✅ added name visible only on sm+ screens */}
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8"> {/* ✅ adjusted gap for better spacing on wide screens */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm lg:text-base text-foreground/80 hover:text-primary transition-colors" // ✅ responsive text scaling
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />} {/* ✅ responsive icon sizing */}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-3 glass-effect rounded-lg p-3 sm:p-4 space-y-2"> {/* ✅ adjusted spacing, padding & layout for mobile view */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-sm sm:text-base text-foreground/80 hover:text-primary transition-colors text-center" // ✅ responsive text size + centered
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
