/* --------------------------------------------------
   GLOBAL STATE
-------------------------------------------------- */
let currentScreen = "home";
let screenHistory = ["home"];
let currentLanguage = "en";

let currentTask = null;
let currentUser = {
  email: "helper@example.com",
  name: "Helper",
  role: "helper",
  verified: false,
  hours: 0,
  tasksCompleted: 0
};

let allTasks = [];
let filteredTasks = [];
let visibleCount = 0;
const PAGE_SIZE = 20;

let messagesByTask = {};
let volunteerHistory = [
  { title: "Helped Mrs. Lopez with groceries", hours: 2 },
  { title: "Fixed Wi-Fi for Mr. Lee", hours: 1 }
];

/* --------------------------------------------------
   LANGUAGE PACK (20+ LANGUAGES)
-------------------------------------------------- */
const LANG = {
  en: {
    appName: "Taskly",
    homeWelcome: "Welcome back!",
    homeSubtitle: "Lend a hand and make a difference today.",
    catAll: "All Categories",
    catYard: "Yard Work",
    catTech: "Tech Help",
    catErrands: "Errands",
    catPet: "Pet Care",
    searchBtn: "Search",
    popularTasks: "Popular Tasks for You",
    hoursBannerTitle: "Track Your Volunteer Hours & Earn Rewards!",
    hoursBannerText: "Build your resume for the future.",
    hoursBannerBtn: "Get Started",
    searchTitle: "Search Tasks",
    messagesTitle: "Messages",
    sendBtn: "Send",
    hoursTitle: "Your Volunteer Hours",
    exportHoursBtn: "Export Hours",
    profileTitle: "Your Profile",
    emailLabel: "Email:",
    nameLabel: "Name:",
    roleLabel: "Role:",
    editProfileTitle: "Edit Profile",
    verifiedLabel: "Verified",
    saveBtn: "Save",
    backBtn: "Back",
    payLabel: "Pay:",
    seniorLabel: "Senior:",
    categoryLabel: "Category:",
    difficultyLabel: "Difficulty:",
    timeLabel: "Time:",
    navHome: "Home",
    navSearch: "Search",
    navMessages: "Messages",
    navHours: "Hours",
    navProfile: "Profile"
  },

  fr: {
    appName: "Taskly",
    homeWelcome: "Bon retour!",
    homeSubtitle: "Aidez et faites une différence aujourd’hui.",
    catAll: "Toutes les catégories",
    catYard: "Travaux de jardin",
    catTech: "Aide informatique",
    catErrands: "Courses",
    catPet: "Soin des animaux",
    searchBtn: "Rechercher",
    popularTasks: "Tâches populaires pour vous",
    hoursBannerTitle: "Suivez vos heures de bénévolat!",
    hoursBannerText: "Améliorez votre CV pour l’avenir.",
    hoursBannerBtn: "Commencer",
    searchTitle: "Rechercher des tâches",
    messagesTitle: "Messages",
    sendBtn: "Envoyer",
    hoursTitle: "Vos heures de bénévolat",
    exportHoursBtn: "Exporter",
    profileTitle: "Votre profil",
    emailLabel: "Courriel:",
    nameLabel: "Nom:",
    roleLabel: "Rôle:",
    editProfileTitle: "Modifier le profil",
    verifiedLabel: "Vérifié",
    saveBtn: "Sauvegarder",
    backBtn: "Retour",
    payLabel: "Paiement:",
    seniorLabel: "Aîné:",
    categoryLabel: "Catégorie:",
    difficultyLabel: "Difficulté:",
    timeLabel: "Durée:",
    navHome: "Accueil",
    navSearch: "Recherche",
    navMessages: "Messages",
    navHours: "Heures",
    navProfile: "Profil"
  },

  es: {
    appName: "Taskly",
    homeWelcome: "¡Bienvenido de nuevo!",
    homeSubtitle: "Ayuda y marca la diferencia hoy.",
    catAll: "Todas las categorías",
    catYard: "Trabajo de jardín",
    catTech: "Ayuda tecnológica",
    catErrands: "Mandados",
    catPet: "Cuidado de mascotas",
    searchBtn: "Buscar",
    popularTasks: "Tareas populares para ti",
    hoursBannerTitle: "¡Registra tus horas de voluntariado!",
    hoursBannerText: "Mejora tu currículum.",
    hoursBannerBtn: "Comenzar",
    searchTitle: "Buscar tareas",
    messagesTitle: "Mensajes",
    sendBtn: "Enviar",
    hoursTitle: "Tus horas de voluntariado",
    exportHoursBtn: "Exportar",
    profileTitle: "Tu perfil",
    emailLabel: "Correo:",
    nameLabel: "Nombre:",
    roleLabel: "Rol:",
    editProfileTitle: "Editar perfil",
    verifiedLabel: "Verificado",
    saveBtn: "Guardar",
    backBtn: "Atrás",
    payLabel: "Pago:",
    seniorLabel: "Persona mayor:",
    categoryLabel: "Categoría:",
    difficultyLabel: "Dificultad:",
    timeLabel: "Tiempo:",
    navHome: "Inicio",
    navSearch: "Buscar",
    navMessages: "Mensajes",
    navHours: "Horas",
    navProfile: "Perfil"
  },

  de: {
    appName: "Taskly",
    homeWelcome: "Willkommen zurück!",
    homeSubtitle: "Hilf mit und mache heute einen Unterschied.",
    catAll: "Alle Kategorien",
    catYard: "Gartenarbeit",
    catTech: "Technikhilfe",
    catErrands: "Besorgungen",
    catPet: "Tierpflege",
    searchBtn: "Suchen",
    popularTasks: "Beliebte Aufgaben für dich",
    hoursBannerTitle: "Verfolge deine Freiwilligenstunden!",
    hoursBannerText: "Verbessere deinen Lebenslauf.",
    hoursBannerBtn: "Starten",
    searchTitle: "Aufgaben suchen",
    messagesTitle: "Nachrichten",
    sendBtn: "Senden",
    hoursTitle: "Deine Freiwilligenstunden",
    exportHoursBtn: "Exportieren",
    profileTitle: "Dein Profil",
    emailLabel: "E-Mail:",
    nameLabel: "Name:",
    roleLabel: "Rolle:",
    editProfileTitle: "Profil bearbeiten",
    verifiedLabel: "Verifiziert",
    saveBtn: "Speichern",
    backBtn: "Zurück",
    payLabel: "Bezahlung:",
    seniorLabel: "Senior:",
    categoryLabel: "Kategorie:",
    difficultyLabel: "Schwierigkeit:",
    timeLabel: "Zeit:",
    navHome: "Start",
    navSearch: "Suche",
    navMessages: "Nachrichten",
    navHours: "Stunden",
    navProfile: "Profil"
  },

  ja: {
    appName: "Taskly",
    homeWelcome: "おかえりなさい！",
    homeSubtitle: "手伝って、今日違いを作りましょう。",
    catAll: "すべてのカテゴリ",
    catYard: "庭仕事",
    catTech: "テックサポート",
    catErrands: "お使い",
    catPet: "ペットケア",
    searchBtn: "検索",
    popularTasks: "あなたへのおすすめタスク",
    hoursBannerTitle: "ボランティア時間を記録しましょう！",
    hoursBannerText: "未来のために履歴書を強化。",
    hoursBannerBtn: "開始",
    searchTitle: "タスク検索",
    messagesTitle: "メッセージ",
    sendBtn: "送信",
    hoursTitle: "あなたのボランティア時間",
    exportHoursBtn: "エクスポート",
    profileTitle: "プロフィール",
    emailLabel: "メール:",
    nameLabel: "名前:",
    roleLabel: "役割:",
    editProfileTitle: "プロフィール編集",
    verifiedLabel: "認証済み",
    saveBtn: "保存",
    backBtn: "戻る",
    payLabel: "報酬:",
    seniorLabel: "シニア:",
    categoryLabel: "カテゴリ:",
    difficultyLabel: "難易度:",
    timeLabel: "時間:",
    navHome: "ホーム",
    navSearch: "検索",
    navMessages: "メッセージ",
    navHours: "時間",
    navProfile: "プロフィール"
  },

  ko: {
    appName: "Taskly",
    homeWelcome: "다시 오신 것을 환영합니다!",
    homeSubtitle: "도와주고 오늘 변화를 만들어보세요.",
    catAll: "모든 카테고리",
    catYard: "정원 작업",
    catTech: "기술 지원",
    catErrands: "심부름",
    catPet: "반려동물 돌봄",
    searchBtn: "검색",
    popularTasks: "추천 작업",
    hoursBannerTitle: "봉사 시간을 기록하세요!",
    hoursBannerText: "미래를 위한 이력서 강화.",
    hoursBannerBtn: "시작",
    searchTitle: "작업 검색",
    messagesTitle: "메시지",
    sendBtn: "보내기",
    hoursTitle: "봉사 시간",
    exportHoursBtn: "내보내기",
    profileTitle: "프로필",
    emailLabel: "이메일:",
    nameLabel: "이름:",
    roleLabel: "역할:",
    editProfileTitle: "프로필 수정",
    verifiedLabel: "인증됨",
    saveBtn: "저장",
    backBtn: "뒤로",
    payLabel: "보수:",
    seniorLabel: "시니어:",
    categoryLabel: "카테고리:",
    difficultyLabel: "난이도:",
    timeLabel: "시간:",
    navHome: "홈",
    navSearch: "검색",
    navMessages: "메시지",
    navHours: "시간",
    navProfile: "프로필"
  }
};

