import { useState, useEffect, useRef } from "react";
import { Calendar, Tag } from "lucide-react";
import heroImg1 from "@assets/1777345276905_1777353675388.jpg";
import heroImg2 from "@assets/1777345307761_1777353675462.jpg";
import heroImg3 from "@assets/1777345320267_1777353675488.jpg";
import heroImg4 from "@assets/1777345369823_1777353675510.jpg";
import vpiImg from "@assets/1777345156902_1777353608235.jpg";
import { getActivities, getGalleryImages, Activity } from "@/lib/school-data";

const builtInGallery = [
  { id: "bi-1", src: heroImg1, caption: "2025 Graduation Ceremony", category: "Events" },
  { id: "bi-2", src: heroImg2, caption: "Class of 2024 Graduation", category: "Events" },
  { id: "bi-3", src: heroImg3, caption: "Student Assembly", category: "Academic" },
  { id: "bi-4", src: heroImg4, caption: "Inter-School Sports Day", category: "Sports" },
  { id: "bi-5", src: vpiImg, caption: "School Leadership", category: "Staff" },
];

const CATEGORIES = ["All", "Events", "Sports", "Academics", "Community", "Academic", "Staff"];

export default function Activities() {
  const [activities] = useState<Activity[]>(getActivities());
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const userGallery = getGalleryImages();
  const allGallery = [...builtInGallery, ...userGallery];
  const filteredGallery = filter === "All" ? allGallery : allGallery.filter((g) => g.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <div ref={ref} className="pt-20">
      {/* Hero */}
      <section className="relative py-24 gradient-hero hero-pattern overflow-hidden" data-testid="section-activities-hero">
        <div className="absolute inset-0">
          <img src={heroImg1} alt="" className="w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-slate-950/85" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <Calendar size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Activities & Gallery</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" data-testid="heading-activities">
            School <span className="gold-text">Activities</span> & Events
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Life at DASBMSE goes beyond the classroom — discover our events, sports, cultural programs, and community service.
          </p>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="section-dark py-24" data-testid="section-activities-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="text-yellow-400 text-sm font-semibold tracking-widest uppercase mb-3">Recent Events</p>
            <h2 className="text-3xl font-extrabold text-white mb-4">News & <span className="gold-text">Updates</span></h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activities.map((activity, i) => (
              <div
                key={activity.id}
                className="card-glow rounded-2xl p-6 fade-up"
                style={{ transitionDelay: `${i * 0.1}s` }}
                data-testid={`activity-card-${activity.id}`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/20 inline-flex items-center gap-1 mb-2">
                      <Tag size={10} />
                      {activity.category}
                    </span>
                    <h3 className="text-white font-bold text-lg">{activity.title}</h3>
                  </div>
                  <div className="shrink-0 flex items-center gap-1 text-gray-500 text-xs bg-white/5 rounded-lg px-3 py-2">
                    <Calendar size={12} />
                    {new Date(activity.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-navy py-24" data-testid="section-gallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 fade-up">
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">Photo Gallery</p>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Moments of <span className="gold-text">Excellence</span>
            </h2>
            <div className="section-divider mb-8" />

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.filter((c) => c === "All" || allGallery.some((g) => g.category === c)).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  data-testid={`filter-${cat.toLowerCase()}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat
                      ? "btn-gold"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGallery.map((img, i) => (
              <div
                key={img.id}
                className="relative rounded-2xl overflow-hidden aspect-square gallery-img cursor-pointer group fade-up"
                style={{ transitionDelay: `${(i % 8) * 0.05}s` }}
                onClick={() => setLightbox(img.src)}
                data-testid={`gallery-item-${img.id}`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div>
                    <p className="text-white text-xs font-semibold">{img.caption}</p>
                    <span className="text-yellow-400 text-xs">{img.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredGallery.length === 0 && (
            <div className="text-center py-12 text-gray-500" data-testid="gallery-empty">
              <p>No images in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          data-testid="lightbox"
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl font-light"
            onClick={() => setLightbox(null)}
            data-testid="button-close-lightbox"
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt="Gallery"
            className="max-h-[90vh] max-w-full rounded-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
