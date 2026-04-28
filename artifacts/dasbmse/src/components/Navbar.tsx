import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logoImg from "@assets/1777345079376_1777353648698.jpg";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/activities", label: "Activities" },
  { href: "/staff", label: "Staff" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass shadow-lg" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-3 group" data-testid="link-home-logo">
            <img
              src={logoImg}
              alt="School Seal"
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-yellow-500/50 group-hover:ring-yellow-400 transition-all"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-sm lg:text-base leading-tight text-yellow-400">
                Dr. Abraham S. Borbor
              </div>
              <div className="text-xs text-blue-400 font-medium tracking-wide">Memorial School of Excellence</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location === link.href
                    ? "text-yellow-400 bg-yellow-400/10 nav-link-active"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              data-testid="link-nav-admin"
              className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold btn-gold"
            >
              Admin
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-white/10 transition-all"
            onClick={() => setOpen(!open)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mobile-menu border-t border-yellow-500/10" data-testid="nav-mobile">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location === link.href
                    ? "text-yellow-400 bg-yellow-400/10"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-white/5"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              data-testid="link-mobile-admin"
              className="mt-2 px-4 py-3 rounded-lg text-sm font-semibold btn-gold text-center"
              onClick={() => setOpen(false)}
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