/* --------------------------------------------------
   LOCATION → LANGUAGE MAP
-------------------------------------------------- */
const LOCATION_LANG = {
  // Canada
  "Ottawa": "en",
  "Toronto": "en",
  "Vancouver": "en",
  "Calgary": "en",
  "Montreal": "fr",

  // USA
  "New York": "en",
  "Los Angeles": "en",
  "Chicago": "en",
  "Houston": "en",

  // Europe
  "Paris": "fr",
  "Berlin": "de",
  "Madrid": "es",
  "Rome": "it",
  "Amsterdam": "nl",
  "Stockholm": "sv",
  "Oslo": "no",
  "Copenhagen": "da",
  "Helsinki": "fi",

  // Asia
  "Tokyo": "ja",
  "Seoul": "ko",
  "Beijing": "zh",
  "Shanghai": "zh",
  "Taipei": "zh",
  "Hong Kong": "zh",
  "Bangkok": "th",
  "New Delhi": "hi",

  // Latin America
  "Mexico City": "es",
  "São Paulo": "pt",
  "Buenos Aires": "es",

  // Middle East
  "Dubai": "ar",
  "Riyadh": "ar",
  "Cairo": "ar"
};

/* --------------------------------------------------
   APPLY LANGUAGE TO UI
-------------------------------------------------- */
function applyLanguage(lang) {
  currentLanguage = lang;
  const L = LANG[lang] || LANG["en"];

  const map = {
    ui_appName: L.appName,
    ui_homeWelcome: L.homeWelcome,
    ui_homeSubtitle: L.homeSubtitle,
    ui_catAll: L.catAll,
    ui_catYard: L.catYard,
    ui_catTech: L.catTech,
    ui_catErrands: L.catErrands,
    ui_catPet: L.catPet,
    ui_catYard2: L.catYard,
    ui_catTech2: L.catTech,
    ui_catErrands2: L.catErrands,
    ui_catPet2: L.catPet,
    ui_searchBtn: L.searchBtn,
    ui_popularTasks: L.popularTasks,
    ui_hoursBannerTitle: L.hoursBannerTitle,
    ui_hoursBannerText: L.hoursBannerText,
    ui_hoursBannerBtn: L.hoursBannerBtn,
    ui_searchTitle: L.searchTitle,
    ui_messagesTitle: L.messagesTitle,
    ui_sendBtn: L.sendBtn,
    ui_hoursTitle: L.hoursTitle,
    ui_exportHoursBtn: L.exportHoursBtn,
    ui_profileTitle: L.profileTitle,
    ui_emailLabel: L.emailLabel,
    ui_nameLabel: L.nameLabel,
    ui_roleLabel: L.roleLabel,
    ui_editProfileTitle: L.editProfileTitle,
    ui_verifiedLabel: L.verifiedLabel,
    ui_saveBtn: L.saveBtn,
    ui_backBtn: L.backBtn,
    ui_payLabel: L.payLabel,
    ui_seniorLabel: L.seniorLabel,
    ui_categoryLabel: L.categoryLabel,
    ui_difficultyLabel: L.difficultyLabel,
    ui_timeLabel: L.timeLabel,
    ui_navHome: L.navHome,
    ui_navSearch: L.navSearch,
    ui_navMessages: L.navMessages,
    ui_navHours: L.navHours,
    ui_navProfile: L.navProfile
  };

  for (const id in map) {
    const el = document.getElementById(id);
    if (el) el.textContent = map[id];
  }
}

