/* ===================================================
   دليل فعاليات SVU - ملف التفاعلات والوظائف البرمجية
   ---------------------------------------------------
   فكرة الملف: كل بيانات الفعاليات موجودة في مصفوفة واحدة (EVENTS)،
   ومنها نبني الكروت والسلايدر والفلترة وصفحة التفاصيل.
   بهذه الطريقة نضيف فعالية جديدة في مكان واحد فقط فتظهر في كل الصفحات.
   =================================================== */

/* ==================================================
   1. البيانات الثابتة
   ================================================== */

// التصنيفات: المفتاح يُستخدم في الفلترة، والاسم والأيقونة واللون للعرض
const CATEGORIES = {
  tech:     { name: "تقنية",          icon: "bi-cpu",            badge: "badge-cat-tech" },
  academic: { name: "أكاديمية وبحوث", icon: "bi-mortarboard",    badge: "badge-cat-academic" },
  career:   { name: "مهنية وتوظيف",   icon: "bi-briefcase",      badge: "badge-cat-career" },
  culture:  { name: "ثقافة",          icon: "bi-book",           badge: "badge-cat-culture" },
  sports:   { name: "رياضة",          icon: "bi-trophy",         badge: "badge-cat-sports" },
  music:    { name: "موسيقى",         icon: "bi-music-note-beamed", badge: "badge-cat-music" },
  family:   { name: "عائلي",          icon: "bi-people",         badge: "badge-cat-family" }
};

// الأماكن: كل مكان له صورة خريطة ثابتة في assets/img
const LOCATIONS = {
  online:   { name: "أونلاين - القاعة الافتراضية", map: "assets/img/map-online.svg" },
  damascus: { name: "دمشق - مقر الجامعة",          map: "assets/img/map-damascus.svg" },
  aleppo:   { name: "حلب - مركز النفاذ",           map: "assets/img/map-aleppo.svg" },
  homs:     { name: "حمص - مركز النفاذ",           map: "assets/img/map-homs.svg" },
  latakia:  { name: "اللاذقية - الملعب البلدي",     map: "assets/img/map-latakia.svg" }
};

