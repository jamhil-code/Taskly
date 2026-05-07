/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: system-ui, sans-serif;
  background: #f5f6ff;
  color: #222;
  padding-bottom: 80px;
}

/* TOP BAR */
.topbar {
  position: sticky;
  top: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0,0,0,0.05);
}

.logo-small-bubble {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #e8caff, #b47aff);
  box-shadow: 0 0 10px rgba(180,122,255,0.7);
  position: relative;
}

.logo-small-bubble::after {
  content: "";
  position: absolute;
  top: 6px;
  left: 10px;
  width: 12px;
  height: 12px;
  background: rgba(255,255,255,0.7);
  border-radius: 50%;
  filter: blur(4px);
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
}

/* SCREENS */
.screen {
  display: none;
  padding: 16px;
}

.screen.active {
  display: block;
}

/* HERO BUBBLE */
.hero-logo-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.hero-bubble {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #f0d9ff, #b47aff);
  box-shadow: 0 0 24px rgba(180,122,255,0.7);
  animation: floatBubble 4s ease-in-out infinite;
}

@keyframes floatBubble {
  0% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
  100% { transform: translateY(0); }
}

/* HOME TEXT */
.welcome-title {
  text-align: center;
  font-size: 22px;
  font-weight: 700;
}

.welcome-sub {
  text-align: center;
  color: #666;
  margin-bottom: 16px;
}

/* SEARCH BAR */
.search-bar {
  display: grid;
  grid-template-columns: 1.2fr 1.2fr auto;
  gap: 8px;
  margin-bottom: 16px;
}

input, select {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

/* CATEGORY ROW */
.category-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.cat-item {
  flex: 1;
  background: #f0e6ff;
  padding: 10px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  cursor: pointer;
}

/* TASK GRID */
.task-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

/* DESKTOP: 3 columns */
@media (min-width: 768px) {
  .task-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.task-card {
  background: #fff;
  padding: 12px;
  border-radius: 14px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}

.task-card img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 8px;
}

/* HOURS BANNER */
.hours-banner {
  background: #8a4bff;
  color: #fff;
  padding: 16px;
  border-radius: 16px;
  margin-top: 20px;
}

/* CHAT */
.chat-box {
  min-height: 220px;
  max-height: 400px;
  overflow-y: auto;
  background: #fff;
  padding: 12px;
  border-radius: 12px;
}

.chat-bubble {
  padding: 8px 12px;
  border-radius: 14px;
  margin-bottom: 8px;
  max-width: 80%;
}

.chat-bubble.me {
  background: #8a4bff;
  color: #fff;
  margin-left: auto;
}

.chat-bubble.them {
  background: #f1f1ff;
}

/* HOURS LIST */
.hours-item {
  background: #fff;
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 8px;
}

/* PROFILE */
.pfp {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #ddd;
  margin-bottom: 10px;
}

/* BOTTOM NAV */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 64px;
  width: 100%;
  background: #fff;
  border-top: 1px solid rgba(0,0,0,0.08);
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.bottom-nav div {
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}

.bottom-nav span {
  display: block;
  font-size: 11px;
}