/* --------------------------------------------------
   LOCATION → LANGUAGE SWITCH
-------------------------------------------------- */
function updateLanguageFromLocation() {
  const loc = document.getElementById("homeLocation").value;
  const lang = LOCATION_LANG[loc] || "en";
  applyLanguage(lang);
}

window.updateLanguageFromLocation = updateLanguageFromLocation;

/* --------------------------------------------------
   NAVIGATION
-------------------------------------------------- */
function navigateTo(screen) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-" + screen).classList.add("active");

  screenHistory.push(screen);
  currentScreen = screen;

  if (screen === "search") initSearch();
  if (screen === "messages") renderChat();
  if (screen === "hours") renderHours();
  if (screen === "profile") loadProfile();

  feather.replace();
}

function navigateBack() {
  if (screenHistory.length > 1) screenHistory.pop();
  const prev = screenHistory[screenHistory.length - 1];
  navigateTo(prev);
}

window.navigateTo = navigateTo;
window.navigateBack = navigateBack;

/* --------------------------------------------------
   DARK MODE
-------------------------------------------------- */
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
  const icon = document.querySelector("#darkToggle i");
  icon.setAttribute("data-feather", document.body.classList.contains("dark") ? "sun" : "moon");
  feather.replace();
};

/* --------------------------------------------------
   TASK GENERATION
-------------------------------------------------- */
const categories = {
  yard: { label: "Yard Work", color: "8bc34a", text: "ffffff" },
  tech: { label: "Tech Help", color: "6c757d", text: "ffffff" },
  errands: { label: "Errands", color: "f2c94c", text: "000000" },
  pet: { label: "Pet Care", color: "f2994a", text: "ffffff" }
};