// قائمة الفعاليات (التاريخ بصيغة YYYY-MM-DD والوقت بصيغة 24 ساعة لسهولة المقارنة)
const EVENTS = [
  {
    id: 1, featured: true,
    title: "ورشة عمل: تطبيقات الذكاء الاصطناعي في هندسة البرمجيات",
    short: "مقدمة عملية حول استخدام نماذج التعلم الآلي وتطبيقاتها في هندسة البرمجيات.",
    category: "tech", location: "online",
    date: "2026-10-20", time: "17:00", duration: 2, seats: 120,
    image: "assets/img/event-5.png",
    gallery: ["assets/img/event-5.png", "assets/img/event-1.png", "assets/img/event-6.png"],
    desc: "تهدف هذه الورشة إلى تعريف طلاب الهندسة المعلوماتية بأحدث أدوات ونماذج الذكاء الاصطناعي التوليدي وكيفية توظيفها في تحسين كتابة الشيفرات البرمجية واختبار الأنظمة وتطوير البرمجيات.",
    topics: [
      "مقدمة حول نماذج اللغة الكبيرة (LLMs) وآلية عملها البرمجية.",
      "أفضل الممارسات في كتابة التعليمات البرمجية بمساعدة أدوات الذكاء الاصطناعي.",
      "تطبيقات عملية لبناء واجهات برمجية (APIs) ذكية باستخدام Python.",
      "المعايير الأخلاقية والأمنية عند استخدام تقنيات الذكاء الاصطناعي."
    ],
    speaker: "د. مهند الخالد - أستاذ الذكاء الاصطناعي في الجامعة الافتراضية السورية"
  },
  {
    id: 2, featured: true,
    title: "الملتقى الطلابي السنوي للبحوث العلمية والابتكار",
    short: "عرض ومناقشة مشاريع التخرج المتميزة وتبادل الخبرات بين طلاب الكليات المختلفة.",
    category: "academic", location: "damascus",
    date: "2026-10-25", time: "11:00", duration: 4, seats: 200,
    image: "assets/img/event-4.png",
    gallery: ["assets/img/event-4.png", "assets/img/event-2.png", "assets/img/event-7.png"],
    desc: "ملتقى أكاديمي جامع يهدف إلى استعراض أفضل مشاريع التخرج والأوراق العلمية التي أعدها طلاب الجامعة الافتراضية السورية، مع فتح باب النقاش العلمي المباشر.",
    topics: [
      "عرض مشاريع التخرج الرائدة في كليات الهندسة والإدارة.",
      "جلسة حوارية حول تمويل ونشر الأبحاث الطلابية.",
      "تقييم الأفكار الابتكارية من قبل لجان تحكيم متخصصة.",
      "تكريم المشاريع الفائزة بالمراكز الأولى."
    ],
    speaker: "عمادة شؤون الطلاب والبحث العلمي - الجامعة الافتراضية السورية"
  },
  {
    id: 3, featured: true,
    title: "يوم التوظيف وريادة الأعمال لطلاب وخريجي SVU",
    short: "فرص للتواصل المباشر مع شركات التكنولوجيا وسوق العمل والتعرف على متطلبات التوظيف.",
    category: "career", location: "damascus",
    date: "2026-11-01", time: "10:00", duration: 5, seats: 300,
    image: "assets/img/event-3.png",
    gallery: ["assets/img/event-3.png", "assets/img/event-8.jpg", "assets/img/event-4.png"],
    desc: "فرصة استثنائية للتواصل المباشر مع شركات التكنولوجيا وسوق العمل المحلي والإقليمي، والتعرف على متطلبات التوظيف وفرص التدريب المتاحة.",
    topics: [
      "لقاءات مباشرة مع مدراء الموارد البشرية في كبرى الشركات التقنية.",
      "جلسات تقديم عروض المشاريع الريادية الناشئة.",
      "فرص توظيف وتدريب موجهة خصيصاً لخريجي الجامعة الافتراضية.",
      "نصائح لبناء مسار مهني ناجح في بيئات العمل عن بُعد."
    ],
    speaker: "نخبة من مسؤولي التوظيف وممثلي شركات البرمجيات والاتصالات"
  },
  {
    id: 4, featured: false,
    title: "ندوة تخصصية: أساسيات الأمن السيبراني وحماية النظم",
    short: "التعرف على التهديدات الرقمية الشائعة وطرق حماية الأنظمة والتطبيقات السحابية.",
    category: "tech", location: "online",
    date: "2026-11-10", time: "18:00", duration: 2, seats: 150,
    image: "assets/img/event-6.png",
    gallery: ["assets/img/event-6.png", "assets/img/event-1.png", "assets/img/event-5.png"],
    desc: "ندوة شاملة تناقش التهديدات السيبرانية الشائعة، أساليب الكشف عن الثغرات، والخطوات العملية لحماية السيرفرات والتطبيقات الحديثة.",
    topics: [
      "مفاهيم اختبار الاختراق الأخلاقي والتصدي للهجمات.",
      "تأمين تطبيقات الويب وقواعد البيانات ضد الاختراق.",
      "أمن الشبكات والبيئات السحابية وأفضل الممارسات الدفاعية.",
      "شهادات الاعتماد المهنية في مجال الأمن السيبراني."
    ],
    speaker: "م. سامر يوسف - خبير استشاري في أمن المعلومات"
  },
  {
    id: 5, featured: false,
    title: "ورشة عمل: أصول البحث الأكاديمي والتوثيق العلمي",
    short: "تدريب موجه لطلاب الدراسات العليا والإجازات حول كتابة الأوراق العلمية ونشرها.",
    category: "academic", location: "online",
    date: "2026-11-18", time: "16:00", duration: 2, seats: 100,
    image: "assets/img/event-7.png",
    gallery: ["assets/img/event-7.png", "assets/img/event-2.png", "assets/img/event-4.png"],
    desc: "تدريب تطبيقي لطلاب الإجازات والدراسات العليا لتعلم منهجيات البحث العلمي، معايير التوثيق الأكاديمي، وتجنب الانتحال العلمي.",
    topics: [
      "خطوات صياغة الإشكالية وفرضيات البحث.",
      "استخدام قواعد البيانات العالمية ومصادر المعرفة المفتوحة.",
      "أنظمة التوثيق والمراجع العالمية (APA / IEEE).",
      "طرق صياغة ومراجعة المقالات الموجهة للمجلات المحكمة."
    ],
    speaker: "د. ريم العلي - منسقة برامج الدراسات العليا"
  },
  {
    id: 6, featured: false,
    title: "ورشة عمل: بناء السيرة الذاتية واجتياز المقابلات التقنية",
    short: "إرشادات عملية لتجهيز Portfolio احترافي وتقنيات التعامل مع مقابلات العمل التقنية.",
    category: "career", location: "online",
    date: "2026-11-25", time: "17:30", duration: 2, seats: 120,
    image: "assets/img/event-8.jpg",
    gallery: ["assets/img/event-8.jpg", "assets/img/event-3.png", "assets/img/event-1.png"],
    desc: "دليل عملي للطلاب الباحثين عن عمل لتجهيز سيرة ذاتية متوافقة مع أنظمة الفرز الآلي (ATS)، مع تدريب محاكي لاجتياز المقابلات الوظيفية.",
    topics: [
      "الهيكلية الاحترافية للسيرة الذاتية لمعايير ATS.",
      "بناء معرض أعمال مميز (Portfolio) على منصة GitHub وغيرها.",
      "استراتيجيات الإجابة عن الأسئلة البرمجية في المقابلات التقنية.",
      "فن التفاوض وإبراز المهارات الشخصية والتقنية."
    ],
    speaker: "أ. لؤي ناصر - مستشار التطوير الوظيفي والموارد البشرية"
  },
  {
    id: 7, featured: true,
    title: "أمسية شعرية وثقافية: أصوات من الجامعة",
    short: "أمسية يلقي فيها طلاب الجامعة قصائدهم ونصوصهم الأدبية بحضور نخبة من الأدباء.",
    category: "culture", location: "damascus",
    date: "2026-10-23", time: "19:00", duration: 2, seats: 150,
    image: "assets/img/event-culture.svg",
    gallery: ["assets/img/event-culture.svg", "assets/img/event-2.png", "assets/img/event-4.png"],
    desc: "أمسية ثقافية مفتوحة تحتفي بالمواهب الأدبية لطلاب الجامعة الافتراضية السورية، تتضمن إلقاءً شعرياً وقراءات قصصية وحواراً مفتوحاً مع ضيوف من الوسط الأدبي.",
    topics: [
      "قراءات شعرية لطلاب من مختلف الكليات.",
      "قصص قصيرة ونصوص نثرية من تأليف الطلاب.",
      "حوار مفتوح حول الكتابة الإبداعية والنشر.",
      "توزيع شهادات تقدير للمشاركين."
    ],
    speaker: "النادي الثقافي الطلابي - بالتعاون مع اتحاد الكتاب العرب"
  },
  {
    id: 8, featured: true,
    title: "بطولة كرة القدم بين مراكز النفاذ",
    short: "مباريات ودية بين فرق طلاب مراكز النفاذ في المحافظات، والنهائي على الملعب البلدي.",
    category: "sports", location: "latakia",
    date: "2026-10-27", time: "16:00", duration: 3, seats: 500,
    image: "assets/img/event-sports.svg",
    gallery: ["assets/img/event-sports.svg", "assets/img/event-family.svg"],
    desc: "بطولة رياضية ودية تجمع فرق الطلاب من مراكز النفاذ في مختلف المحافظات، بهدف تعزيز روح الفريق والتعارف بين طلاب الجامعة خارج القاعات الافتراضية.",
    topics: [
      "دور المجموعات بمشاركة 8 فرق طلابية.",
      "المباراة النهائية وتتويج الفريق الفائز.",
      "جوائز لأفضل لاعب وأفضل حارس مرمى.",
      "فقرات تشجيعية وأنشطة للجمهور."
    ],
    speaker: "لجنة النشاط الرياضي - عمادة شؤون الطلاب"
  },
  {
    id: 9, featured: true,
    title: "حفل موسيقي لفرقة الجامعة الطلابية",
    short: "حفل يقدّم فيه طلاب الجامعة مقطوعات من الموسيقى العربية الكلاسيكية والمعاصرة.",
    category: "music", location: "damascus",
    date: "2026-11-14", time: "20:00", duration: 2, seats: 250,
    image: "assets/img/event-music.svg",
    gallery: ["assets/img/event-music.svg", "assets/img/event-culture.svg"],
    desc: "حفل موسيقي تحييه الفرقة الطلابية للجامعة، يتضمن مقطوعات عزف منفرد وغناءً جماعياً من التراث السوري والموسيقى المعاصرة.",
    topics: [
      "مقطوعات من التراث الموسيقي السوري.",
      "عزف منفرد على العود والكمان والبيانو.",
      "فقرة الغناء الجماعي لكورال الجامعة.",
      "مشاركة مواهب طلابية جديدة."
    ],
    speaker: "الفرقة الموسيقية الطلابية - إشراف أ. نور حداد"
  },
  {
    id: 10, featured: false,
    title: "يوم العائلة المفتوح لطلاب الجامعة",
    short: "يوم ترفيهي لطلاب الجامعة وعائلاتهم يتضمن ألعاباً للأطفال ومسابقات وجوائز.",
    category: "family", location: "homs",
    date: "2026-11-21", time: "10:00", duration: 6, seats: 400,
    image: "assets/img/event-family.svg",
    gallery: ["assets/img/event-family.svg", "assets/img/event-sports.svg"],
    desc: "يوم مفتوح يجمع طلاب الجامعة وعائلاتهم في أجواء ترفيهية، مع أنشطة متنوعة للأطفال ومسابقات ثقافية وجوائز للعائلات المشاركة.",
    topics: [
      "ركن الرسم والألعاب للأطفال.",
      "مسابقات ثقافية بين العائلات.",
      "عروض مسرحية قصيرة للأطفال.",
      "سحب على جوائز قيّمة في نهاية اليوم."
    ],
    speaker: "عمادة شؤون الطلاب - مركز النفاذ في حمص"
  },
  {
    id: 11, featured: false,
    title: "ملتقى صناعة المحتوى الرقمي بالذكاء الاصطناعي",
    short: "كيف تصنع محتوى رقمياً احترافياً باستخدام أدوات الذكاء الاصطناعي الحديثة.",
    category: "tech", location: "aleppo",
    date: "2026-12-03", time: "15:00", duration: 3, seats: 120,
    image: "assets/img/event-1.png",
    gallery: ["assets/img/event-1.png", "assets/img/event-5.png", "assets/img/event-6.png"],
    desc: "ملتقى تطبيقي يعرّف الطلاب بأدوات الذكاء الاصطناعي في إنتاج النصوص والصور والفيديو، مع أمثلة حيّة على بناء هوية رقمية ومحتوى تعليمي.",
    topics: [
      "أدوات توليد النصوص والصور والفيديو.",
      "كتابة الأوامر (Prompts) بشكل احترافي.",
      "حقوق الملكية الفكرية للمحتوى المولَّد.",
      "تطبيق عملي: إنتاج منشور تعليمي كامل."
    ],
    speaker: "م. ليلى شاهين - مختصة في التسويق الرقمي"
  },
  {
    id: 12, featured: false,
    title: "معرض الكتاب الطلابي وتبادل الكتب",
    short: "معرض لتبادل الكتب والمراجع الجامعية بين الطلاب مع ركن للقراءة.",
    category: "culture", location: "aleppo",
    date: "2026-12-10", time: "10:00", duration: 6, seats: 300,
    image: "assets/img/event-2.png",
    gallery: ["assets/img/event-2.png", "assets/img/event-culture.svg", "assets/img/event-7.png"],
    desc: "معرض مفتوح يتيح للطلاب تبادل الكتب والمراجع الجامعية، مع ركن للقراءة وجلسات توقيع لكتب أساتذة الجامعة.",
    topics: [
      "ركن تبادل الكتب والمراجع الجامعية.",
      "جلسات توقيع كتب لأساتذة الجامعة.",
      "مسابقة أفضل مراجعة كتاب.",
      "ركن قراءة هادئ مفتوح طوال اليوم."
    ],
    speaker: "مكتبة الجامعة الافتراضية - مركز النفاذ في حلب"
  }
];

