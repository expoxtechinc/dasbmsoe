import { useEffect, useRef } from "react";
import { Target, Eye, BookOpen, Clock } from "lucide-react";
import heroImg from "@assets/1777345276905_1777353675388.jpg";
import logoImg from "@assets/1777345079376_1777353648698.jpg";
import { getSchoolInfo } from "@/lib/school-data";

export default function About() {
  const info = getSchoolInfo();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="pt-20">
      {/* Page Hero */}
      <section className="relative py-24 gradient-hero hero-pattern overflow-hidden" data-testid="section-about-hero">
        <div className="absolute inset-0 overflow-hidden">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 to-slate-950/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <BookOpen size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">About Our School</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" data-testid="heading-about">
            About <span className="gold-text">DASBMSE</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg" data-testid="text-about-subtitle">
            A legacy of excellence, discipline, and inspiration — serving the community of Mount Barclay, Liberia since 2019.
          </p>
        </div>
      </section>

      {/* About Description */}
      <section className="section-dark py-24" data-testid="section-about-description">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="fade-up">
              <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-4">Who We Are</p>
              <h2 className="text-3xl font-extrabold text-white mb-6">
                More Than a School —<br />
                <span className="gold-text">A Community of Excellence</span>
              </h2>
              <div className="space-y-4">
                {info.aboutDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
            <div className="fade-up flex justify-center">
              <div className="relative">
                <img
                  src={logoImg}
                  alt="School Seal"
                  className="w-64 h-64 rounded-full object-cover ring-8 ring-yellow-500/20 pulse-gold"
                  data-testid="img-school-seal"
                />
                <div className="absolute -bottom-4 -right-4 bg-yellow-500 rounded-2xl p-4 text-slate-950 font-bold text-center shadow-xl">
                  <div className="text-2xl font-extrabold">Est.</div>
                  <div className="text-3xl font-extrabold">{info.established}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-navy py-24" data-testid="section-mission-vision">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Purpose</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Mission & <span className="gold-text">Vision</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card-glow rounded-2xl p-8 fade-up" data-testid="card-mission">
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-6">
                <Target size={28} className="text-yellow-400" />
              </div>
              <h3 className="text-yellow-400 font-bold text-2xl mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">{info.mission}</p>
            </div>

            <div className="card-glow rounded-2xl p-8 fade-up" data-testid="card-vision">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
                <Eye size={28} className="text-blue-400" />
              </div>
              <h3 className="text-blue-400 font-bold text-2xl mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">{info.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-dark py-24" data-testid="section-history">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Story</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              History of <span className="gold-text">Excellence</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="fade-up">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0 mt-1">
                <Clock size={22} className="text-yellow-400" />
              </div>
              <div className="space-y-4">
                {info.history.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {/* Timeline milestones */}
            <div className="mt-12 space-y-6">
              <h3 className="text-white font-bold text-xl mb-6 text-center">Key Milestones</h3>
              {[
                { year: "2019", event: "School founded by Dr. Abraham S. Borbor. First students enrolled in Primary School." },
                { year: "2020", event: "Junior High School program launched. Community embraces the school's growing reputation." },
                { year: "2021", event: "Senior High School division opens. First WAEC examination candidates registered." },
                { year: "2023", event: "First graduation ceremony held. Students achieve strong WAEC results." },
                { year: "2025", event: "Major graduating class celebrated. School continues to grow with hundreds of students enrolled." },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 fade-up"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                  data-testid={`milestone-${i}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0">
                      {m.year}
                    </div>
                    {i < 4 && <div className="w-0.5 h-8 bg-yellow-500/20 mt-2" />}
                  </div>
                  <div className="pt-3">
                    <p className="text-gray-300 leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-navy py-24" data-testid="section-values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">What We Stand For</p>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Our Core <span className="gold-text">Values</span>
            </h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {["Excellence", "Integrity", "Discipline", "Innovation", "Respect", "Service"].map((val, i) => (
              <div
                key={i}
                className="card-glow rounded-2xl p-6 text-center fade-up"
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-testid={`value-card-${i}`}
              >
                <div className="text-2xl mb-2">
                  {["🏆", "🤝", "📚", "💡", "🌟", "❤️"][i]}
                </div>
                <div className="text-yellow-400 font-bold text-sm">{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
