import { useEffect, useRef } from "react";
import { Users, Award } from "lucide-react";
import principalImg from "@assets/1777345276905_1777353675388.jpg";
import vpiImg from "@assets/1777345156902_1777353608235.jpg";
import { getSchoolInfo, getTeachers } from "@/lib/school-data";

export default function Staff() {
  const info = getSchoolInfo();
  const teachers = getTeachers();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  return (
    <div ref={ref} className="pt-20">
      {/* Hero */}
      <section className="relative py-24 gradient-hero hero-pattern overflow-hidden" data-testid="section-staff-hero">
        <div className="absolute inset-0 bg-slate-950/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <Users size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Our Team</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" data-testid="heading-staff">
            Staff & <span className="gold-text">Leadership</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Meet the dedicated educators and leaders who make DASBMSE a school of true excellence.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-dark py-24" data-testid="section-leadership">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">School Leadership</p>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Our <span className="gold-text">Leadership</span> Team
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Principal */}
            <div className="staff-card rounded-3xl p-8 text-center fade-up" data-testid="card-principal">
              <div className="relative inline-block mb-6">
                <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-yellow-500/40 mx-auto">
                  <img
                    src={principalImg}
                    alt={info.principalName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-2">
                  <Award size={16} className="text-slate-950" />
                </div>
              </div>
              <h3 className="text-yellow-400 font-extrabold text-xl mb-1">{info.principalName}</h3>
              <p className="text-blue-400 text-sm font-semibold mb-1">{info.principalTitle}</p>
              <p className="text-gray-500 text-xs mb-4">Dr. Abraham S. Borbor Memorial School of Excellence</p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "Our commitment is to provide every student with the tools, knowledge, and character to succeed — not just in examinations, but in life. At DASBMSE, we don't just teach, we truly inspire."
                </p>
              </div>
            </div>

            {/* VPI */}
            <div className="staff-card rounded-3xl p-8 text-center fade-up" data-testid="card-vpi">
              <div className="relative inline-block mb-6">
                <div className="w-36 h-36 rounded-full overflow-hidden ring-4 ring-blue-500/40 mx-auto">
                  <img
                    src={vpiImg}
                    alt={info.vpiName}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-2">
                  <Award size={16} className="text-white" />
                </div>
              </div>
              <h3 className="text-blue-400 font-extrabold text-xl mb-1">{info.vpiName}</h3>
              <p className="text-yellow-400 text-sm font-semibold mb-1">{info.vpiTitle}</p>
              <p className="text-gray-500 text-xs mb-4">Dr. Abraham S. Borbor Memorial School of Excellence</p>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "Academic excellence is built on consistent effort, strong mentorship, and a belief in every student's potential. We work every day to create an environment where that potential can flourish."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Staff */}
      <section className="section-navy py-24" data-testid="section-teachers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-up">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Our Educators</p>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Dedicated <span className="gold-text">Teaching Staff</span>
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher, i) => (
              <div
                key={teacher.id}
                className="staff-card rounded-2xl p-6 flex items-center gap-4 fade-up"
                style={{ transitionDelay: `${i * 0.08}s` }}
                data-testid={`teacher-card-${teacher.id}`}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shrink-0 ring-2 ring-yellow-500/20">
                  <span className="text-white font-bold text-lg">{initials(teacher.name)}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base">{teacher.name}</h3>
                  <p className="text-yellow-400 text-sm font-medium">{teacher.subject}</p>
                  <p className="text-gray-500 text-xs mt-1">{teacher.qualification}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Placeholder note */}
          <div className="mt-10 text-center fade-up">
            <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-2xl px-8 py-6 max-w-lg">
              <div className="text-3xl mb-3">👩‍🏫</div>
              <h4 className="text-yellow-400 font-bold text-lg mb-2">More Staff Coming Soon</h4>
              <p className="text-gray-400 text-sm">
                The Admin Panel allows school management to add and update all staff members at any time. Additional teachers and support staff profiles will be added by the administration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-dark py-16" data-testid="section-staff-values">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-up">
            <h2 className="text-2xl font-extrabold text-white mb-6">
              What Makes Our Staff <span className="gold-text">Exceptional</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { emoji: "🎯", label: "Subject Expertise" },
                { emoji: "💪", label: "Dedication" },
                { emoji: "🌱", label: "Student-Centered" },
                { emoji: "📈", label: "Continuous Growth" },
              ].map((item, i) => (
                <div key={i} className="card-glow rounded-xl p-4" data-testid={`staff-value-${i}`}>
                  <div className="text-2xl mb-2">{item.emoji}</div>
                  <p className="text-gray-300 text-sm font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