/* ==================================================
   2. دوال مساعدة عامة
   ================================================== */

// أسماء الأشهر كما تُستخدم في سوريا
const MONTHS = ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران",
  "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"];

// تحويل "2026-10-20" إلى كائن Date (نستخدم التوقيت المحلي لتجنب فرق المناطق الزمنية)
function toDate(dateStr) {
  const parts = dateStr.split("-").map(Number);
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

// تاريخ اليوم بدون ساعات (للمقارنة بالأيام فقط)
function today() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

// "2026-10-20" ← "20 تشرين الأول 2026"
function formatDate(dateStr) {
  const d = toDate(dateStr);
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

// "17:00" ← "05:00 مساءً"
function formatTime(timeStr) {
  let [h, m] = timeStr.split(":").map(Number);
  const period = h >= 12 ? "مساءً" : "صباحاً";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
}

// عدد الأيام بين اليوم وتاريخ الفعالية (سالب = انتهت)
function daysUntil(dateStr) {
  return Math.round((toDate(dateStr) - today()) / 86400000);
}

// نص صغير يوضح حالة الفعالية زمنياً
function statusLabel(dateStr) {
  const days = daysUntil(dateStr);
  if (days === 0) return '<span class="badge bg-danger">اليوم</span>';
  if (days === 1) return '<span class="badge bg-warning text-dark">غداً</span>';
  if (days < 0) return '<span class="badge bg-secondary">انتهت</span>';
  return "";
}

// ترتيب الفعاليات حسب التاريخ (الأقرب أولاً)
function sortByDate(list) {
  return list.slice().sort((a, b) => toDate(a.date) - toDate(b.date));
}

function getEventById(id) {
  return EVENTS.find(ev => ev.id === Number(id));
}

// قراءة وكتابة localStorage داخل try/catch لأن بعض المتصفحات تمنعه (مثل التصفح الخاص)
function storageGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function storageSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* نتجاهل الخطأ */ }
}

