/* --------------------------------------------------
   GLOBAL STATE
-------------------------------------------------- */
let currentScreen = "home";
let screenHistory = ["home"];

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
  { title: "Helped Mrs. Lopez with groceries", hours: 2, ts: Date.now() },
  { title: "Fixed Wi-Fi for Mr. Lee", hours: 1, ts: Date.now() }
];

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
   FUZZY SEARCH (AI SPELLING FIX)
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

  document.getElementById("searchResults").innerHTML = "";
  loadMoreTasks();
  updateSearchStatus();

  window.onscroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
    if (bottom) loadMoreTasks();
  };
}

function liveSearch() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();

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
  document.getElementById("searchResults").innerHTML = "";
  loadMoreTasks();
}

window.liveSearch = liveSearch;

/* --------------------------------------------------
   LOAD MORE TASKS
-------------------------------------------------- */
function loadMoreTasks() {
  const container = document.getElementById("searchResults");
  const next = filteredTasks.slice(visibleCount, visibleCount + PAGE_SIZE);

  if (!next.length) return;

  container.insertAdjacentHTML("beforeend", next.map(taskCardHTML).join(""));
  visibleCount += next.length;

  updateSearchStatus();
}

function updateSearchStatus() {
  const status = document.getElementById("searchStatus");
  status.textContent = `Showing ${visibleCount} of ${filteredTasks.length} tasks`;
}

/* --------------------------------------------------
   TASK CARD HTML
-------------------------------------------------- */
function taskCardHTML(t) {
  return `
    <div class="task-card">
      <img src="${t.image}">
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

  document.getElementById("tdImg").src = currentTask.image;
  document.getElementById("tdTitle").textContent = currentTask.title;
  document.getElementById("tdDesc").textContent = currentTask.desc;
  document.getElementById("tdPay").textContent = currentTask.pay;
  document.getElementById("tdSenior").textContent = currentTask.senior;
  document.getElementById("tdCat").textContent = currentTask.categoryLabel;
  document.getElementById("tdDiff").textContent = currentTask.difficulty;
  document.getElementById("tdTime").textContent = currentTask.time;

  navigateTo("task");
}

window.openTask = openTask;

/* --------------------------------------------------
   MESSAGES
-------------------------------------------------- */
function sendMsg() {
  const input = document.getElementById("chatInput");
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
  if (t.includes("hello")) return "Hello dear, so nice to hear from you.";
  if (t.includes("time")) return "Any time this afternoon works for me.";
  if (t.includes("wifi")) return "Oh thank you dear, I always get confused with the internet.";
  return "Thank you dear, that’s very kind of you.";
}

/* --------------------------------------------------
   HOURS
-------------------------------------------------- */
function renderHours() {
  const list = document.getElementById("hoursList");
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
  document.getElementById("pEmail").textContent = currentUser.email;
  document.getElementById("pName").textContent = currentUser.name;
  document.getElementById("pRole").textContent = currentUser.role;

  document.getElementById("setEmail").value = currentUser.email;
  document.getElementById("peName").value = currentUser.name;
  document.getElementById("peRole").value = currentUser.role;
  document.getElementById("peVerified").checked = currentUser.verified;

  document.getElementById("pRank").textContent =
    `Tasks: ${currentUser.tasksCompleted} • Hours: ${currentUser.hours}`;
}

function saveSettings() {
  currentUser.email = document.getElementById("setEmail").value;
  currentUser.name = document.getElementById("peName").value;
  currentUser.role = document.getElementById("peRole").value;
  currentUser.verified = document.getElementById("peVerified").checked;

  loadProfile();
  alert("Saved!");
}

window.saveSettings = saveSettings;

/* --------------------------------------------------
   QUICK CATEGORY SEARCH
-------------------------------------------------- */
function quickCategory(cat) {
  navigateTo("search");
  document.getElementById("searchInput").value = categories[cat].label;
  liveSearch();
}

window.quickCategory = quickCategory;

/* --------------------------------------------------
   INIT
-------------------------------------------------- */
window.onload = () => {
  allTasks = generateTasks(200);
  loadHomePopular();
  feather.replace();
};