const baseTasks = [
  { cat: "yard", title: "Mow My Lawn", desc: "Front and backyard mowing.", pay: "$10", time: "2 hours", senior: "Mrs. Thompson" },
  { cat: "tech", title: "Help with Computer", desc: "Basic computer troubleshooting.", pay: "Volunteer Hours", time: "1 hour", senior: "Mr. Lee" },
  { cat: "errands", title: "Grocery Shopping Help", desc: "Pick up groceries from local store.", pay: "$15", time: "1.5 hours", senior: "Mrs. Lopez" }
];

function generateTasks(count = 200) {
  const tasks = [];
  let id = 1;

  for (let i = 0; i < count; i++) {
    const base = baseTasks[i % baseTasks.length];
    const meta = categories[base.cat];

    tasks.push({
      id: id++,
      title: base.title,
      desc: base.desc,
      pay: base.pay,
      time: base.time,
      senior: base.senior,
      category: base.cat,
      categoryLabel: meta.label,
      difficulty: ["Easy", "Medium", "Hard"][i % 3],
      image: `https://placehold.co/300x200/${meta.color}/${meta.text}?text=${encodeURIComponent(meta.label)}`
    });
  }

  return tasks;
}

/* --------------------------------------------------
   HOME POPULAR TASKS
-------------------------------------------------- */
function loadHomePopular() {
  const container = document.getElementById("homePopular");
  container.innerHTML = "";

  const popular = allTasks.slice(0, 3);

  container.innerHTML = popular.map(taskCardHTML).join("");
}