// بناء كرت فعالية واحد (يُستخدم في الرئيسية وصفحة الفعاليات والفعاليات ذات الصلة)
function createEventCard(ev, colClass) {
  const cat = CATEGORIES[ev.category];
  const loc = LOCATIONS[ev.location];
  return `
    <div class="${colClass}">
      <article class="card event-card h-100 shadow-sm border-0">
        <div class="event-img-wrap">
          <img src="${ev.image}" class="card-img-top event-img" alt="${ev.title}" loading="lazy">
          <span class="event-status">${statusLabel(ev.date)}</span>
        </div>
        <div class="card-body d-flex flex-column">
          <div class="mb-2">
            <span class="badge ${cat.badge}"><i class="bi ${cat.icon}"></i> ${cat.name}</span>
          </div>
          <h3 class="card-title h6 fw-bold">${ev.title}</h3>
          <ul class="event-meta list-unstyled small text-muted mb-2">
            <li><i class="bi bi-calendar-event"></i> ${formatDate(ev.date)} - ${formatTime(ev.time)}</li>
            <li><i class="bi bi-geo-alt"></i> ${loc.name}</li>
          </ul>
          <p class="card-text text-muted small flex-grow-1">${ev.short}</p>
          <a href="event.html?id=${ev.id}" class="btn btn-outline-svu btn-sm mt-auto">التفاصيل</a>
        </div>
      </article>
    </div>`;
}

