import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  Shield, LogOut, Settings, Users, Camera, BookOpen,
  Plus, Trash2, Edit3, Save, X, Eye, EyeOff, Upload,
  FileText, AlertCircle, CheckCircle, Home
} from "lucide-react";
import {
  checkAdminAuth, adminLogin, adminLogout, changeAdminPassword,
  getSchoolInfo, setSchoolInfo, getActivities, setActivities,
  getTeachers, setTeachers, getGalleryImages, setGalleryImages,
  Activity, Teacher, GalleryImage
} from "@/lib/school-data";

type Tab = "dashboard" | "school-info" | "activities" | "gallery" | "staff" | "password";

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(checkAdminAuth());
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // School info state
  const [schoolInfo, setSchoolInfoState] = useState(getSchoolInfo());

  // Activities state
  const [activities, setActivitiesState] = useState<Activity[]>(getActivities());
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({ title: "", description: "", date: "", category: "Events" });
  const [editingActivity, setEditingActivity] = useState<string | null>(null);

  // Teachers state
  const [teachers, setTeachersState] = useState<Teacher[]>(getTeachers());
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({ name: "", subject: "", qualification: "" });

  // Gallery state
  const [gallery, setGalleryState] = useState<GalleryImage[]>(getGalleryImages());
  const [newCaption, setNewCaption] = useState("");
  const [newCategory, setNewCategory] = useState("Events");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Password change
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const showSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    if (adminLogin(loginEmail, loginPassword)) {
      setAuthenticated(true);
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = () => {
    adminLogout();
    setAuthenticated(false);
  };

  // School info save
  const saveSchoolInfo = () => {
    setSchoolInfo(schoolInfo);
    showSaved();
  };

  // Activities
  const addActivity = () => {
    if (!newActivity.title || !newActivity.description) return;
    const act: Activity = {
      id: Date.now().toString(),
      title: newActivity.title!,
      description: newActivity.description!,
      date: newActivity.date || new Date().toISOString().split("T")[0],
      category: newActivity.category || "Events",
    };
    const updated = [act, ...activities];
    setActivitiesState(updated);
    setActivities(updated);
    setNewActivity({ title: "", description: "", date: "", category: "Events" });
    showSaved();
  };

  const deleteActivity = (id: string) => {
    const updated = activities.filter((a) => a.id !== id);
    setActivitiesState(updated);
    setActivities(updated);
    showSaved();
  };

  // Teachers
  const addTeacher = () => {
    if (!newTeacher.name || !newTeacher.subject) return;
    const teacher: Teacher = {
      id: Date.now().toString(),
      name: newTeacher.name!,
      subject: newTeacher.subject!,
      qualification: newTeacher.qualification || "",
    };
    const updated = [...teachers, teacher];
    setTeachersState(updated);
    setTeachers(updated);
    setNewTeacher({ name: "", subject: "", qualification: "" });
    showSaved();
  };

  const deleteTeacher = (id: string) => {
    const updated = teachers.filter((t) => t.id !== id);
    setTeachersState(updated);
    setTeachers(updated);
    showSaved();
  };

  // Gallery
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const img: GalleryImage = {
          id: Date.now().toString() + Math.random(),
          src: ev.target?.result as string,
          caption: newCaption || file.name,
          category: newCategory,
        };
        const updated = [...getGalleryImages(), img];
        setGalleryImages(updated);
        setGalleryState(updated);
        showSaved();
      };
      reader.readAsDataURL(file);
    });
    setNewCaption("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deleteGalleryImage = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGalleryState(updated);
    setGalleryImages(updated);
  };

  // Password change
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (newPw !== confirmPw) {
      setError("New passwords do not match.");
      return;
    }
    if (newPw.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (changeAdminPassword(currentPw, newPw)) {
      setCurrentPw("");
      setNewPw("");
      setConfirmPw("");
      showSaved();
    } else {
      setError("Current password is incorrect.");
    }
  };

  // PDF Brochure Generator
  const generatePDF = () => {
    const info = getSchoolInfo();
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>DASBMSE School Brochure</title>
  <style>
    body { font-family: Arial, sans-serif; color: #1a1a2e; margin: 0; padding: 0; }
    .header { background: linear-gradient(135deg, #1e3a5f, #0f2845); color: white; padding: 40px; text-align: center; }
    .header h1 { font-size: 24px; margin: 0 0 8px; color: #F59E0B; }
    .header p { margin: 4px 0; font-size: 14px; color: #93c5fd; }
    .section { padding: 20px 40px; border-bottom: 1px solid #e5e7eb; }
    .section h2 { color: #1e3a5f; font-size: 18px; border-left: 4px solid #F59E0B; padding-left: 10px; }
    .section p { font-size: 13px; line-height: 1.7; color: #374151; }
    .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 10px; }
    .card { background: #f8f9fa; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }
    .card h3 { font-size: 13px; color: #1e3a5f; margin: 0 0 6px; }
    .card ul { font-size: 12px; color: #6b7280; margin: 0; padding-left: 16px; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px; }
    .contact-item { font-size: 13px; }
    .contact-item strong { color: #1e3a5f; }
    .footer { background: #1e3a5f; color: #93c5fd; text-align: center; padding: 20px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${info.name}</h1>
    <p>${info.location}</p>
    <p style="font-style:italic; color: #fcd34d">"${info.slogan}"</p>
    <p style="margin-top:10px;">Established ${info.established}</p>
  </div>

  <div class="section">
    <h2>About Our School</h2>
    <p>${info.aboutDescription.split("\n\n")[0]}</p>
  </div>

  <div class="section">
    <h2>Mission & Vision</h2>
    <p><strong>Mission:</strong> ${info.mission}</p>
    <p><strong>Vision:</strong> ${info.vision}</p>
  </div>

  <div class="section">
    <h2>Academic Programs</h2>
    <div class="grid">
      <div class="card">
        <h3>📚 Primary School (Grades 1–6)</h3>
        <ul><li>English Language</li><li>Mathematics</li><li>General Science</li><li>Social Studies</li><li>Liberian History</li></ul>
      </div>
      <div class="card">
        <h3>🎓 Junior High (Grades 7–9)</h3>
        <ul><li>Mathematics</li><li>English Language</li><li>General Science</li><li>Social Studies</li><li>French Language</li></ul>
      </div>
      <div class="card">
        <h3>🏛️ Senior High (Grades 10–12)</h3>
        <ul><li>Biology & Chemistry</li><li>Physics</li><li>Economics</li><li>Government</li><li>ICT</li></ul>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>School Leadership</h2>
    <p><strong>Principal:</strong> ${info.principalName}</p>
    <p><strong>Vice Principal:</strong> ${info.vpiName}</p>
  </div>

  <div class="section">
    <h2>Contact Information</h2>
    <div class="contact-grid">
      <div class="contact-item"><strong>📍 Location:</strong><br />${info.location}</div>
      <div class="contact-item"><strong>📧 Email:</strong><br />${info.email}</div>
      ${info.phones.map((p, i) => `<div class="contact-item"><strong>📞 Phone ${i + 1}:</strong><br />${p}</div>`).join("")}
      <div class="contact-item"><strong>📘 Facebook:</strong><br />${info.facebook}</div>
      <div class="contact-item"><strong>💬 WhatsApp:</strong><br />${info.whatsapp}</div>
    </div>
  </div>

  <div class="footer">
    <p>&copy; ${new Date().getFullYear()} ${info.name} | Built by SasTech Inc</p>
    <p>For enrollment inquiries, contact us via WhatsApp or visit us at Mount Barclay, Liberia.</p>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    if (win) {
      win.onload = () => win.print();
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen gradient-hero hero-pattern flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="card-glow rounded-3xl p-8" data-testid="login-form-container">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-yellow-400" />
              </div>
              <h1 className="text-2xl font-extrabold text-white mb-2" data-testid="heading-admin-login">Admin Login</h1>
              <p className="text-gray-400 text-sm">Dr. Abraham S. Borbor Memorial School — Administration Portal</p>
            </div>

            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm flex items-center gap-2" data-testid="alert-login-error">
                <AlertCircle size={16} />
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4" data-testid="form-login">
              <div>
                <label className="text-gray-400 text-sm font-medium mb-1.5 block">Admin Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@dasbmse.edu.lr"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30"
                  data-testid="input-admin-email"
                />
              </div>
              <div className="relative">
                <label className="text-gray-400 text-sm font-medium mb-1.5 block">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/30 pr-12"
                  data-testid="input-admin-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-500 hover:text-gray-300"
                  data-testid="button-toggle-password"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <button
                type="submit"
                className="btn-gold w-full py-3.5 rounded-xl font-bold text-sm mt-2"
                data-testid="button-login-submit"
              >
                Access Admin Panel
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors" data-testid="link-back-home">
                ← Back to Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { id: "school-info", label: "School Info", icon: <Settings size={18} /> },
    { id: "activities", label: "Activities", icon: <BookOpen size={18} /> },
    { id: "gallery", label: "Gallery", icon: <Camera size={18} /> },
    { id: "staff", label: "Staff", icon: <Users size={18} /> },
    { id: "password", label: "Security", icon: <Shield size={18} /> },
  ];

  return (
    <div className="min-h-screen section-dark pt-20">
      {/* Admin Header */}
      <div className="nav-glass sticky top-16 z-40 border-b border-yellow-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-yellow-400" />
              <span className="text-white font-bold text-sm">Admin Panel</span>
            </div>
            <div className="flex items-center gap-4">
              {saved && (
                <div className="flex items-center gap-2 text-green-400 text-sm" data-testid="alert-saved">
                  <CheckCircle size={16} />
                  Saved!
                </div>
              )}
              <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors" data-testid="link-admin-view-site">
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
                data-testid="button-logout"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="w-56 shrink-0 hidden lg:block" data-testid="admin-sidebar">
            <div className="section-navy rounded-2xl p-4 sticky top-36">
              <nav className="space-y-1">
                {tabs.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    data-testid={`tab-${t.id}`}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                      tab === t.id
                        ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {t.icon}
                    {t.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Mobile Tab Bar */}
          <div className="lg:hidden overflow-x-auto pb-4 mb-4 w-full" data-testid="admin-tab-bar">
            <div className="flex gap-2 min-w-max">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  data-testid={`mobile-tab-${t.id}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    tab === t.id ? "btn-gold" : "bg-white/5 text-gray-400 border border-white/10"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* ===== DASHBOARD ===== */}
            {tab === "dashboard" && (
              <div className="space-y-6" data-testid="panel-dashboard">
                <h2 className="text-2xl font-extrabold text-white">Admin Dashboard</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Activities", count: activities.length, color: "text-yellow-400", icon: <BookOpen size={22} className="text-yellow-400" /> },
                    { label: "Staff Members", count: teachers.length, color: "text-blue-400", icon: <Users size={22} className="text-blue-400" /> },
                    { label: "Gallery Images", count: gallery.length, color: "text-green-400", icon: <Camera size={22} className="text-green-400" /> },
                    { label: "Programs", count: 3, color: "text-purple-400", icon: <BookOpen size={22} className="text-purple-400" /> },
                  ].map((stat, i) => (
                    <div key={i} className="card-glow rounded-2xl p-5" data-testid={`dash-stat-${i}`}>
                      <div className="flex items-center justify-between mb-3">
                        {stat.icon}
                        <span className={`text-3xl font-extrabold ${stat.color}`}>{stat.count}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="card-glow rounded-2xl p-6" data-testid="dash-brochure">
                  <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                    <FileText size={20} className="text-yellow-400" />
                    PDF Brochure Generator
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Generate a one-page school brochure that parents can print or share. It includes school info, programs, contact details, leadership, and mission/vision.
                  </p>
                  <button
                    onClick={generatePDF}
                    className="btn-gold px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2"
                    data-testid="button-generate-pdf"
                  >
                    <FileText size={16} />
                    Generate & Print Brochure
                  </button>
                </div>

                <div className="card-glow rounded-2xl p-6" data-testid="dash-quick-actions">
                  <h3 className="text-white font-bold text-lg mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {tabs.slice(1).map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className="flex items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left"
                        data-testid={`quick-action-${t.id}`}
                      >
                        <span className="text-yellow-400">{t.icon}</span>
                        <span className="text-gray-300 text-sm font-medium">Edit {t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ===== SCHOOL INFO ===== */}
            {tab === "school-info" && (
              <div className="space-y-6" data-testid="panel-school-info">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-extrabold text-white">Edit School Information</h2>
                  <button onClick={saveSchoolInfo} className="btn-gold px-5 py-2 rounded-xl text-sm font-semibold flex items-center gap-2" data-testid="button-save-school-info">
                    <Save size={16} /> Save Changes
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "School Name", field: "name" as const, type: "text" },
                    { label: "School Slogan", field: "slogan" as const, type: "text" },
                    { label: "Location", field: "location" as const, type: "text" },
                    { label: "Email Address", field: "email" as const, type: "email" },
                    { label: "WhatsApp Number", field: "whatsapp" as const, type: "text" },
                    { label: "Facebook URL", field: "facebook" as const, type: "url" },
                    { label: "Principal Name", field: "principalName" as const, type: "text" },
                    { label: "Vice Principal Name", field: "vpiName" as const, type: "text" },
                  ].map((field) => (
                    <div key={field.field} className="card-glow rounded-xl p-4" data-testid={`field-${field.field}`}>
                      <label className="text-yellow-400 text-xs font-semibold uppercase tracking-wide block mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        value={schoolInfo[field.field] as string}
                        onChange={(e) => setSchoolInfoState({ ...schoolInfo, [field.field]: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                        data-testid={`input-${field.field}`}
                      />
                    </div>
                  ))}

                  {/* Phones */}
                  <div className="card-glow rounded-xl p-4" data-testid="field-phones">
                    <label className="text-yellow-400 text-xs font-semibold uppercase tracking-wide block mb-2">Phone Numbers</label>
                    {schoolInfo.phones.map((phone, i) => (
                      <input
                        key={i}
                        type="text"
                        value={phone}
                        onChange={(e) => {
                          const phones = [...schoolInfo.phones];
                          phones[i] = e.target.value;
                          setSchoolInfoState({ ...schoolInfo, phones });
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/50 mb-2"
                        data-testid={`input-phone-${i}`}
                      />
                    ))}
                  </div>

                  {/* About */}
                  <div className="card-glow rounded-xl p-4" data-testid="field-about">
                    <label className="text-yellow-400 text-xs font-semibold uppercase tracking-wide block mb-2">About Description</label>
                    <textarea
                      rows={6}
                      value={schoolInfo.aboutDescription}
                      onChange={(e) => setSchoolInfoState({ ...schoolInfo, aboutDescription: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/50 resize-none"
                      data-testid="textarea-about"
                    />
                  </div>

                  <div className="card-glow rounded-xl p-4" data-testid="field-mission">
                    <label className="text-yellow-400 text-xs font-semibold uppercase tracking-wide block mb-2">Mission</label>
                    <textarea
                      rows={4}
                      value={schoolInfo.mission}
                      onChange={(e) => setSchoolInfoState({ ...schoolInfo, mission: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/50 resize-none"
                      data-testid="textarea-mission"
                    />
                  </div>

                  <div className="card-glow rounded-xl p-4" data-testid="field-vision">
                    <label className="text-yellow-400 text-xs font-semibold uppercase tracking-wide block mb-2">Vision</label>
                    <textarea
                      rows={4}
                      value={schoolInfo.vision}
                      onChange={(e) => setSchoolInfoState({ ...schoolInfo, vision: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/50 resize-none"
                      data-testid="textarea-vision"
                    />
                  </div>

                  <div className="card-glow rounded-xl p-4" data-testid="field-history">
                    <label className="text-yellow-400 text-xs font-semibold uppercase tracking-wide block mb-2">School History</label>
                    <textarea
                      rows={6}
                      value={schoolInfo.history}
                      onChange={(e) => setSchoolInfoState({ ...schoolInfo, history: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500/50 resize-none"
                      data-testid="textarea-history"
                    />
                  </div>

                  <button onClick={saveSchoolInfo} className="btn-gold w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2" data-testid="button-save-school-info-bottom">
                    <Save size={18} /> Save All Changes
                  </button>
                </div>
              </div>
            )}

            {/* ===== ACTIVITIES ===== */}
            {tab === "activities" && (
              <div className="space-y-6" data-testid="panel-activities">
                <h2 className="text-2xl font-extrabold text-white">Manage Activities & News</h2>

                <div className="card-glow rounded-2xl p-6" data-testid="form-add-activity">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Add New Activity</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Activity title"
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                      data-testid="input-activity-title"
                    />
                    <textarea
                      placeholder="Activity description"
                      rows={3}
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50 resize-none"
                      data-testid="textarea-activity-description"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        value={newActivity.date}
                        onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                        data-testid="input-activity-date"
                      />
                      <select
                        value={newActivity.category}
                        onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                        data-testid="select-activity-category"
                      >
                        {["Events", "Sports", "Academics", "Community", "Academic", "Staff"].map((c) => (
                          <option key={c} value={c} className="bg-slate-900">{c}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={addActivity}
                      className="btn-gold px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                      data-testid="button-add-activity"
                    >
                      <Plus size={18} /> Add Activity
                    </button>
                  </div>
                </div>

                <div className="space-y-3" data-testid="list-activities">
                  {activities.map((act) => (
                    <div key={act.id} className="card-glow rounded-xl p-4 flex items-start justify-between gap-4" data-testid={`activity-item-${act.id}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">{act.category}</span>
                          <span className="text-gray-500 text-xs">{act.date}</span>
                        </div>
                        <h4 className="text-white font-semibold text-sm">{act.title}</h4>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{act.description}</p>
                      </div>
                      <button
                        onClick={() => deleteActivity(act.id)}
                        className="text-red-400 hover:text-red-300 shrink-0 p-1"
                        data-testid={`button-delete-activity-${act.id}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== GALLERY ===== */}
            {tab === "gallery" && (
              <div className="space-y-6" data-testid="panel-gallery">
                <h2 className="text-2xl font-extrabold text-white">Manage Gallery</h2>

                <div className="card-glow rounded-2xl p-6" data-testid="form-upload-image">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Upload Images</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Image caption (optional)"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                      data-testid="input-image-caption"
                    />
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                      data-testid="select-image-category"
                    >
                      {["Events", "Sports", "Academics", "Community", "Academic", "Staff"].map((c) => (
                        <option key={c} value={c} className="bg-slate-900">{c}</option>
                      ))}
                    </select>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,application/pdf,.doc,.docx"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      data-testid="input-file-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="btn-blue px-6 py-3 rounded-xl font-semibold flex items-center gap-2 cursor-pointer w-fit"
                      data-testid="label-upload"
                    >
                      <Upload size={18} />
                      Choose Images / Files
                    </label>
                    <p className="text-gray-500 text-xs">Supports: JPG, PNG, GIF, WebP, PDF, DOC, DOCX. Images are stored in browser only (localStorage).</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" data-testid="gallery-admin-grid">
                  {gallery.map((img) => (
                    <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square" data-testid={`gallery-admin-item-${img.id}`}>
                      <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col gap-2 p-2">
                        <p className="text-white text-xs text-center font-medium">{img.caption}</p>
                        <button
                          onClick={() => deleteGalleryImage(img.id)}
                          className="bg-red-500 hover:bg-red-400 text-white rounded-lg p-2"
                          data-testid={`button-delete-gallery-${img.id}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-3 text-center py-12 text-gray-500" data-testid="gallery-empty-admin">
                      No uploaded images yet. Upload images above to see them here and in the public gallery.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ===== STAFF ===== */}
            {tab === "staff" && (
              <div className="space-y-6" data-testid="panel-staff">
                <h2 className="text-2xl font-extrabold text-white">Manage Staff</h2>

                <div className="card-glow rounded-2xl p-6" data-testid="form-add-teacher">
                  <h3 className="text-yellow-400 font-bold text-lg mb-4">Add Teacher</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Teacher's full name"
                      value={newTeacher.name}
                      onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                      data-testid="input-teacher-name"
                    />
                    <input
                      type="text"
                      placeholder="Subject taught"
                      value={newTeacher.subject}
                      onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                      data-testid="input-teacher-subject"
                    />
                    <input
                      type="text"
                      placeholder="Qualification (e.g. B.Sc. Mathematics, UL)"
                      value={newTeacher.qualification}
                      onChange={(e) => setNewTeacher({ ...newTeacher, qualification: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                      data-testid="input-teacher-qualification"
                    />
                    <button
                      onClick={addTeacher}
                      className="btn-gold px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
                      data-testid="button-add-teacher"
                    >
                      <Plus size={18} /> Add Teacher
                    </button>
                  </div>
                </div>

                <div className="space-y-3" data-testid="list-teachers">
                  {teachers.map((teacher) => (
                    <div key={teacher.id} className="card-glow rounded-xl p-4 flex items-center justify-between gap-4" data-testid={`teacher-item-${teacher.id}`}>
                      <div>
                        <p className="text-white font-semibold text-sm">{teacher.name}</p>
                        <p className="text-yellow-400 text-xs">{teacher.subject}</p>
                        <p className="text-gray-500 text-xs">{teacher.qualification}</p>
                      </div>
                      <button
                        onClick={() => deleteTeacher(teacher.id)}
                        className="text-red-400 hover:text-red-300"
                        data-testid={`button-delete-teacher-${teacher.id}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== PASSWORD ===== */}
            {tab === "password" && (
              <div className="space-y-6 max-w-md" data-testid="panel-password">
                <h2 className="text-2xl font-extrabold text-white">Change Admin Password</h2>

                {error && (
                  <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm flex items-center gap-2" data-testid="alert-password-error">
                    <AlertCircle size={16} />
                    {error}
                  </div>
                )}

                <div className="card-glow rounded-2xl p-6" data-testid="form-change-password">
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm font-medium mb-1.5 block">Current Password</label>
                      <input
                        type="password"
                        required
                        value={currentPw}
                        onChange={(e) => setCurrentPw(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                        data-testid="input-current-password"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm font-medium mb-1.5 block">New Password</label>
                      <input
                        type="password"
                        required
                        value={newPw}
                        onChange={(e) => setNewPw(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                        data-testid="input-new-password"
                      />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm font-medium mb-1.5 block">Confirm New Password</label>
                      <input
                        type="password"
                        required
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-500/50"
                        data-testid="input-confirm-password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-gold w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2"
                      data-testid="button-change-password"
                    >
                      <Shield size={18} />
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="card-glow rounded-2xl p-6 border-yellow-500/20" data-testid="panel-security-info">
                  <h3 className="text-yellow-400 font-bold mb-3">Security Notes</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Admin credentials are stored securely in browser storage</li>
                    <li className="flex items-center gap-2"><span className="text-green-400">✓</span> Sessions expire when the browser is closed</li>
                    <li className="flex items-center gap-2"><span className="text-yellow-400">!</span> Use a strong password of at least 8 characters</li>
                    <li className="flex items-center gap-2"><span className="text-yellow-400">!</span> Do not share your admin credentials</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
