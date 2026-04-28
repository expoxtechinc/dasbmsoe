import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { ChevronDown, Award, Users, BookOpen, Star, GraduationCap, Heart, Zap } from "lucide-react";
import heroImg1 from "@assets/1777345276905_1777353675388.jpg";
import heroImg2 from "@assets/1777345307761_1777353675462.jpg";
import heroImg3 from "@assets/1777345320267_1777353675488.jpg";
import heroImg4 from "@assets/1777345369823_1777353675510.jpg";
import logoImg from "@assets/1777345079376_1777353648698.jpg";
import { getSchoolInfo } from "@/lib/school-data";

export default function Home() {
  const info = getSchoolInfo();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen gradient-hero hero-pattern flex items-center overflow-hidden" data-testid="section-hero">
        {/* Background image grid - subtle */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-15">
            <img src={heroImg1} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-yellow-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-8 fade-up" data-testid="badge-established">
              <Star size={14} className="text-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Est. {info.established} · Mount Barclay, Liberia</span>
            </div>

            {/* School Name */}
            <h1 className="font-extrabold leading-tight mb-6 text-4xl sm:text-5xl lg:text-6xl fade-up" data-testid="heading-school-name">
              <span className="blue-text">Dr. Abraham S. Borbor</span>
              <br />
              <span className="text-white">Memorial School</span>
              <br />
              <span className="gold-text">of Excellence</span>
            </h1>

            {/* Slogan */}
            <p className="text-blue-300 text-xl sm:text-2xl font-medium italic mb-4 fade-up" data-testid="text-slogan">
              "{info.slogan}"
            </p>

            <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl leading-relaxed fade-up" data-testid="text-hero-desc">
              Providing world-class education from Primary through Senior High School in the heart of Liberia. Shaping futures, building character, and inspiring excellence every day.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 fade-up" data-testid="hero-cta-group">
              <Link href="/contact" data-testid="button-enroll-now">
                <button className="btn-gold px-8 py-4 rounded-xl text-base font-bold tracking-wide w-full sm:w-auto">
                  Enroll Now →
                </button>
              </Link>
              <Link href="/about" data-testid="button-learn-more">
                <button className="px-8 py-4 rounded-xl text-base font-semibold border border-white/20 text-white hover:bg-white/5 transition-all w-full sm:w-auto">
                  Learn More
                </button>
              </Link>
              <a
                href="https://www.facebook.com/DASBMSE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-blue px-8 py-4 rounded-xl text-base font-semibold text-center w-full sm:w-auto"
                data-testid="button-facebook"
              >
                Facebook Page
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-500 text-xs">Scroll Down</span>
          <ChevronDown size={20} className="text-gray-500" />
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="section-navy py-16" data-testid="section-stats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: <GraduationCap size={28} className="text-yellow-400" />, number: "3", label: "Academic Programs", sublabel: "Primary · Junior · Senior High" },
              { icon: <Users size={28} className="text-blue-400" />, number: "500+", label: "Students Enrolled", sublabel: "Growing every year" },
              { icon: <Award size={28} className="text-yellow-400" />, number: "6+", label: "Years of Excellence", sublabel: "Founded in 2019" },
              { icon: <Heart size={28} className="text-blue-400" />, number: "100%", label: "Dedicated Staff", sublabel: "Passionate educators" },
            ].map((stat, i) => (
              <div key={i} className="stat-card rounded-2xl p-6 text-center fade-up" data-testid={`stat-card-${i}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-white mb-1">{stat.number}</div>
                <div className="text-yellow-400 text-sm font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-500 text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS SECTION ===== */}
      <section className="section-dark py-24" data-testid="section-highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">Why Choose Us</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              A School That <span className="gold-text">Transforms</span> Lives
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BookOpen size={32} className="text-yellow-400" />,
                title: "Quality Education",
                desc: "Our curriculum meets national and international standards, ensuring every student receives an education that opens doors to universities and careers worldwide.",
              },
              {
                icon: <Award size={32} className="text-blue-400" />,
                title: "Discipline & Character",
                desc: "We cultivate not just academic excellence but moral integrity, leadership, and responsibility. Our students graduate as complete human beings, ready for life.",
              },
              {
                icon: <Zap size={32} className="text-yellow-400" />,
                title: "Innovation & Excellence",
                desc: "From science fairs to cultural programs, we encourage innovation and creative thinking, preparing our students to compete in the modern global economy.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card-glow rounded-2xl p-8 text-center fade-up"
                style={{ transitionDelay: `${i * 0.15}s` }}
                data-testid={`highlight-card-${i}`}
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-5">
                  {item.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS PREVIEW ===== */}
      <section className="section-navy py-24" data-testid="section-programs-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Academic Programs</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Education from <span className="blue-text">Start</span> to <span className="gold-text">Success</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                level: "Primary School",
                grades: "Grades 1–6",
                color: "from-blue-600/20 to-blue-800/20",
                border: "border-blue-500/30",
                badge: "bg-blue-500/20 text-blue-300",
                desc: "Building strong foundations in literacy, numeracy, science, and social studies. Every child's journey starts here with caring, skilled teachers.",
                subjects: ["English", "Mathematics", "Science", "Social Studies", "Liberian History"],
              },
              {
                level: "Junior High School",
                grades: "Grades 7–9",
                color: "from-yellow-600/20 to-yellow-800/20",
                border: "border-yellow-500/30",
                badge: "bg-yellow-500/20 text-yellow-300",
                desc: "Expanding knowledge across core subjects while developing critical thinking, study habits, and preparation for the WAEC Junior examinations.",
                subjects: ["Mathematics", "English", "General Science", "Geography", "History", "French"],
              },
              {
                level: "Senior High School",
                grades: "Grades 10–12",
                color: "from-green-600/20 to-green-800/20",
                border: "border-green-500/30",
                badge: "bg-green-500/20 text-green-300",
                desc: "Intensive preparation for WAEC Senior School Certificate and university entrance. Students choose specialized tracks to pursue their career goals.",
                subjects: ["Biology", "Chemistry", "Physics", "Economics", "Government", "Literature", "ICT"],
              },
            ].map((prog, i) => (
              <div
                key={i}
                className={`rounded-2xl p-8 border bg-gradient-to-br ${prog.color} ${prog.border} fade-up transition-all duration-300 hover:scale-105`}
                style={{ transitionDelay: `${i * 0.15}s` }}
                data-testid={`program-card-${i}`}
              >
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${prog.badge} mb-4 inline-block`}>
                  {prog.grades}
                </span>
                <h3 className="text-white font-bold text-xl mb-3">{prog.level}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{prog.desc}</p>
                <ul className="space-y-1">
                  {prog.subjects.map((s, j) => (
                    <li key={j} className="text-gray-500 text-xs flex items-center gap-2">
                      <span className="w-1 h-1 bg-yellow-500 rounded-full" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 fade-up">
            <Link href="/academics" data-testid="button-view-academics">
              <button className="btn-gold px-8 py-3 rounded-xl font-semibold">
                View Full Curriculum →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="section-dark py-24" data-testid="section-gallery-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">Life at DASBMSE</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Moments of <span className="gold-text">Excellence</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-up">
            {[heroImg1, heroImg2, heroImg3, heroImg4].map((img, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden aspect-square gallery-img cursor-pointer group"
                data-testid={`gallery-preview-${i}`}
              >
                <img src={img} alt={`School photo ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>

          <div className="text-center mt-10 fade-up">
            <Link href="/activities" data-testid="button-view-gallery">
              <button className="btn-blue px-8 py-3 rounded-xl font-semibold">
                View All Activities & Gallery →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP PREVIEW ===== */}
      <section className="section-navy py-24" data-testid="section-leadership-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Guided by <span className="gold-text">Visionary</span> Leaders
            </h2>
            <div className="section-divider" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto fade-up">
            {[
              { name: info.principalName, title: info.principalTitle, img: heroImg1, desc: "Leading with vision, compassion, and an unwavering commitment to academic excellence." },
              { name: info.vpiName, title: info.vpiTitle, img: null, desc: "Supporting student development, curriculum excellence, and school administration with dedication." },
            ].map((leader, i) => (
              <div
                key={i}
                className="staff-card rounded-2xl p-8 text-center flex-1"
                data-testid={`leader-card-${i}`}
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden ring-4 ring-yellow-500/30">
                  {leader.img ? (
                    <img src={leader.img} alt={leader.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {leader.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-yellow-400 font-bold text-lg mb-1">{leader.name}</h3>
                <p className="text-blue-400 text-sm font-medium mb-3">{leader.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{leader.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 fade-up">
            <Link href="/staff" data-testid="button-view-staff">
              <button className="btn-gold px-8 py-3 rounded-xl font-semibold">
                Meet All Staff →
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="relative py-24 overflow-hidden" data-testid="section-cta">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-yellow-900/40" />
        <div className="absolute inset-0 hero-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up">
          <img src={logoImg} alt="School Seal" className="w-20 h-20 rounded-full object-cover ring-4 ring-yellow-500/40 mx-auto mb-6 pulse-gold" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to Begin Your <span className="gold-text">Journey?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Join the growing family of students who are discovering their potential at Dr. Abraham S. Borbor Memorial School of Excellence. Enrollment is open — contact us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="button-cta-enroll">
              <button className="btn-gold px-10 py-4 rounded-xl text-base font-bold">
                Enroll Today →
              </button>
            </Link>
            <a
              href={`https://wa.me/${info.whatsapp.replace(/\D/g, "")}?text=Hello%2C%20I%20want%20to%20enroll%20my%20child.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-blue px-10 py-4 rounded-xl text-base font-semibold text-center"
              data-testid="button-cta-whatsapp"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