/* ==================================================
   3. وظائف مشتركة لكل الصفحات
   ================================================== */

// 3.1 الوضع الداكن: نبدّل الصنف dark-mode على body ونحفظ الاختيار
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  // نخبر Bootstrap أيضاً ليغيّر ألوان مكوّناته (النماذج، المودال...)
  document.documentElement.setAttribute("data-bs-theme", isDark ? "dark" : "light");
  const icon = document.querySelector("#themeToggle i");
  if (icon) icon.className = isDark ? "bi bi-sun" : "bi bi-moon-stars";
}

function initThemeToggle() {
  applyTheme(storageGet("svuTheme") || "light");
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.addEventListener("click", function () {
    const next = document.body.classList.contains("dark-mode") ? "light" : "dark";
    applyTheme(next);
    storageSet("svuTheme", next);
  });
}

// 3.2 زر العودة لأعلى الصفحة: نُنشئه بالـ JS حتى لا نكرره في كل ملف HTML
function initScrollTop() {
  const btn = document.createElement("button");
  btn.className = "scroll-top-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "العودة إلى أعلى الصفحة");
  btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  document.body.appendChild(btn);

  window.addEventListener("scroll", function () {
    btn.classList.toggle("show", window.scrollY > 300);
  });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==================================================
   4. الصفحة الرئيسية index.html
   ================================================== */

// 4.1 بطاقة "الحدث اليوم": إن لم توجد فعالية اليوم نعرض أقرب فعالية قادمة
function renderTodayEvent() {
  const box = document.getElementById("todayEvent");
  if (!box) return;

  const upcoming = sortByDate(EVENTS.filter(ev => daysUntil(ev.date) >= 0));
  if (upcoming.length === 0) { box.classList.add("d-none"); return; }

  const ev = upcoming[0];
  const isToday = daysUntil(ev.date) === 0;
  const days = daysUntil(ev.date);
  box.innerHTML = `
    <div class="today-event shadow-sm">
      <div class="today-label">
        <i class="bi ${isToday ? "bi-lightning-charge-fill" : "bi-hourglass-split"}"></i>
        ${isToday ? "الحدث اليوم" : "الحدث القادم"}
      </div>
      <div class="today-body">
        <h2 class="h5 fw-bold mb-1">${ev.title}</h2>
        <p class="mb-0 small">
          <i class="bi bi-clock"></i> ${formatTime(ev.time)}
          &nbsp;·&nbsp; <i class="bi bi-geo-alt"></i> ${LOCATIONS[ev.location].name}
          ${isToday ? "" : `&nbsp;·&nbsp; بعد ${days} ${days > 10 ? "يوماً" : "أيام"}`}
        </p>
      </div>
      <a href="event.html?id=${ev.id}" class="btn btn-svu-gold btn-sm">احجز الآن</a>
    </div>`;
}

// 4.2 السلايدر: نبني شرائح Bootstrap Carousel من الفعاليات المميزة (featured)
function renderCarousel() {
  const inner = document.getElementById("featuredInner");
  const indicators = document.getElementById("featuredIndicators");
  if (!inner || !indicators) return;

  const featured = sortByDate(EVENTS.filter(ev => ev.featured));

  inner.innerHTML = featured.map((ev, i) => {
    const cat = CATEGORIES[ev.category];
    return `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="${ev.image}" class="d-block w-100 carousel-img" alt="${ev.title}">
        <div class="carousel-overlay">
          <span class="badge ${cat.badge} mb-2"><i class="bi ${cat.icon}"></i> ${cat.name}</span>
          <h3 class="h4 fw-bold">${ev.title}</h3>
          <p class="mb-3 small">
            <i class="bi bi-calendar-event"></i> ${formatDate(ev.date)}
            &nbsp;·&nbsp; <i class="bi bi-geo-alt"></i> ${LOCATIONS[ev.location].name}
          </p>
          <a href="event.html?id=${ev.id}" class="btn btn-svu-gold btn-sm px-4">التفاصيل</a>
        </div>
      </div>`;
  }).join("");

  indicators.innerHTML = featured.map((ev, i) => `
    <button type="button" data-bs-target="#featuredCarousel" data-bs-slide-to="${i}"
      class="${i === 0 ? "active" : ""}" aria-label="الشريحة ${i + 1}" ${i === 0 ? 'aria-current="true"' : ""}></button>`
  ).join("");

  // تشغيل السلايدر تلقائياً كل 5 ثوانٍ مع التوقف عند مرور الماوس
  const carouselEl = document.getElementById("featuredCarousel");
  if (window.bootstrap && carouselEl) {
    new bootstrap.Carousel(carouselEl, { interval: 5000, ride: "carousel", pause: "hover" });
  }
}

// 4.3 التصنيفات السريعة: زر لكل تصنيف مع عدد فعالياته، ينقل لصفحة الفعاليات مفلترة
function renderQuickCategories() {
  const box = document.getElementById("quickCategories");
  if (!box) return;

  box.innerHTML = Object.keys(CATEGORIES).map(key => {
    const cat = CATEGORIES[key];
    const count = EVENTS.filter(ev => ev.category === key).length;
    return `
      <a href="events.html?cat=${key}" class="category-chip ${cat.badge}">
        <i class="bi ${cat.icon}"></i>
        <span>${cat.name}</span>
        <span class="badge rounded-pill bg-light text-dark">${count}</span>
      </a>`;
  }).join("");
}

// 4.4 أحدث الفعاليات: أقرب 6 فعاليات قادمة
function renderLatestEvents() {
  const grid = document.getElementById("latestEvents");
  if (!grid) return;
  const upcoming = sortByDate(EVENTS.filter(ev => daysUntil(ev.date) >= 0)).slice(0, 6);
  grid.innerHTML = upcoming.map(ev => createEventCard(ev, "col-12 col-sm-6 col-lg-4")).join("");
}

/* ==================================================
   5. صفحة كل الفعاليات events.html (بحث + فلترة)
   ================================================== */
function initEventsPage() {
  const grid = document.getElementById("eventsContainer");
  if (!grid) return;

  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const dateFilter = document.getElementById("dateFilter");
  const locationFilter = document.getElementById("locationFilter");
  const resetBtn = document.getElementById("resetFilters");
  const resultCount = document.getElementById("resultCount");
  const noResults = document.getElementById("noResults");

  // تعبئة قوائم التصنيف والمكان من البيانات بدل كتابتها يدوياً
  Object.keys(CATEGORIES).forEach(key => {
    categoryFilter.insertAdjacentHTML("beforeend", `<option value="${key}">${CATEGORIES[key].name}</option>`);
  });
  Object.keys(LOCATIONS).forEach(key => {
    locationFilter.insertAdjacentHTML("beforeend", `<option value="${key}">${LOCATIONS[key].name}</option>`);
  });

  // التصنيف المبدئي: من الرابط (?cat=) أولاً، ثم من آخر اختيار محفوظ في localStorage
  const urlCat = new URLSearchParams(window.location.search).get("cat");
  const savedCat = storageGet("svuCategory");
  if (urlCat && CATEGORIES[urlCat]) categoryFilter.value = urlCat;
  else if (savedCat && (savedCat === "all" || CATEGORIES[savedCat])) categoryFilter.value = savedCat;

  // هل تاريخ الفعالية يطابق خيار التاريخ المختار؟
  function matchesDate(ev, option) {
    const d = toDate(ev.date);
    const days = daysUntil(ev.date);
    const now = today();
    switch (option) {
      case "today":     return days === 0;
      case "week":      return days >= 0 && days <= 7;
      case "month":     return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      case "nextMonth": {
        const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        return d.getMonth() === next.getMonth() && d.getFullYear() === next.getFullYear();
      }
      case "upcoming":  return days >= 0;
      case "past":      return days < 0;
      default:          return true; // all
    }
  }

  function filterEvents() {
    const query = searchInput.value.toLowerCase().trim();
    const cat = categoryFilter.value;
    const dateOpt = dateFilter.value;
    const loc = locationFilter.value;

    const result = sortByDate(EVENTS).filter(ev => {
      const text = (ev.title + " " + ev.short).toLowerCase();
      return text.includes(query)
        && (cat === "all" || ev.category === cat)
        && (loc === "all" || ev.location === loc)
        && matchesDate(ev, dateOpt);
    });

    grid.innerHTML = result.map(ev => createEventCard(ev, "col-12 col-md-6 col-lg-4")).join("");
    resultCount.textContent = `عدد النتائج: ${result.length} من ${EVENTS.length}`;
    noResults.classList.toggle("d-none", result.length > 0);
  }

  searchInput.addEventListener("input", filterEvents);
  dateFilter.addEventListener("change", filterEvents);
  locationFilter.addEventListener("change", filterEvents);
  categoryFilter.addEventListener("change", function () {
    storageSet("svuCategory", categoryFilter.value); // حفظ تفضيل التصنيف
    filterEvents();
  });

  resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    categoryFilter.value = "all";
    dateFilter.value = "all";
    locationFilter.value = "all";
    storageSet("svuCategory", "all");
    filterEvents();
  });

  filterEvents();
}

