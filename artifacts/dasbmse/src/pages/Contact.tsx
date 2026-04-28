import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Facebook, Send, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { getSchoolInfo } from "@/lib/school-data";

export default function Contact() {
  const info = getSchoolInfo();
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Static form — show confirmation
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div ref={ref} className="pt-20">
      {/* Hero */}
      <section className="relative py-24 gradient-hero hero-pattern overflow-hidden" data-testid="section-contact-hero">
        <div className="absolute inset-0 bg-slate-950/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-2 mb-6">
            <MessageCircle size={14} className="text-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Get In Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4" data-testid="heading-contact">
            Contact <span className="gold-text">Us</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            We're here to answer your questions about enrollment, programs, and school life. Reach out today.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-dark py-24" data-testid="section-contact-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div className="fade-up">
              <h2 className="text-2xl font-extrabold text-white mb-8">
                Reach Out to <span className="gold-text">DASBMSE</span>
              </h2>

              <div className="space-y-6">
                {/* Location */}
                <div className="card-glow rounded-2xl p-6 flex items-start gap-4" data-testid="info-location">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center shrink-0">
                    <MapPin size={22} className="text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 font-bold text-base mb-1">Our Location</h3>
                    <p className="text-gray-300 text-sm">{info.location}</p>
                    <p className="text-gray-500 text-xs mt-1">Mount Barclay is along the Robertsfield Highway, Lower Johnsonville, Margibi County, Liberia</p>
                  </div>
                </div>

                {/* Email */}
                <div className="card-glow rounded-2xl p-6 flex items-start gap-4" data-testid="info-email">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Mail size={22} className="text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-blue-400 font-bold text-base mb-1">Email Us</h3>
                    <a
                      href={`mailto:${info.email}`}
                      className="text-gray-300 text-sm hover:text-yellow-400 transition-colors break-all"
                      data-testid="link-email"
                    >
                      {info.email}
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="card-glow rounded-2xl p-6 flex items-start gap-4" data-testid="info-phones">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                    <Phone size={22} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-green-400 font-bold text-base mb-2">Call Us</h3>
                    <div className="space-y-1">
                      {info.phones.map((phone, i) => (
                        <a
                          key={i}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="block text-gray-300 text-sm hover:text-yellow-400 transition-colors"
                          data-testid={`link-phone-${i}`}
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-4">
                  <a
                    href={info.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-glow rounded-2xl p-5 flex items-center gap-3 group"
                    data-testid="link-facebook-contact"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                      <Facebook size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">Facebook</div>
                      <div className="text-gray-500 text-xs">DASBMSE</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${info.whatsapp.replace(/\D/g, "")}?text=Hello%2C%20I'm%20interested%20in%20enrolling%20at%20DASBMSE.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-glow rounded-2xl p-5 flex items-center gap-3 group"
                    data-testid="link-whatsapp-contact"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-600/20 flex items-center justify-center group-hover:bg-green-600/30 transition-colors">
                      <FaWhatsapp size={20} className="text-green-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">WhatsApp</div>
                      <div className="text-gray-500 text-xs">{info.whatsapp}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="fade-up">
              <div className="card-glow rounded-3xl p-8" data-testid="contact-form-container">
                <h2 className="text-2xl font-extrabold text-white mb-6">
                  Send Us a <span className="gold-text">Message</span>
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/30 text-green-300 text-sm" data-testid="alert-success">
                    ✅ Thank you! Your message has been received. We'll get back to you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm font-medium mb-1.5 block" htmlFor="contact-name">Full Name *</label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                        data-testid="input-name"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm font-medium mb-1.5 block" htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm font-medium mb-1.5 block" htmlFor="contact-phone">Phone Number</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+231 XXX XXX XXX"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                      data-testid="input-phone"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm font-medium mb-1.5 block" htmlFor="contact-subject">Subject *</label>
                    <select
                      id="contact-subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all"
                      data-testid="select-subject"
                    >
                      <option value="" className="bg-slate-900">Select subject</option>
                      <option value="enrollment" className="bg-slate-900">Enrollment Inquiry</option>
                      <option value="programs" className="bg-slate-900">Academic Programs</option>
                      <option value="fees" className="bg-slate-900">School Fees</option>
                      <option value="transfer" className="bg-slate-900">Transfer Request</option>
                      <option value="general" className="bg-slate-900">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 text-sm font-medium mb-1.5 block" htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 transition-all resize-none"
                      data-testid="textarea-message"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                    data-testid="button-submit-contact"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-navy py-12" data-testid="section-map">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up">
            <h2 className="text-2xl font-extrabold text-white mb-6 text-center">
              Find <span className="gold-text">Us</span>
            </h2>
            <div className="rounded-3xl overflow-hidden border border-yellow-500/10 h-80 md:h-96">
              <iframe
                title="School Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.0756553773!2d-10.721!3d6.306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMjEuNiJOIDEwwrA0Myc1NS42Ilc!5e0!3m2!1sen!2slr!4v1700000000000!5m2!1sen!2slr"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                data-testid="map-iframe"
              />
            </div>
            <p className="text-gray-500 text-xs text-center mt-3">
              Mount Barclay, Lower Johnsonville, Margibi County, Liberia
            </p>
          </div>
        </div>
      </section>

      {/* Quick WhatsApp CTA */}
      <section className="section-dark py-16" data-testid="section-whatsapp-cta">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center fade-up">
          <div className="card-glow rounded-3xl p-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <FaWhatsapp size={32} className="text-green-400" />
            </div>
            <h3 className="text-white font-extrabold text-xl mb-3">Prefer to Chat?</h3>
            <p className="text-gray-400 text-sm mb-6">
              Click below to start a WhatsApp conversation directly with the school. Quick, easy, and immediate.
            </p>
            <a
              href={`https://wa.me/${info.whatsapp.replace(/\D/g, "")}?text=Hello%2C%20I'm%20interested%20in%20learning%20more%20about%20DASBMSE.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-green-500/30"
              data-testid="button-whatsapp-cta"
            >
              <FaWhatsapp size={20} />
              Start WhatsApp Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
