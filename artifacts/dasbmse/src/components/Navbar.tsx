import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import logoImg from "@assets/1777345079376_1777353648698.jpg";
import { Menu, X, ShieldCheck } from "lucide-react";

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
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-glass shadow-xl" : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">

          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0" data-testid="link-home-logo">
            <img
              src={logoImg}
              alt="DASBMSE"
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full object-cover ring-2 ring-yellow-500/50 shrink-0"
            />
            <div className="min-w-0">
              <div className="font-bold text-yellow-400 leading-tight truncate" style={{ fontSize: "clamp(10px, 2.5vw, 14px)" }}>
                Dr. Abraham S. Borbor
              </div>
              <div className="text-blue-400 font-medium truncate hidden xs:block" style={{ fontSize: "clamp(9px, 2vw, 11px)" }}>
                Memorial School of Excellence
              </div>
              <div className="text-blue-400 font-bold text-xs xs:hidden">DASBMSE</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1" data-testid="nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location === link.href
                    ? "text-yellow-400 bg-yellow-400/10"
                    : "text-gray-300 hover:text-yellow-400 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              data-testid="link-nav-admin"
              className="ml-2 px-3 py-2 rounded-lg text-sm font-semibold btn-gold flex items-center gap-1.5"
            >
              <ShieldCheck size={14} />
              Admin
            </Link>
          </div>

          {/* Mobile right: Admin icon + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              href="/admin"
              className="p-2 rounded-lg btn-gold"
              data-testid="link-mobile-admin-icon"
            >
              <ShieldCheck size={18} />
            </Link>
            <button
              className="p-2 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-white/10 transition-all"
              onClick={() => setOpen(!open)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden mobile-menu border-t border-yellow-500/10" data-testid="nav-mobile">
          <div className="px-3 py-3 grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
                className={`px-4 py-3 rounded-xl text-sm font-medium text-center transition-all ${
                  location === link.href
                    ? "text-yellow-400 bg-yellow-400/10 border border-yellow-500/30"
                    : "text-gray-300 bg-white/5 hover:text-yellow-400"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