/* ==================================================
   6. صفحة تفاصيل الفعالية event.html
   ================================================== */
function initEventPage() {
  const detailTitle = document.getElementById("detailTitle");
  if (!detailTitle) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const ev = getEventById(id);

  // إذا كان الرقم غير صحيح نعرض رسالة بدل صفحة فارغة
  if (!ev) {
    document.getElementById("eventContent").classList.add("d-none");
    document.getElementById("eventNotFound").classList.remove("d-none");
    return;
  }

  const cat = CATEGORIES[ev.category];
  const loc = LOCATIONS[ev.location];
  document.title = `${ev.title} - دليل فعاليات SVU`;

  // 6.1 تعبئة النصوص الأساسية
  document.getElementById("breadcrumbTitle").textContent = ev.title;
  detailTitle.textContent = ev.title;
  const img = document.getElementById("detailImg");
  img.src = ev.image;
  img.alt = ev.title;
  const badge = document.getElementById("detailBadge");
  badge.className = `badge ${cat.badge}`;
  badge.innerHTML = `<i class="bi ${cat.icon}"></i> ${cat.name}`;
  document.getElementById("detailStatus").innerHTML = statusLabel(ev.date);
  document.getElementById("detailDate").textContent = formatDate(ev.date);
  document.getElementById("detailTime").textContent = formatTime(ev.time);
  document.getElementById("detailLocation").textContent = loc.name;
  document.getElementById("detailSeats").textContent = `${ev.seats} مقعداً`;
  document.getElementById("detailDesc").textContent = ev.desc;
  document.getElementById("detailSpeaker").textContent = ev.speaker;
  document.getElementById("detailTopics").innerHTML = ev.topics.map(t => `<li class="mb-2">${t}</li>`).join("");

  // 6.2 الخريطة الثابتة (صورة) حسب المكان
  const mapImg = document.getElementById("detailMap");
  mapImg.src = loc.map;
  mapImg.alt = `خريطة: ${loc.name}`;

  // 6.3 معرض الصور: الضغط على صورة يفتحها مكبّرة داخل Modal
  const gallery = document.getElementById("detailGallery");
  gallery.innerHTML = ev.gallery.map((src, i) => `
    <div class="col-4">
      <button type="button" class="gallery-thumb" data-src="${src}" data-bs-toggle="modal" data-bs-target="#imageModal">
        <img src="${src}" alt="صورة ${i + 1} من ${ev.title}" loading="lazy">
      </button>
    </div>`).join("");
  gallery.addEventListener("click", function (e) {
    const btn = e.target.closest(".gallery-thumb");
    if (btn) document.getElementById("imageModalImg").src = btn.dataset.src;
  });

  // 6.4 أضف للتقويم: رابط Google Calendar + ملف .ics يعمل مع Outlook و Apple Calendar
  const start = ev.date.replace(/-/g, "") + "T" + ev.time.replace(":", "") + "00";
  const endHour = Number(ev.time.split(":")[0]) + ev.duration;
  const end = ev.date.replace(/-/g, "") + "T" + String(endHour).padStart(2, "0") + ev.time.split(":")[1] + "00";

  const googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE"
    + "&text=" + encodeURIComponent(ev.title)
    + "&dates=" + start + "/" + end
    + "&details=" + encodeURIComponent(ev.short)
    + "&location=" + encodeURIComponent(loc.name)
    + "&ctz=Asia/Damascus";
  document.getElementById("googleCalendarLink").href = googleUrl;

  document.getElementById("icsDownload").addEventListener("click", function (e) {
    e.preventDefault();
    const ics = [
      "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//SVU Events//AR",
      "BEGIN:VEVENT",
      "UID:svu-event-" + ev.id + "@svu-events",
      "DTSTAMP:" + new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
      "DTSTART:" + start,
      "DTEND:" + end,
      "SUMMARY:" + ev.title,
      "LOCATION:" + loc.name,
      "DESCRIPTION:" + ev.short,
      "END:VEVENT", "END:VCALENDAR"
    ].join("\r\n");
    // نُنشئ ملفاً مؤقتاً في المتصفح ونحمّله
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "svu-event-" + ev.id + ".ics";
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  // 6.5 المشاركة: روابط لمواقع التواصل + نسخ الرابط
  const pageUrl = window.location.href;
  const shareText = encodeURIComponent(ev.title + " - دليل فعاليات SVU");
  const encUrl = encodeURIComponent(pageUrl);
  document.getElementById("shareWhatsapp").href = `https://wa.me/?text=${shareText}%20${encUrl}`;
  document.getElementById("shareTelegram").href = `https://t.me/share/url?url=${encUrl}&text=${shareText}`;
  document.getElementById("shareFacebook").href = `https://www.facebook.com/sharer/sharer.php?u=${encUrl}`;
  document.getElementById("shareX").href = `https://twitter.com/intent/tweet?text=${shareText}&url=${encUrl}`;

  const shareAlert = document.getElementById("shareAlert");
  document.getElementById("copyLink").addEventListener("click", function (e) {
    e.preventDefault();
    const done = () => {
      shareAlert.classList.remove("d-none");
      setTimeout(() => shareAlert.classList.add("d-none"), 2500);
    };
    if (navigator.clipboard) navigator.clipboard.writeText(pageUrl).then(done, done);
    else done();
  });

  // 6.6 فعاليات ذات صلة: نفس التصنيف أولاً، ثم نكمل بأقرب الفعاليات حتى 3
  const others = EVENTS.filter(e => e.id !== ev.id);
  const sameCat = others.filter(e => e.category === ev.category);
  const rest = sortByDate(others.filter(e => e.category !== ev.category && daysUntil(e.date) >= 0));
  const related = sameCat.concat(rest).slice(0, 3);
  document.getElementById("relatedEvents").innerHTML =
    related.map(e => createEventCard(e, "col-12 col-md-4")).join("");

  // 6.7 حجز مقعد عبر Modal
  initBooking(ev);
}

// التحقق من حقل: نضيف is-invalid أو is-valid من Bootstrap حسب النتيجة
function validateField(input, isValid) {
  input.classList.toggle("is-invalid", !isValid);
  input.classList.toggle("is-valid", isValid);
  return isValid;
}

// صيغة بريد بسيطة: نص@نص.امتداد
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function initBooking(ev) {
  const form = document.getElementById("bookingForm");
  const alertBox = document.getElementById("bookingAlert");
  const openBtn = document.getElementById("openBooking");
  if (!form) return;

  document.getElementById("bookingEventTitle").textContent = ev.title;

  // الحجوزات محفوظة في localStorage كمصفوفة أرقام الفعاليات
  let booked = [];
  try { booked = JSON.parse(storageGet("svuBookings") || "[]"); } catch (e) { booked = []; }

  function markBooked() {
    openBtn.innerHTML = '<i class="bi bi-check-circle"></i> تم حجز مقعدك';
    openBtn.classList.replace("btn-svu-gold", "btn-success");
  }
  if (booked.includes(ev.id)) markBooked();

  // الفعالية المنتهية لا يمكن حجزها
  if (daysUntil(ev.date) < 0) {
    openBtn.disabled = true;
    openBtn.textContent = "انتهت الفعالية";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("bookName");
    const sid = document.getElementById("bookId");
    const email = document.getElementById("bookEmail");

    // نستخدم & بدل && حتى يتم فحص كل الحقول وإظهار كل الأخطاء معاً
    const ok = validateField(name, name.value.trim().length >= 3)
      & validateField(sid, /^\d{4,10}$/.test(sid.value.trim()))
      & validateField(email, EMAIL_PATTERN.test(email.value.trim()));

    alertBox.classList.remove("d-none", "alert-success", "alert-danger");
    if (!ok) {
      alertBox.classList.add("alert-danger");
      alertBox.textContent = "يرجى تصحيح الحقول المظللة باللون الأحمر.";
      return;
    }

    alertBox.classList.add("alert-success");
    alertBox.textContent = `تم حجز مقعدك يا ${name.value.trim()}! ستصلك رسالة تأكيد على ${email.value.trim()}.`;
    form.reset();
    form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));

    if (!booked.includes(ev.id)) {
      booked.push(ev.id);
      storageSet("svuBookings", JSON.stringify(booked));
    }
    markBooked();
  });
}

