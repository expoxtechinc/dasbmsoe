// School data - admin can edit these via the admin panel
// Data is persisted to localStorage

export interface SchoolInfo {
  name: string;
  shortName: string;
  slogan: string;
  location: string;
  email: string;
  phones: string[];
  whatsapp: string;
  facebook: string;
  established: string;
  principalName: string;
  principalTitle: string;
  vpiName: string;
  vpiTitle: string;
  aboutDescription: string;
  mission: string;
  vision: string;
  history: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  caption: string;
  category: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  qualification: string;
}

const DEFAULT_SCHOOL_INFO: SchoolInfo = {
  name: "Dr. Abraham S. Borbor Memorial School Of Excellence",
  shortName: "DASBMSE",
  slogan: "We Don't Just Teach, We Inspire",
  location: "Mount Barclay, Lower Johnsonville, Liberia",
  email: "borborschool20219@yahoo.com",
  phones: ["+231 886 633 880", "+231 775 633 880", "+231 886 538 191"],
  whatsapp: "+231886633880",
  facebook: "https://www.facebook.com/DASBMSE",
  established: "2019",
  principalName: "Cecelia F. Ndomahun",
  principalTitle: "Principal",
  vpiName: "Edwin Kwakpae",
  vpiTitle: "Vice Principal",
  aboutDescription: `Dr. Abraham S. Borbor Memorial School of Excellence is a premier educational institution located in Mount Barclay, Lower Johnsonville, Liberia. Founded in 2019 and named in honor of Dr. Abraham S. Borbor, our school is dedicated to transforming lives through quality education, strong moral values, and academic excellence.\n\nWe provide a nurturing, disciplined, and inspiring learning environment where every student is empowered to reach their fullest potential. From Primary through Senior High School, we offer comprehensive academic programs designed to prepare students for success in higher education and beyond.`,
  mission: "To provide quality, holistic education that inspires intellectual growth, character development, and lifelong learning in every student, equipping them to become responsible leaders and productive citizens of Liberia and the global community.",
  vision: "To be the leading school of excellence in Liberia, recognized for academic achievement, moral integrity, and the development of well-rounded individuals who positively impact their communities and the world.",
  history: `Dr. Abraham S. Borbor Memorial School of Excellence was established in 2019 with a bold vision: to create an educational institution that not only teaches but truly inspires. Founded in honor of the late Dr. Abraham S. Borbor, a visionary leader and champion of education in Liberia, the school carries forward his legacy of dedication to learning and community development.\n\nBeginning with a small but passionate group of students and educators, the school quickly grew in reputation for its high academic standards, disciplined environment, and commitment to student development. By 2025, DASBMSE had produced multiple graduating classes, with students excelling in national examinations and being admitted to universities across Liberia and beyond.\n\nToday, under the leadership of Principal Cecelia F. Ndomahun and Vice Principal Edwin Kwakpae, the school continues to grow and inspire — living up to its motto: "We Don't Just Teach, We Inspire."`,
};

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: "1",
    title: "2025 Graduation Ceremony",
    description: "A magnificent celebration of our graduating class of 2025. Students received their diplomas surrounded by family, faculty, and friends in a ceremony marked by joy, achievement, and pride.",
    date: "2025-06-15",
    category: "Events",
  },
  {
    id: "2",
    title: "Annual Sports Day",
    description: "Students competed in track and field, football, basketball, and relay races. The event promotes teamwork, physical fitness, and healthy competition among all grade levels.",
    date: "2025-04-10",
    category: "Sports",
  },
  {
    id: "3",
    title: "Science & Technology Fair",
    description: "Students showcased innovative projects at our annual Science Fair. Projects ranged from environmental conservation models to basic electronics, demonstrating the creativity and scientific thinking of our students.",
    date: "2025-03-20",
    category: "Academics",
  },
  {
    id: "4",
    title: "Community Outreach Program",
    description: "DASBMSE students and staff participated in a community clean-up and health awareness drive in Mount Barclay, reinforcing the school's commitment to social responsibility.",
    date: "2025-02-14",
    category: "Community",
  },
];

const DEFAULT_TEACHERS: Teacher[] = [
  { id: "1", name: "Mr. James Kollie", subject: "Mathematics", qualification: "B.Sc. Mathematics, UL" },
  { id: "2", name: "Ms. Grace Weah", subject: "English Language", qualification: "B.A. English, Cuttington University" },
  { id: "3", name: "Mr. Albert Mulbah", subject: "Sciences", qualification: "B.Sc. Biology & Chemistry" },
  { id: "4", name: "Ms. Patience Flomo", subject: "Social Studies", qualification: "B.A. Social Sciences" },
  { id: "5", name: "Mr. Samuel Togba", subject: "Information Technology", qualification: "B.Sc. Computer Science" },
  { id: "6", name: "Ms. Edith Johnson", subject: "French Language", qualification: "Diploma in French, UL" },
];

export function getSchoolInfo(): SchoolInfo {
  try {
    const stored = localStorage.getItem("school_info");
    if (stored) return { ...DEFAULT_SCHOOL_INFO, ...JSON.parse(stored) };
  } catch {}
  return DEFAULT_SCHOOL_INFO;
}

export function setSchoolInfo(info: Partial<SchoolInfo>): void {
  const current = getSchoolInfo();
  localStorage.setItem("school_info", JSON.stringify({ ...current, ...info }));
}

export function getActivities(): Activity[] {
  try {
    const stored = localStorage.getItem("school_activities");
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_ACTIVITIES;
}

export function setActivities(activities: Activity[]): void {
  localStorage.setItem("school_activities", JSON.stringify(activities));
}

export function getTeachers(): Teacher[] {
  try {
    const stored = localStorage.getItem("school_teachers");
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_TEACHERS;
}

export function setTeachers(teachers: Teacher[]): void {
  localStorage.setItem("school_teachers", JSON.stringify(teachers));
}

export function getGalleryImages(): GalleryImage[] {
  try {
    const stored = localStorage.getItem("school_gallery");
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

export function setGalleryImages(images: GalleryImage[]): void {
  localStorage.setItem("school_gallery", JSON.stringify(images));
}

export function checkAdminAuth(): boolean {
  return sessionStorage.getItem("admin_authenticated") === "true";
}

export function adminLogin(email: string, password: string): boolean {
  const storedEmail = localStorage.getItem("admin_email") || "borborschool.admin@gmail.com";
  const storedPassword = localStorage.getItem("admin_password") || "Admin2026";
  if (email === storedEmail && password === storedPassword) {
    sessionStorage.setItem("admin_authenticated", "true");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem("admin_authenticated");
}

export function changeAdminPassword(currentPassword: string, newPassword: string): boolean {
  const storedPassword = localStorage.getItem("admin_password") || "Admin2026";
  if (currentPassword === storedPassword) {
    localStorage.setItem("admin_password", newPassword);
    return true;
  }
  return false;
}