/* --------------------------------------------------
   FUZZY SEARCH (LEVENSHTEIN)
-------------------------------------------------- */
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, () => []);
  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[a.length][b.length];
}

/* --------------------------------------------------
   SEARCH
-------------------------------------------------- */
function initSearch() {
  if (!allTasks.length) allTasks = generateTasks(200);

  filteredTasks = allTasks.slice();
  visibleCount = 0;

  const container = document.getElementById("searchResults");
  if (container) container.innerHTML = "";
  loadMoreTasks();
  updateSearchStatus();

  // Infinite scroll only on search screen
  window.onscroll = () => {
    if (currentScreen !== "search") return;
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (bottom) loadMoreTasks();
  };
}

function liveSearch() {
  const input = document.getElementById("searchInput");
  if (!input) return;

  const q = input.value.toLowerCase().trim();

  if (!q) {
    filteredTasks = allTasks.slice();
  } else {
    filteredTasks = allTasks.filter(t => {
      const fields = [
        t.title.toLowerCase(),
        t.desc.toLowerCase(),
        t.categoryLabel.toLowerCase()
      ];

      return fields.some(f => {
        if (f.includes(q)) return true;
        return levenshtein(f, q) <= 3; // fuzzy threshold
      });
    });
  }

  visibleCount = 0;
  const container = document.getElementById("searchResults");
  if (container) container.innerHTML = "";
  loadMoreTasks();
}

window.liveSearch = liveSearch;

function loadMoreTasks() {
  const container = document.getElementById("searchResults");
  if (!container) return;

  const next = filteredTasks.slice(visibleCount, visibleCount + PAGE_SIZE);
  if (!next.length) return;

  container.insertAdjacentHTML("beforeend", next.map(taskCardHTML).join(""));
  visibleCount += next.length;

  updateSearchStatus();
}

function updateSearchStatus() {
  const status = document.getElementById("searchStatus");
  if (!status) return;
  status.textContent = `Showing ${visibleCount} of ${filteredTasks.length} tasks`;
}

/* --------------------------------------------------
   TASK CARD HTML
-------------------------------------------------- */
function taskCardHTML(t) {
  return `
    <div class="task-card">
      <img src="${t.image}" alt="${t.categoryLabel}">
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <p class="muted">${t.categoryLabel} • ${t.difficulty} • ${t.time}</p>
      <p><strong>${t.pay}</strong></p>
      <p class="muted">Senior: ${t.senior}</p>
      <button class="btn primary" onclick="openTask(${t.id})">View</button>
    </div>
  `;
}

/* --------------------------------------------------
   OPEN TASK DETAILS
-------------------------------------------------- */
function openTask(id) {
  currentTask = allTasks.find(t => t.id === id);
  if (!currentTask) return;

  const img = document.getElementById("tdImg");
  const title = document.getElementById("tdTitle");
  const desc = document.getElementById("tdDesc");
  const pay = document.getElementById("tdPay");
  const senior = document.getElementById("tdSenior");
  const cat = document.getElementById("tdCat");
  const diff = document.getElementById("tdDiff");
  const time = document.getElementById("tdTime");

  if (img) img.src = currentTask.image;
  if (title) title.textContent = currentTask.title;
  if (desc) desc.textContent = currentTask.desc;
  if (pay) pay.textContent = currentTask.pay;
  if (senior) senior.textContent = currentTask.senior;
  if (cat) cat.textContent = currentTask.categoryLabel;
  if (diff) diff.textContent = currentTask.difficulty;
  if (time) time.textContent = currentTask.time;

  navigateTo("task");
}

window.openTask = openTask;

