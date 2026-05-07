/* ------------------------------
   GLOBAL STATE
------------------------------ */
let currentUser = null;
let currentTask = null;
let historyStack = ["login"];
let userAvatarDataUrl = null;

/* ------------------------------
   STATIC DATA
------------------------------ */
const tasks = [
  { id: 1, title: "Clean kitchen", desc: "Help wipe counters and tidy up.", pay: "$15/hr", senior: "Mrs. Thompson", category: "cleaning" },
  { id: 2, title: "Fix WiFi", desc: "Reconnect router and check devices.", pay: "$12/hr", senior: "Mrs. Lopez", category: "tech" },
  { id: 3, title: "Mow lawn", desc: "Front yard mowing and bagging.", pay: "$20", senior: "Mrs. Johnson", category: "yard" }
];

const notifications = [
  "New message from Mrs. Lopez",
  "Task accepted: Grocery pickup",
  "Reminder: Yard work tomorrow at 3 PM"
];

const historyItems = [
  "Helped Mrs. Thompson clean kitchen (2h)",
  "Fixed Wi‑Fi for Mrs. Lopez (1h)",
  "Mowed lawn for Mrs. Johnson (2h)"
];

/* ------------------------------
   NAVIGATION
------------------------------ */
function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  const page = document.getElementById(id);
  if (page) page.classList.add("active");
}

function navigate(id) {
  historyStack.push(id);
  showPage(id);
  feather.replace();

  // autofocus search input when opening search page
  if (id === "search") {
    setTimeout(() => {
      const input = document.getElementById("liveSearchInput");
      if (input) {
        input.focus();
        input.select();
      }
    }, 60);
  }
}

function goBack() {
  if (historyStack.length > 1) {
    historyStack.pop();
    const prev = historyStack[historyStack.length - 1] || "home";
    showPage(prev);
    feather.replace();
  }
}

/* ------------------------------
   SIDEBAR CONTROL
------------------------------ */
function showSidebar() {
  const sb = document.getElementById("sidebar");
  sb.classList.remove("hidden");
  sb.setAttribute("aria-hidden", "false");
}

function hideSidebar() {
  const sb = document.getElementById("sidebar");
  sb.classList.add("hidden");
  sb.setAttribute("aria-hidden", "true");
}

/* ------------------------------
   THEME
------------------------------ */
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
  const icon = document.querySelector("#darkToggle i");
  icon.setAttribute("data-feather", document.body.classList.contains("dark") ? "sun" : "moon");
  feather.replace();
};

/* ------------------------------
   AUTH FLOW
------------------------------ */
function login() {
  const email = document.getElementById("loginEmail").value || "helper@example.com";
  currentUser = { email, role: "helper" };

  ensureAvatar();          // generate avatar FIRST
  loadProfile();
  updateSidebarProfile();
  showSidebar();

  navigate("home");
}

function finishSignup(role) {
  const email = document.getElementById("signupEmail").value || "user@example.com";
  currentUser = { email, role };

  ensureAvatar();          // generate avatar FIRST
  loadProfile();
  updateSidebarProfile();
  showSidebar();

  navigate("home");
}

/* ------------------------------
   PROFILE
------------------------------ */
function loadProfile() {
  if (!currentUser) return;
  document.getElementById("pEmail").textContent = currentUser.email;
  document.getElementById("pRole").textContent = currentUser.role;
  if (userAvatarDataUrl) {
    document.getElementById("profilePfp").style.backgroundImage = `url(${userAvatarDataUrl})`;
  }
}

function updateSidebarProfile() {
  const container = document.getElementById("sidebarProfile");
  if (!currentUser) {
    container.classList.add("hidden");
    return;
  }
  container.classList.remove("hidden");
  document.getElementById("sidebarName").textContent = currentUser.email.split("@")[0] || "You";
  if (userAvatarDataUrl) {
    document.getElementById("sidebarPfp").style.backgroundImage = `url(${userAvatarDataUrl})`;
  }
}

/* ------------------------------
   AVATAR GENERATOR (Minecraft-style, square)
------------------------------ */
function ensureAvatar() {
  if (userAvatarDataUrl) return;

  const resolutions = [8, 16, 32];
  const size = resolutions[Math.floor(Math.random() * resolutions.length)];

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const palettes = [
    ["#f4a261", "#e76f51", "#2a9d8f", "#264653"],
    ["#ffb4a2", "#e5989b", "#b5838d", "#6d6875"],
    ["#a8dadc", "#457b9d", "#1d3557", "#f1faee"],
    ["#f6bd60", "#f7ede2", "#84a59d", "#f28482"],
    ["#ffd6e0", "#ffb3c6", "#bde0fe", "#a0c4ff"]
  ];

  const palette = palettes[Math.floor(Math.random() * palettes.length)];
  function randColor() { return palette[Math.floor(Math.random() * palette.length)]; }

  // background
  ctx.fillStyle = randColor();
  ctx.fillRect(0, 0, size, size);

  const unit = size / 8;

  // eyes (white) and pupils (dark)
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(2 * unit, 2 * unit, unit, unit);
  ctx.fillRect(5 * unit, 2 * unit, unit, unit);

  ctx.fillStyle = "#000000";
  ctx.fillRect(2 * unit + unit / 3, 2 * unit + unit / 3, unit / 3, unit / 3);
  ctx.fillRect(5 * unit + unit / 3, 2 * unit + unit / 3, unit / 3, unit / 3);

  // mouth
  ctx.fillStyle = "#000000";
  ctx.fillRect(2 * unit, 5 * unit, 4 * unit, Math.max(1, unit / 1.5));

  // optional accessory
  if (Math.random() < 0.5) {
    ctx.fillStyle = randColor();
    ctx.fillRect(1 * unit, 1 * unit, 6 * unit, Math.max(1, unit / 2));
  }

  // upscale to crisp square image for display
  const displayCanvas = document.createElement("canvas");
  const displaySize = 128;
  displayCanvas.width = displaySize;
  displayCanvas.height = displaySize;
  const dctx = displayCanvas.getContext("2d");
  dctx.imageSmoothingEnabled = false;
  dctx.drawImage(canvas, 0, 0, displaySize, displaySize);

  userAvatarDataUrl = displayCanvas.toDataURL();
}

