import { Link } from "wouter";
import logoImg from "@assets/1777345079376_1777353648698.jpg";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getSchoolInfo } from "@/lib/school-data";

export default function Footer() {
  const info = getSchoolInfo();

  return (
    <footer className="footer-gradient" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoImg}
                alt="School Seal"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-yellow-500/50"
              />
            </div>
            <h3 className="font-bold text-yellow-400 text-lg leading-tight mb-2">
              Dr. Abraham S. Borbor
            </h3>
            <p className="text-blue-400 text-sm font-medium mb-3">Memorial School of Excellence</p>
            <p className="text-gray-400 text-sm leading-relaxed italic">"{info.slogan}"</p>
            <p className="text-gray-500 text-xs mt-3">Est. {info.established}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 pb-2 border-b border-yellow-500/20">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/academics", label: "Academics" },
                { href: "/activities", label: "Activities" },
                { href: "/staff", label: "Our Staff" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors flex items-center gap-2"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-500/50 rounded-full" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 pb-2 border-b border-yellow-500/20">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                <span className="text-gray-400 text-sm">{info.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${info.email}`}
                  className="text-gray-400 hover:text-yellow-400 text-sm transition-colors break-all"
                  data-testid="footer-email"
                >
                  {info.email}
                </a>
              </li>
              {info.phones.map((phone, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Phone size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="text-gray-400 hover:text-yellow-400 text-sm transition-colors"
                    data-testid={`footer-phone-${i}`}
                  >
                    {phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Mission */}
          <div>
            <h4 className="font-bold text-white text-base mb-4 pb-2 border-b border-yellow-500/20">Connect</h4>
            <div className="space-y-3 mb-6">
              <a
                href={info.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-blue-400 text-sm transition-colors group"
                data-testid="footer-facebook"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                  <Facebook size={16} className="text-blue-400" />
                </div>
                Follow on Facebook
              </a>
              <a
                href={`https://wa.me/${info.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 hover:text-green-400 text-sm transition-colors group"
                data-testid="footer-whatsapp"
              >
                <div className="w-8 h-8 rounded-lg bg-green-600/20 flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
                  <FaWhatsapp size={16} className="text-green-400" />
                </div>
                Chat on WhatsApp
              </a>
            </div>
            <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
              <p className="text-yellow-400 text-xs font-semibold uppercase tracking-widest mb-1">Our Motto</p>
              <p className="text-white text-sm font-medium italic">"{info.slogan}"</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} {info.name}. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs text-center">
            Built with ❤️ by{" "}
            <a
              href="https://sastechinc-bp.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500/70 hover:text-yellow-400 transition-colors"
            >
              SasTech Inc
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