/* --------------------------------------------------
   MESSAGES
-------------------------------------------------- */
function sendMsg() {
  const input = document.getElementById("chatInput");
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  const id = currentTask ? currentTask.id : "general";
  if (!messagesByTask[id]) messagesByTask[id] = [];

  messagesByTask[id].push({ from: "me", text });

  input.value = "";
  renderChat();

  setTimeout(() => {
    messagesByTask[id].push({ from: "them", text: generateReply(text) });
    renderChat();
  }, 600);
}

window.sendMsg = sendMsg;

function renderChat() {
  const chat = document.getElementById("chat");
  if (!chat) return;

  chat.innerHTML = "";

  const id = currentTask ? currentTask.id : "general";
  const msgs = messagesByTask[id] || [];

  msgs.forEach(m => {
    const div = document.createElement("div");
    div.className = "chat-bubble " + (m.from === "me" ? "me" : "them");
    div.textContent = m.text;
    chat.appendChild(div);
  });

  chat.scrollTop = chat.scrollHeight;
}

function generateReply(text) {
  const t = text.toLowerCase();
  if (t.includes("hello") || t.includes("hi")) return "Hello dear, so nice to hear from you.";
  if (t.includes("time")) return "Any time this afternoon works for me.";
  if (t.includes("wifi") || t.includes("internet")) return "Oh thank you dear, I always get confused with the internet.";
  return "Thank you dear, that’s very kind of you.";
}

/* --------------------------------------------------
   HOURS
-------------------------------------------------- */
function renderHours() {
  const list = document.getElementById("hoursList");
  if (!list) return;

  list.innerHTML = volunteerHistory
    .map(h => `<div class="hours-item">${h.title} — ${h.hours}h</div>`)
    .join("");
}

function exportVolunteerHours() {
  alert("Hours exported! (placeholder)");
}

window.exportVolunteerHours = exportVolunteerHours;

/* --------------------------------------------------
   PROFILE
-------------------------------------------------- */
function loadProfile() {
  const pEmail = document.getElementById("pEmail");
  const pName = document.getElementById("pName");
  const pRole = document.getElementById("pRole");
  const pRank = document.getElementById("pRank");

  const setEmail = document.getElementById("setEmail");
  const peName = document.getElementById("peName");
  const peRole = document.getElementById("peRole");
  const peVerified = document.getElementById("peVerified");

  if (pEmail) pEmail.textContent = currentUser.email;
  if (pName) pName.textContent = currentUser.name;
  if (pRole) pRole.textContent = currentUser.role;
  if (pRank) pRank.textContent = `Tasks: ${currentUser.tasksCompleted} • Hours: ${currentUser.hours}`;

  if (setEmail) setEmail.value = currentUser.email;
  if (peName) peName.value = currentUser.name;
  if (peRole) peRole.value = currentUser.role;
  if (peVerified) peVerified.checked = currentUser.verified;
}

function saveSettings() {
  const setEmail = document.getElementById("setEmail");
  const peName = document.getElementById("peName");
  const peRole = document.getElementById("peRole");
  const peVerified = document.getElementById("peVerified");

  if (setEmail) currentUser.email = setEmail.value;
  if (peName) currentUser.name = peName.value;
  if (peRole) currentUser.role = peRole.value;
  if (peVerified) currentUser.verified = peVerified.checked;

  loadProfile();
  alert("Saved!");
}

window.saveSettings = saveSettings;

/* --------------------------------------------------
   QUICK CATEGORY SEARCH
-------------------------------------------------- */
function quickCategory(cat) {
  navigateTo("search");
  const input = document.getElementById("searchInput");
  if (!input) return;

  const meta = categories[cat];
  if (!meta) return;

  input.value = meta.label;
  liveSearch();
}

window.quickCategory = quickCategory;

/* --------------------------------------------------
   INIT
-------------------------------------------------- */
window.onload = () => {
  allTasks = generateTasks(200);
  loadHomePopular();
  applyLanguage(currentLanguage);
  feather.replace();
};