/* ==================================================
   7. صفحة اتصل بنا contact.html (التحقق من النموذج)
   ================================================== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  const formAlert = document.getElementById("formAlert");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("userName");
    const email = document.getElementById("userEmail");
    const message = document.getElementById("userMessage");

    const nameOk = validateField(name, name.value.trim().length >= 3);
    const emailOk = validateField(email, EMAIL_PATTERN.test(email.value.trim()));
    const messageOk = validateField(message, message.value.trim().length >= 10);

    formAlert.classList.remove("d-none", "alert-success", "alert-danger");

    if (!nameOk || !emailOk || !messageOk) {
      formAlert.classList.add("alert-danger");
      formAlert.innerHTML = '<i class="bi bi-exclamation-triangle"></i> لم يتم الإرسال: يرجى تصحيح الحقول المظللة باللون الأحمر.';
      return;
    }

    formAlert.classList.add("alert-success");
    formAlert.innerHTML = '<i class="bi bi-check-circle"></i> شكراً لتواصلك معنا! تم إرسال رسالتك بنجاح وسيتواصل معك الفريق قريباً.';
    form.reset();
    form.querySelectorAll(".is-valid").forEach(el => el.classList.remove("is-valid"));
  });
}

/* ==================================================
   8. التشغيل: كل دالة تتحقق بنفسها إن كانت عناصرها موجودة في الصفحة الحالية
   ================================================== */
document.addEventListener("DOMContentLoaded", function () {
  initThemeToggle();
  initScrollTop();

  renderTodayEvent();
  renderCarousel();
  renderQuickCategories();
  renderLatestEvents();

  initEventsPage();
  initEventPage();
  initContactForm();
});
