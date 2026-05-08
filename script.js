/* GLOBAL STATE */
let currentScreen = "onboarding";
let screenHistory = ["onboarding"];
let currentLanguage = "en";

let currentTask = null;
let currentUser = {
  name: "",
  username: "",
  email: "",
  role: "helper",
  verified: false,
  hours: 3,
  tasksCompleted: 2
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

/* LANGUAGE PACK (simplified) */
const LANG = {
  en: {
    appName: "Taskly",
    onboardTitle: "Welcome to Taskly",
    onboardSubtitle: "Set up your account to get started.",
    onboardNameLabel: "Full name",
    onboardUsernameLabel: "Username",
    onboardEmailLabel: "Email",
    onboardRoleLabel: "Role",
    onboardBtn: "Continue",
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
    usernameLabel: "Username:",
    roleLabel: "Role:",
    verifiedLabel: "Verified:",
    verifiedToggleLabel: "Verified account",
    editProfileTitle: "Edit Profile",
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
  }
};

/* LOCATION → LANGUAGE MAP */
const LOCATION_LANG = {
  "Ottawa": "en",
  "Toronto": "en",
  "Montreal": "en",
  "Vancouver": "en",
  "Calgary": "en",
  "New York": "en",
  "Los Angeles": "en",
  "Chicago": "en",
  "Houston": "en",
  "Paris": "en",
  "Berlin": "en",
  "Madrid": "en",
  "Rome": "en",
  "Amsterdam": "en",
  "Stockholm": "en",
  "Oslo": "en",
  "Copenhagen": "en",
  "Helsinki": "en",
  "Tokyo": "en",
  "Seoul": "en",
  "Beijing": "en",
  "Shanghai": "en",
  "Taipei": "en",
  "Hong Kong": "en",
  "Bangkok": "en",
  "New Delhi": "en",
  "Mexico City": "en",
  "São Paulo": "en",
  "Buenos Aires": "en",
  "Dubai": "en",
  "Riyadh": "en",
  "Cairo": "en"
};

/* APPLY LANGUAGE */
function applyLanguage(lang) {
  currentLanguage = lang;
  const L = LANG[lang] || LANG["en"];

  const map = {
    ui_appName: L.appName,
    ui_onboardTitle: L.onboardTitle,
    ui_onboardSubtitle: L.onboardSubtitle,
    ui_onboardNameLabel: L.onboardNameLabel,
    ui_onboardUsernameLabel: L.onboardUsernameLabel,
    ui_onboardEmailLabel: L.onboardEmailLabel,
    ui_onboardRoleLabel: L.onboardRoleLabel,
    ui_onboardBtn: L.onboardBtn,
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
    ui_usernameLabel: L.usernameLabel,
    ui_roleLabel: L.roleLabel,
    ui_verifiedLabel: L.verifiedLabel,
    ui_verifiedToggleLabel: L.verifiedToggleLabel,
    ui_editProfileTitle: L.editProfileTitle,
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

/* LOCATION → LANGUAGE SWITCH */
function updateLanguageFromLocation() {
  const loc = document.getElementById("homeLocation").value;
  const lang = LOCATION_LANG[loc] || "en";
  applyLanguage(lang);
}
window.updateLanguageFromLocation = updateLanguageFromLocation;

/* NAVIGATION */
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  const el = document.getElementById("screen-" + id);
  if (el) el.classList.add("active");
  currentScreen = id;
}

function navigateTo(screen) {
  if (!currentUser.email || !currentUser.username || !currentUser.name) {
    if (screen !== "onboarding") {
      alert("Please complete signup first.");
      return;
    }
  }

  screenHistory.push(screen);
  showScreen(screen);

  if (screen === "search") initSearch();
  if (screen === "messages") renderChat();
  if (screen === "hours") renderHours();
  if (screen === "profile") loadProfile();

  const nav = document.getElementById("bottomNav");
  if (screen !== "onboarding") {
    nav.classList.remove("hidden");
  } else {
    nav.classList.add("hidden");
  }
}

function navigateBack() {
  if (screenHistory.length > 1) screenHistory.pop();
  const prev = screenHistory[screenHistory.length - 1];
  navigateTo(prev);
}

window.navigateTo = navigateTo;
window.navigateBack = navigateBack;

/* ONBOARDING */
function completeOnboarding() {
  const name = document.getElementById("obName").value.trim();
  const username = document.getElementById("obUsername").value.trim();
  const email = document.getElementById("obEmail").value.trim();
  const role = document.getElementById("obRole").value;

  if (!name || !username || !email) {
    alert("Please fill in name, username, and email.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("Please enter a valid email (example: name@gmail.com).");
    return;
  }

  currentUser.name = name;
  currentUser.username = username;
  currentUser.email = email;
  currentUser.role = role;

  document.getElementById("bottomNav").classList.remove("hidden");

  navigateTo("home");
  loadHomePopular();
}

/* DARK MODE */
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
  const icon = document.getElementById("darkIcon");
  icon.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
};

/* TASK GENERATION */
const categories = {
  yard: { label: "Yard Work" },
  tech: { label: "Tech Help" },
  errands: { label: "Errands" },
  pet: { label: "Pet Care" }
};

const baseTasks = [
  { cat: "yard", title: "Mow My Lawn", desc: "Front and backyard mowing.", pay: "$10", time: "2 hours", senior: "Mrs. Thompson" },
  { cat: "tech", title: "Help with Computer", desc: "Basic computer troubleshooting.", pay: "Volunteer Hours", time: "1 hour", senior: "Mr. Lee" },
  { cat: "errands", title: "Grocery Shopping Help", desc: "Pick up groceries from local store.", pay: "$15", time: "1.5 hours", senior: "Mrs. Lopez" },
  { cat: "pet", title: "Walk My Dog", desc: "Take my dog for a walk in the park.", pay: "$12", time: "45 minutes", senior: "Mr. Garcia" }
];

function aiImageForTask(title) {
  const styles = [
    "cute pastel cartoon",
    "soft watercolor illustration",
    "simple geometric art",
    "flat vector style",
    "storybook illustration",
    "rounded chibi-style drawing",
    "minimalist doodle art",
    "bright clay-like 3D cartoon"
  ];

  const style = styles[Math.floor(Math.random() * styles.length)];

  const prompt = `
    ${title}, 
    ${style}, 
    bright colors, 
    soft outlines, 
    no realism, 
    friendly and safe style
  `;

  return `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
}

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
      image: aiImageForTask(base.title)
    });
  }

  return tasks;
}

/* HOME POPULAR TASKS */
function loadHomePopular() {
  const container = document.getElementById("homePopular");
  if (!container) return;
  container.innerHTML = "";

  const popular = allTasks.slice(0, 3);
  container.innerHTML = popular.map(taskCardHTML).join("");
}

/* FUZZY SEARCH (LEVENSHTEIN) */
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

/* SEARCH */
function initSearch() {
  if (!allTasks.length) allTasks = generateTasks(200);

  filteredTasks = allTasks.slice();
  visibleCount = 0;

  const container = document.getElementById("searchResults");
  if (container) container.innerHTML = "";
  loadMoreTasks();
  updateSearchStatus();

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
        return levenshtein(f, q) <= 3;
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

/* TASK CARD HTML */
function taskCardHTML(t) {
  return `
    <div class="task-card">
      <div class="img-wrapper">
        <div class="shimmer"></div>
        <img src="${t.image}" class="task-img" onload="this.classList.add('loaded')">
      </div>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <p class="muted">${t.categoryLabel} • ${t.difficulty} • ${t.time}</p>
      <p><strong>${t.pay}</strong></p>
      <p class="muted">Senior: ${t.senior}</p>
      <button class="btn primary" onclick="openTask(${t.id})">View</button>
    </div>
  `;
}

/* OPEN TASK DETAILS */
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

  img.classList.remove("loaded");
  img.src = currentTask.image;

  title.textContent = currentTask.title;
  desc.textContent = currentTask.desc;
  pay.textContent = currentTask.pay;
  senior.textContent = currentTask.senior;
  cat.textContent = currentTask.categoryLabel;
  diff.textContent = currentTask.difficulty;
  time.textContent = currentTask.time;

  navigateTo("task");
}
window.openTask = openTask;

/* MESSAGES */
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

/* HOURS */
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

/* PROFILE */
function loadProfile() {
  const pEmail = document.getElementById("pEmail");
  const pName = document.getElementById("pName");
  const pUsername = document.getElementById("pUsername");
  const pRole = document.getElementById("pRole");
  const pVerified = document.getElementById("pVerified");
  const pRank = document.getElementById("pRank");

  const setEmail = document.getElementById("setEmail");
  const peName = document.getElementById("peName");
  const peUsername = document.getElementById("peUsername");
  const peRole = document.getElementById("peRole");
  const peVerified = document.getElementById("peVerified");

  if (pEmail) pEmail.textContent = currentUser.email;
  if (pName) pName.textContent = currentUser.name;
  if (pUsername) pUsername.textContent = currentUser.username;
  if (pRole) pRole.textContent = currentUser.role;
  if (pVerified) pVerified.textContent = currentUser.verified ? "Yes" : "No";
  if (pRank) pRank.textContent = `Tasks: ${currentUser.tasksCompleted} • Hours: ${currentUser.hours}`;

  if (setEmail) setEmail.value = currentUser.email;
  if (peName) peName.value = currentUser.name;
  if (peUsername) peUsername.value = currentUser.username;
  if (peRole) peRole.value = currentUser.role;
  if (peVerified) peVerified.checked = currentUser.verified;
}

function saveSettings() {
  const setEmail = document.getElementById("setEmail");
  const peName = document.getElementById("peName");
  const peUsername = document.getElementById("peUsername");
  const peRole = document.getElementById("peRole");
  const peVerified = document.getElementById("peVerified");

  if (setEmail.value && (!setEmail.value.includes("@") || !setEmail.value.includes("."))) {
    alert("Please enter a valid email.");
    return;
  }

  if (setEmail) currentUser.email = setEmail.value.trim();
  if (peName) currentUser.name = peName.value.trim();
  if (peUsername) currentUser.username = peUsername.value.trim();
  if (peRole) currentUser.role = peRole.value;
  if (peVerified) currentUser.verified = peVerified.checked;

  loadProfile();
  alert("Saved!");
}
window.saveSettings = saveSettings;

/* QUICK CATEGORY SEARCH */
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

/* INIT */
window.onload = () => {
  allTasks = generateTasks(200);
  applyLanguage(currentLanguage);
  showScreen("onboarding");
  document.getElementById("bottomNav").classList.add("hidden");
};
function autoDetectCountry() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;

    // Reverse geocode using OpenStreetMap (free)
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      const country = data.address.country || "Unknown";
      const countryInput = document.getElementById("homeLocation");

      if (countryInput) {
        countryInput.value = country;
      }
    } catch (err) {
      console.log("Geolocation lookup failed", err);
    }
  });
}

// Run on startup
autoDetectCountry();
