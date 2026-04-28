import { useState, useEffect, useRef } from "react";
import { ChevronUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getSchoolInfo } from "@/lib/school-data";
import logoImg from "@assets/1777345079376_1777353648698.jpg";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      className="scroll-top"
      aria-label="Scroll to top"
      data-testid="button-scroll-top"
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}

export function WhatsAppButton() {
  const info = getSchoolInfo();
  const num = info.whatsapp.replace(/\D/g, "");

  return (
    <a
      href={`https://wa.me/${num}?text=Hello%2C%20I'm%20interested%20in%20learning%20more%20about%20Dr.%20Abraham%20S.%20Borbor%20Memorial%20School%20of%20Excellence.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      data-testid="link-whatsapp-float"
    >
      <FaWhatsapp size={28} className="text-white" />
    </a>
  );
}

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1800);
    const t2 = setTimeout(onDone, 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone]);

  return (
    <div className={`loading-screen ${fading ? "fade-out" : ""}`} data-testid="loading-screen">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <img
            src={logoImg}
            alt="School Logo"
            className="w-28 h-28 rounded-full object-cover ring-4 ring-yellow-500/40 pulse-gold"
            data-testid="img-loading-logo"
          />
        </div>
        <div className="text-center">
          <h1 className="font-bold text-yellow-400 text-xl mb-1">Dr. Abraham S. Borbor</h1>
          <p className="text-blue-400 text-sm font-medium">Memorial School of Excellence</p>
        </div>
        <div className="spinner" />
        <p className="text-gray-500 text-xs tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  );
}

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
