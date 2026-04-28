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
      { threshold: 0.08 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="pt-14 sm:pt-20">
      {/* Page Hero */}
      <section className="relative py-16 sm:py-24 gradient-hero hero-pattern overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 to-slate-950/80" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-3 py-1.5 mb-4 sm:mb-6">
            <BookOpen size={12} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">About Our School</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3 sm:mb-4">
            About <span className="gold-text">DASBMSE</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-lg px-2">
            A legacy of excellence, discipline, and inspiration — serving Mount Barclay, Liberia since 2019.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-dark py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="fade-up order-2 lg:order-1">
              <p className="text-yellow-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3 sm:mb-4">Who We Are</p>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-4 sm:mb-6">
                More Than a School —<br />
                <span className="gold-text">A Community of Excellence</span>
              </h2>
              <div className="space-y-3 sm:space-y-4">
                {info.aboutDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed text-sm sm:text-base">{para}</p>
                ))}
              </div>
            </div>
            <div className="fade-up flex justify-center order-1 lg:order-2">
              <div className="relative">
                <img
                  src={logoImg}
                  alt="School Seal"
                  className="w-44 h-44 sm:w-64 sm:h-64 rounded-full object-cover ring-8 ring-yellow-500/20 pulse-gold"
                />
                <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-yellow-500 rounded-2xl p-3 sm:p-4 text-slate-950 font-bold text-center shadow-xl">
                  <div className="text-lg sm:text-2xl font-extrabold">Est.</div>
                  <div className="text-2xl sm:text-3xl font-extrabold">{info.established}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-navy py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16 fade-up">
            <p className="text-blue-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">Our Purpose</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              Mission & <span className="gold-text">Vision</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            <div className="card-glow rounded-xl sm:rounded-2xl p-5 sm:p-8 fade-up">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-yellow-500/10 flex items-center justify-center mb-4 sm:mb-6">
                <Target size={24} className="text-yellow-400" />
              </div>
              <h3 className="text-yellow-400 font-bold text-xl sm:text-2xl mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{info.mission}</p>
            </div>

            <div className="card-glow rounded-xl sm:rounded-2xl p-5 sm:p-8 fade-up">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 sm:mb-6">
                <Eye size={24} className="text-blue-400" />
              </div>
              <h3 className="text-blue-400 font-bold text-xl sm:text-2xl mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{info.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="section-dark py-12 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 fade-up">
            <p className="text-yellow-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">Our Story</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4">
              History of <span className="gold-text">Excellence</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="fade-up">
            <div className="flex items-start gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0 mt-1">
                <Clock size={18} className="text-yellow-400" />
              </div>
              <div className="space-y-3">
                {info.history.split("\n\n").map((para, i) => (
                  <p key={i} className="text-gray-300 leading-relaxed text-sm sm:text-base">{para}</p>
                ))}
              </div>
            </div>

            <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-4 sm:mb-6 text-center">Key Milestones</h3>
              {[
                { year: "2019", event: "School founded by Dr. Abraham S. Borbor. First students enrolled in Primary School." },
                { year: "2020", event: "Junior High School program launched. Community embraces the school's growing reputation." },
                { year: "2021", event: "Senior High School division opens. First WAEC examination candidates registered." },
                { year: "2023", event: "First graduation ceremony held. Students achieve strong WAEC results." },
                { year: "2025", event: "Major graduating class celebrated. Hundreds of students enrolled and thriving." },
              ].map((m, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4 fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-700 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0">
                      {m.year}
                    </div>
                    {i < 4 && <div className="w-0.5 h-6 sm:h-8 bg-yellow-500/20 mt-2" />}
                  </div>
                  <div className="pt-2 sm:pt-3">
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-navy py-12 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 fade-up">
            <p className="text-yellow-400 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-2 sm:mb-3">What We Stand For</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 sm:mb-4">
              Our Core <span className="gold-text">Values</span>
            </h2>
            <div className="section-divider" />
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
            {["Excellence", "Integrity", "Discipline", "Innovation", "Respect", "Service"].map((val, i) => (
              <div
                key={i}
                className="card-glow rounded-xl sm:rounded-2xl p-3 sm:p-6 text-center fade-up"
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className="text-2xl mb-1 sm:mb-2">{["🏆", "🤝", "📚", "💡", "🌟", "❤️"][i]}</div>
                <div className="text-yellow-400 font-bold text-xs sm:text-sm">{val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
