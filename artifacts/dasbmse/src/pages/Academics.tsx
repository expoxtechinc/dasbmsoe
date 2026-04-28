import { useEffect, useRef } from "react";
import { BookOpen, CheckCircle, GraduationCap } from "lucide-react";
import heroImg from "@assets/1777345320267_1777353675488.jpg";

export default function Academics() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const programs = [
    {
      title: "Primary School",
      grades: "Grades 1–6 (Ages 6–12)",
      color: "from-blue-600/30 to-blue-900/20",
      border: "border-blue-500/30",
      headerBg: "bg-blue-600/20",
      badge: "bg-blue-500 text-white",
      icon: "📚",
      desc: "Our Primary School program lays the critical foundations of learning. In a nurturing, structured environment, young learners develop literacy, numeracy, and a love for knowledge that will carry them throughout their academic lives.",
      subjects: [
        { name: "English Language", detail: "Reading, writing, grammar, and spoken English" },
        { name: "Mathematics", detail: "Number sense, arithmetic, basic geometry and problem-solving" },
        { name: "General Science", detail: "Introduction to the natural world and scientific thinking" },
        { name: "Social Studies", detail: "Family, community, Liberian history, and civic values" },
        { name: "Liberian History", detail: "National heritage, culture, and identity" },
        { name: "Religious & Moral Education", detail: "Character development and ethical values" },
      ],
      highlights: ["Small class sizes for personalized attention", "Focus on literacy and numeracy mastery", "Regular parent-teacher communication", "Extracurricular activities included"],
    },
    {
      title: "Junior High School",
      grades: "Grades 7–9 (Ages 12–16)",
      color: "from-yellow-600/30 to-yellow-900/20",
      border: "border-yellow-500/30",
      headerBg: "bg-yellow-600/20",
      badge: "bg-yellow-500 text-slate-950",
      icon: "🎓",
      desc: "Junior High School is where students begin developing deeper academic skills and expanding their horizons. Our curriculum prepares students rigorously for the WAEC Junior High School Certificate Examination (JHSCE), with strong emphasis on analytical thinking and academic discipline.",
      subjects: [
        { name: "English Language", detail: "Composition, comprehension, literature, and communication" },
        { name: "Mathematics", detail: "Algebra, geometry, statistics, and reasoning" },
        { name: "General Science", detail: "Physics, chemistry, and biology fundamentals" },
        { name: "Social Studies", detail: "Geography, Liberian & world history, economics" },
        { name: "French Language", detail: "Introductory conversational and written French" },
        { name: "Health Science", detail: "Personal health, hygiene, and community wellness" },
        { name: "Agriculture", detail: "Practical farming concepts and food security" },
        { name: "Home Economics / Fine Arts", detail: "Life skills, creativity, and practical arts" },
      ],
      highlights: [
        "Structured WAEC JHSCE exam preparation",
        "Subject-specialist teachers",
        "Academic counseling and mentoring",
        "Science laboratory access",
      ],
    },
    {
      title: "Senior High School",
      grades: "Grades 10–12 (Ages 16–19)",
      color: "from-green-600/30 to-green-900/20",
      border: "border-green-500/30",
      headerBg: "bg-green-600/20",
      badge: "bg-green-500 text-white",
      icon: "🏛️",
      desc: "Our Senior High School is where students are fully prepared for the WAEC Senior School Certificate Examination (SSCE) and university entrance. Students choose from focused academic tracks aligned with their career aspirations. Our graduates have been admitted to top universities in Liberia and abroad.",
      subjects: [
        { name: "Mathematics", detail: "Advanced algebra, calculus, and statistics" },
        { name: "English Language", detail: "Advanced composition, literature analysis, debates" },
        { name: "Biology", detail: "Cell biology, genetics, ecology, and human biology" },
        { name: "Chemistry", detail: "Organic, inorganic, and physical chemistry" },
        { name: "Physics", detail: "Mechanics, electricity, waves, and modern physics" },
        { name: "Economics", detail: "Microeconomics, macroeconomics, and development" },
        { name: "Government", detail: "Liberian & global political systems and governance" },
        { name: "Literature in English", detail: "African and world literature analysis" },
        { name: "Information & Communication Technology", detail: "Computer fundamentals, internet, MS Office" },
      ],
      highlights: [
        "Intensive WAEC SSCE exam preparation",
        "University counseling and application support",
        "Science and computer laboratories",
        "Leadership development program",
      ],
    },
  ];

  return (
    <div ref={ref} className="pt-20">
      {/* Hero */}
      <section className="relative py-24 gradient-hero hero-pattern overflow-hidden" data-testid="section-academics-hero">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
            <GraduationCap size={14} className="text-blue-400" />
            <span className="text-blue-400 text-xs font-semibold tracking-widest uppercase">Academic Programs</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" data-testid="heading-academics">
            Our <span className="gold-text">Academic</span> Programs
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Comprehensive education from Primary through Senior High School — preparing every student for lifelong success.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section className="section-dark py-24" data-testid="section-programs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {programs.map((prog, i) => (
            <div
              key={i}
              className={`rounded-3xl border bg-gradient-to-br ${prog.color} ${prog.border} overflow-hidden fade-up`}
              data-testid={`program-detail-${i}`}
            >
              <div className={`${prog.headerBg} px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-4`}>
                <div className="text-4xl">{prog.icon}</div>
                <div>
                  <h2 className="text-2xl font-extrabold text-white">{prog.title}</h2>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${prog.badge} inline-block mt-1`}>
                    {prog.grades}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <p className="text-gray-300 leading-relaxed mb-8">{prog.desc}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Subjects */}
                  <div>
                    <h3 className="text-yellow-400 font-bold text-lg mb-4 flex items-center gap-2">
                      <BookOpen size={18} />
                      Core Subjects
                    </h3>
                    <div className="space-y-3">
                      {prog.subjects.map((subj, j) => (
                        <div
                          key={j}
                          className="flex items-start gap-3 bg-white/5 rounded-xl p-3"
                          data-testid={`subject-${i}-${j}`}
                        >
                          <CheckCircle size={16} className="text-yellow-400 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-white text-sm font-semibold">{subj.name}</div>
                            <div className="text-gray-400 text-xs">{subj.detail}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div>
                    <h3 className="text-blue-400 font-bold text-lg mb-4 flex items-center gap-2">
                      <GraduationCap size={18} />
                      Program Highlights
                    </h3>
                    <div className="space-y-3">
                      {prog.highlights.map((h, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-3 bg-white/5 rounded-xl p-3"
                          data-testid={`highlight-${i}-${j}`}
                        >
                          <div className="w-2 h-2 bg-blue-400 rounded-full shrink-0" />
                          <p className="text-gray-300 text-sm">{h}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Examination Board */}
      <section className="section-navy py-20" data-testid="section-examboard">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="fade-up">
            <h2 className="text-2xl font-extrabold text-white mb-4">
              National Examination <span className="gold-text">Excellence</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              DASBMSE students sit for the West African Examinations Council (WAEC) examinations for both Junior High School Certificate (JHSCE) and Senior School Certificate (SSCE). Our structured preparation programs have helped our students achieve outstanding results.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "WAEC JHSCE", desc: "Junior High Certificate — Gateway to Senior High", icon: "📋" },
                { label: "WAEC SSCE", desc: "Senior School Certificate — University Admission", icon: "🎓" },
                { label: "University Placement", desc: "Support for higher education applications", icon: "🏛️" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card-glow rounded-2xl p-6"
                  data-testid={`exam-card-${i}`}
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h4 className="text-yellow-400 font-bold mb-2">{item.label}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