/* ------------------------------
   SEARCH (live)
------------------------------ */
function renderSearch(list) {
  const box = document.getElementById("searchResults");
  if (!list || !list.length) {
    box.innerHTML = "<p class='muted'>No tasks found.</p>";
    return;
  }
  box.innerHTML = list.map(t => `
    <div class="task-card">
      <h3>${escapeHtml(t.title)}</h3>
      <p>${escapeHtml(t.desc)}</p>
      <p><strong>${escapeHtml(t.pay)}</strong></p>
      <button class="btn primary" onclick="openTask(${t.id})">View</button>
    </div>
  `).join("");
}

function liveSearch() {
  const q = document.getElementById("liveSearchInput").value.toLowerCase().trim();
  const results = tasks.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.desc.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
  renderSearch(results);
}

function liveSearchFromHome() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  const results = tasks.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.desc.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
  // show a small preview on home (optional)
  const box = document.getElementById("searchResults");
  if (box) box.innerHTML = results.slice(0,3).map(t => `<div class="task-card"><h4>${escapeHtml(t.title)}</h4><p>${escapeHtml(t.desc)}</p></div>`).join("");
}

function openSearchFromHome() {
  const q = document.getElementById("searchInput").value || "";
  navigate("search");
  setTimeout(() => {
    const input = document.getElementById("liveSearchInput");
    if (input) {
      input.value = q;
      liveSearch();
      input.focus();
    }
  }, 80);
}

function searchCategory(cat) {
  navigate("search");
  setTimeout(() => {
    const input = document.getElementById("liveSearchInput");
    if (input) {
      input.value = cat;
      liveSearch();
      input.focus();
    }
  }, 80);
}

/* ------------------------------
   TASK DETAILS
------------------------------ */
function openTask(id) {
  currentTask = tasks.find(t => t.id === id);
  if (!currentTask) return;
  document.getElementById("tdTitle").textContent = currentTask.title;
  document.getElementById("tdDesc").textContent = currentTask.desc;
  document.getElementById("tdPay").textContent = currentTask.pay;
  document.getElementById("tdSenior").textContent = currentTask.senior;
  navigate("taskDetails");
}

/* ------------------------------
   POST TASK
------------------------------ */
function postTask() {
  const title = document.getElementById("ptTitle").value.trim();
  const desc = document.getElementById("ptDesc").value.trim();
  const cat = document.getElementById("ptCat").value;
  const pay = document.getElementById("ptPay").value.trim();
  if (!title) { alert("Please add a title."); return; }
  const id = tasks.length + 1;
  tasks.push({ id, title, desc, pay: pay || "$0", senior: currentUser ? currentUser.email.split("@")[0] : "User", category: cat });
  alert("Task posted (local only).");
  navigate("home");
}

/* ------------------------------
   MESSAGES + SENIOR-STYLE AI
------------------------------ */
function sendMsg() {
  const input = document.getElementById("chatInput");
  const text = input.value.trim();
  if (!text) return;
  addBubble(text, "me");
  input.value = "";
  setTimeout(() => {
    const reply = generateSeniorReply(text);
    addBubble(reply, "them");
  }, 700);
}

function addBubble(text, who) {
  const chat = document.getElementById("chat");
  const div = document.createElement("div");
  div.className = "chat-bubble " + who;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function generateSeniorReply(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes("wifi") || lower.includes("internet")) return "Oh thank you dear, I always get confused with the internet.";
  if (lower.includes("time") || lower.includes("when")) return "Any time this afternoon is fine, dear. I’m usually at home.";
  if (lower.includes("grocery") || lower.includes("groceries")) return "That would be lovely, dear. I can give you a small list.";
  if (lower.includes("hello") || lower.includes("hi")) return "Hello dear, it’s so nice to hear from you.";
  if (lower.includes("bye") || lower.includes("goodnight")) return "Goodbye dear, thank you again for your kindness.";
  return "Oh thank you dear, that’s very kind of you.";
}

/* ------------------------------
   SETTINGS
------------------------------ */
function saveSettings() {
  const newEmail = document.getElementById("setEmail").value.trim();
  if (currentUser && newEmail) {
    currentUser.email = newEmail;
    loadProfile();
    updateSidebarProfile();
  }
  alert("Saved!");
}

/* ------------------------------
   NOTIFICATIONS & HISTORY
------------------------------ */
function loadLists() {
  document.getElementById("notifList").innerHTML = notifications.map(n => `<li>${escapeHtml(n)}</li>`).join("");
  document.getElementById("historyList").innerHTML = historyItems.map(h => `<li>${escapeHtml(h)}</li>`).join("");
}

/* ------------------------------
   UTIL
------------------------------ */
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

/* ------------------------------
   INIT
------------------------------ */
window.onload = () => {
  hideSidebar();
  showPage("login");
  loadLists();
  feather.replace();
};
