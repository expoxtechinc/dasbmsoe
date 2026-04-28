import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { ChevronDown, Award, Users, BookOpen, Star, GraduationCap, Heart, Zap, ArrowRight } from "lucide-react";
import heroImg1 from "@assets/1777345276905_1777353675388.jpg";
import heroImg2 from "@assets/1777345307761_1777353675462.jpg";
import heroImg3 from "@assets/1777345320267_1777353675488.jpg";
import heroImg4 from "@assets/1777345369823_1777353675510.jpg";
import logoImg from "@assets/1777345079376_1777353648698.jpg";
import { getSchoolInfo } from "@/lib/school-data";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Home() {
  const info = getSchoolInfo();
  const ref = useScrollReveal();

  return (
    <div ref={ref}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen gradient-hero hero-pattern flex items-center overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0">
          <img src={heroImg1} alt="" className="w-full h-full object-cover opacity-20 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent" />
        </div>

        <div className="absolute top-16 right-6 w-40 h-40 sm:w-64 sm:h-64 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-24 left-4 w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-28 lg:pt-40">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-3 py-1.5 mb-5 sm:mb-8 fade-up">
            <Star size={12} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold tracking-wider uppercase">Est. {info.established} · Mount Barclay, Liberia</span>
          </div>

          {/* School Name */}
          <h1 className="font-extrabold leading-tight mb-4 sm:mb-6 fade-up" data-testid="heading-school-name">
            <span className="blue-text block text-3xl sm:text-4xl lg:text-6xl">Dr. Abraham S. Borbor</span>
            <span className="text-white block text-2xl sm:text-3xl lg:text-5xl mt-1">Memorial School</span>
            <span className="gold-text block text-2xl sm:text-3xl lg:text-5xl mt-1">of Excellence</span>
          </h1>

          {/* Slogan */}
          <p className="text-blue-300 text-base sm:text-xl font-medium italic mb-3 fade-up">
            "{info.slogan}"
          </p>

          <p className="text-gray-400 text-sm sm:text-base mb-7 sm:mb-10 max-w-xl leading-relaxed fade-up">
            Providing world-class education from Primary through Senior High School in the heart of Liberia. Shaping futures and inspiring excellence every day.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 fade-up" data-testid="hero-cta-group">
            <Link href="/contact" data-testid="button-enroll-now">
              <button className="btn-gold w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-bold flex items-center justify-center gap-2">
                Enroll Now <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/about" data-testid="button-learn-more">
              <button className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-semibold border border-white/20 text-white hover:bg-white/5 transition-all">
                Learn More
              </button>
            </Link>
            <a
              href="https://www.facebook.com/DASBMSE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-center"
              data-testid="button-facebook"
            >
              📘 Facebook Page
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <ChevronDown size={18} className="text-gray-500" />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="section-navy py-10 sm:py-16" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: <GraduationCap size={24} className="text-yellow-400" />, number: "3", label: "Programs", sublabel: "Primary · Junior · Senior" },
              { icon: <Users size={24} className="text-blue-400" />, number: "500+", label: "Students", sublabel: "Growing every year" },
              { icon: <Award size={24} className="text-yellow-400" />, number: "6+", label: "Years", sublabel: "Founded 2019" },
              { icon: <Heart size={24} className="text-blue-400" />, number: "100%", label: "Dedicated", sublabel: "Expert educators" },
            ].map((stat, i) => (
              <div key={i} className="stat-card rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex justify-center mb-2 sm:mb-3">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mb-0.5">{stat.number}</div>
                <div className="text-yellow-400 text-xs sm:text-sm font-semibold mb-0.5">{stat.label}</div>
                <div className="text-gray-500 text-xs hidden sm:block">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section-dark py-14 sm:py-24" data-testid="section-highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 fade-up">
            <p className="text-yellow-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">Why Choose Us</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              A School That <span className="gold-text">Transforms</span> Lives
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                icon: <BookOpen size={28} className="text-yellow-400" />,
                title: "Quality Education",
                desc: "Our curriculum meets national and international standards, opening doors to universities and careers worldwide.",
              },
              {
                icon: <Award size={28} className="text-blue-400" />,
                title: "Discipline & Character",
                desc: "We cultivate academic excellence alongside moral integrity, leadership, and responsibility for life.",
              },
              {
                icon: <Zap size={28} className="text-yellow-400" />,
                title: "Innovation & Excellence",
                desc: "From science fairs to cultural programs, we encourage innovation and creative thinking every day.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-glow rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center fade-up"
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-base sm:text-xl mb-2 sm:mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS PREVIEW ===== */}
      <section className="section-navy py-14 sm:py-24" data-testid="section-programs-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16 fade-up">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">Academic Programs</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              Education from <span className="blue-text">Start</span> to <span className="gold-text">Success</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                level: "Primary School",
                grades: "Grades 1–6",
                color: "from-blue-600/20 to-blue-800/20",
                border: "border-blue-500/30",
                badge: "bg-blue-500/20 text-blue-300",
                subjects: ["English", "Mathematics", "Science", "Social Studies", "History"],
              },
              {
                level: "Junior High",
                grades: "Grades 7–9",
                color: "from-yellow-600/20 to-yellow-800/20",
                border: "border-yellow-500/30",
                badge: "bg-yellow-500/20 text-yellow-300",
                subjects: ["Mathematics", "English", "General Science", "Geography", "French"],
              },
              {
                level: "Senior High",
                grades: "Grades 10–12",
                color: "from-green-600/20 to-green-800/20",
                border: "border-green-500/30",
                badge: "bg-green-500/20 text-green-300",
                subjects: ["Biology", "Chemistry", "Physics", "Economics", "Literature"],
              },
            ].map((prog, i) => (
              <div
                key={i}
                className={`rounded-xl sm:rounded-2xl p-5 sm:p-8 border bg-gradient-to-br ${prog.color} ${prog.border} fade-up`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${prog.badge} mb-3 inline-block`}>
                  {prog.grades}
                </span>
                <h3 className="text-white font-bold text-base sm:text-xl mb-2">{prog.level}</h3>
                <ul className="space-y-1.5 mt-3">
                  {prog.subjects.map((s, j) => (
                    <li key={j} className="text-gray-400 text-xs sm:text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 sm:mt-10 fade-up">
            <Link href="/academics">
              <button className="btn-gold px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm sm:text-base">
                View Full Curriculum →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="section-dark py-14 sm:py-24" data-testid="section-gallery-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 fade-up">
            <p className="text-yellow-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">Life at DASBMSE</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              Moments of <span className="gold-text">Excellence</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 fade-up">
            {[heroImg1, heroImg2, heroImg3, heroImg4].map((img, i) => (
              <div
                key={i}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden gallery-img cursor-pointer group"
                style={{ aspectRatio: "1/1" }}
              >
                <img src={img} alt={`School photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-10 fade-up">
            <Link href="/activities">
              <button className="btn-blue px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm sm:text-base">
                View All Activities & Gallery →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP PREVIEW ===== */}
      <section className="section-navy py-14 sm:py-24" data-testid="section-leadership-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 fade-up">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">Our Leadership</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              Guided by <span className="gold-text">Visionary</span> Leaders
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto fade-up">
            {[
              { name: info.principalName, title: info.principalTitle, img: heroImg1, desc: "Leading with vision, compassion, and unwavering commitment to excellence." },
              { name: info.vpiName, title: info.vpiTitle, img: null, desc: "Supporting curriculum excellence and student development with dedication." },
            ].map((leader, i) => (
              <div key={i} className="staff-card rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 sm:mb-4 overflow-hidden ring-4 ring-yellow-500/30">
                  {leader.img ? (
                    <img src={leader.img} alt={leader.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <span className="text-white text-xl sm:text-2xl font-bold">
                        {leader.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-yellow-400 font-bold text-base sm:text-lg mb-0.5">{leader.name}</h3>
                <p className="text-blue-400 text-xs sm:text-sm font-medium mb-2 sm:mb-3">{leader.title}</p>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{leader.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 sm:mt-10 fade-up">
            <Link href="/staff">
              <button className="btn-gold px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm sm:text-base">
                Meet All Staff →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-16 sm:py-24 overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-yellow-900/40" />
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up">
          <img src={logoImg} alt="School Seal" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-yellow-500/40 mx-auto mb-5 sm:mb-6 pulse-gold" />
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">
            Ready to Begin Your <span className="gold-text">Journey?</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
            Join the growing family of students discovering their potential at DASBMSE. Enrollment is open — contact us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact">
              <button className="btn-gold w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold">
                Enroll Today →
              </button>
            </Link>
            <a
              href={`https://wa.me/${info.whatsapp.replace(/\D/g, "")}?text=Hello%2C%20I%20want%20to%20enroll.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-center"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
