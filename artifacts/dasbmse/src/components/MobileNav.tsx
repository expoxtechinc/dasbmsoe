import { Link, useLocation } from "wouter";
import { Home, Info, BookOpen, Image, Users, Phone } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/academics", label: "Academics", icon: BookOpen },
  { href: "/activities", label: "Gallery", icon: Image },
  { href: "/staff", label: "Staff", icon: Users },
  { href: "/contact", label: "Contact", icon: Phone },
];

export default function MobileNav() {
  const [location] = useLocation();

  return (
    <nav className="mobile-bottom-nav md:hidden" data-testid="mobile-bottom-nav">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = location === href;
        return (
          <Link key={href} href={href} className="mobile-nav-item" data-testid={`mobile-nav-${label.toLowerCase()}`}>
            <div className={`mobile-nav-icon ${active ? "active" : ""}`}>
              <Icon size={22} />
            </div>
            <span className={`mobile-nav-label ${active ? "text-yellow-400" : "text-gray-500"}`}>
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
