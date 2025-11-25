import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImg from "./profile.jpg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ["home", "about", "skills", "projects", "education", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
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

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "glass-effect shadow-xl backdrop-blur-xl bg-background/80 py-2" 
          : "bg-transparent py-3"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Profile with animation */}
          <a 
            href="#home" 
            className="flex items-center gap-2 sm:gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-slow"></div>
              <img
                src={profileImg}
                alt="Profile"
                className="relative w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full object-cover border-2 border-primary/80 group-hover:border-primary transition-all duration-300 group-hover:scale-110 shadow-lg"
              />
            </div>
            <span className="hidden sm:inline text-lg font-semibold text-foreground/90 group-hover:text-primary transition-all duration-300 transform group-hover:translate-x-1">
            Ram kumar
            </span>
          </a>

          {/* Desktop Menu with enhanced animations */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative text-sm lg:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive 
                      ? "text-primary font-semibold" 
                      : "text-foreground/80 hover:text-primary"
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full animate-slide-in"></span>
                  )}
                  <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary/30 group-hover:w-full transition-all duration-300"></span>
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button with enhanced animation */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden relative group"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className={`transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 transform transition-all duration-300 scale-100" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 transform transition-all duration-300 group-hover:scale-110" />
              )}
            </div>
            <div className="absolute inset-0 bg-primary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>

        {/* Enhanced Mobile Menu with better animations */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
        }`}>
          <div className="glass-effect rounded-xl p-4 space-y-3 border border-white/10 shadow-2xl backdrop-blur-xl">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`block py-3 px-4 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                    isActive
                      ? "bg-primary/20 text-primary border-l-4 border-primary shadow-lg"
                      : "text-foreground/80 hover:text-primary hover:bg-white/5"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out forwards;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Staggered animation for mobile menu items */
        .md\\:hidden a {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition-property: color, background-color, border-color, transform, opacity;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 300ms;
        }

        /* Enhanced hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }

        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }

        /* Mobile menu backdrop blur enhancement */
        @supports (backdrop-filter: blur(20px)) {
          .glass-effect {
            backdrop-filter: blur(20px);
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Responsive improvements */
        @media (max-width: 640px) {
          nav {
            padding: 0.5rem 0;
          }
          
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .hidden.md\\:flex {
            gap: 1rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
