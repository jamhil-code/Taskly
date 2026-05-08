<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Taskly</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="styles.css">
</head>

<body>

<!-- TOP BAR -->
<div class="topbar">
  <div class="logo-small-bubble"></div>
  <div id="ui_appName" class="topbar-title">Taskly</div>
  <button id="darkToggle" class="btn-icon">
    <span id="darkIcon">🌙</span>
  </button>
</div>

<!-- ONBOARDING / SIGNUP -->
<div id="screen-onboarding" class="screen active">
  <div class="onboard-hero"></div>

  <h2 id="ui_onboardTitle">Welcome to Taskly</h2>
  <p id="ui_onboardSubtitle" class="muted">Set up your account to get started.</p>

  <div class="onboard-card">
    <label id="ui_onboardNameLabel">Full name</label>
    <input id="obName" placeholder="Your name">

    <label id="ui_onboardUsernameLabel">Username</label>
    <input id="obUsername" placeholder="Username (what others see)">

    <label id="ui_onboardEmailLabel">Email</label>
    <input id="obEmail" placeholder="Email">

    <label id="ui_onboardRoleLabel">Role</label>
    <select id="obRole">
      <option value="helper">Helper</option>
      <option value="senior">Senior</option>
    </select>

    <button id="ui_onboardBtn" class="btn primary" onclick="completeOnboarding()">Continue</button>
  </div>
</div>

<!-- HOME SCREEN -->
<div id="screen-home" class="screen">
  <div class="hero-logo-wrapper">
    <div class="hero-bubble"></div>
  </div>

  <h2 id="ui_homeWelcome" class="welcome-title">Welcome back!</h2>
  <p id="ui_homeSubtitle" class="welcome-sub">Lend a hand and make a difference today.</p>

  <!-- SEARCH BAR -->
  <div class="search-bar">
    <input list="locationList" id="homeLocation" placeholder="Location" onchange="updateLanguageFromLocation()">

    <datalist id="locationList">
      <option>Ottawa</option>
      <option>Toronto</option>
      <option>Montreal</option>
      <option>Vancouver</option>
      <option>Calgary</option>
      <option>New York</option>
      <option>Los Angeles</option>
      <option>Chicago</option>
      <option>Houston</option>
      <option>Paris</option>
      <option>Berlin</option>
      <option>Madrid</option>
      <option>Rome</option>
      <option>Amsterdam</option>
      <option>Stockholm</option>
      <option>Oslo</option>
      <option>Copenhagen</option>
      <option>Helsinki</option>
      <option>Tokyo</option>
      <option>Seoul</option>
      <option>Beijing</option>
      <option>Shanghai</option>
      <option>Taipei</option>
      <option>Hong Kong</option>
      <option>Bangkok</option>
      <option>New Delhi</option>
      <option>Mexico City</option>
      <option>São Paulo</option>
      <option>Buenos Aires</option>
      <option>Dubai</option>
      <option>Riyadh</option>
      <option>Cairo</option>
    </datalist>

    <select id="homeCategory">
      <option id="ui_catAll">All Categories</option>
      <option id="ui_catYard">Yard Work</option>
      <option id="ui_catTech">Tech Help</option>
      <option id="ui_catErrands">Errands</option>
      <option id="ui_catPet">Pet Care</option>
    </select>

    <button id="ui_searchBtn" class="btn primary" onclick="navigateTo('search')">Search</button>
  </div>

  <!-- CATEGORY ICONS -->
  <div class="category-row">
    <div class="cat-item" onclick="quickCategory('yard')" id="ui_catYard2">🌿 Yard Work</div>
    <div class="cat-item" onclick="quickCategory('tech')" id="ui_catTech2">💻 Tech Help</div>
    <div class="cat-item" onclick="quickCategory('errands')" id="ui_catErrands2">🛒 Errands</div>
    <div class="cat-item" onclick="quickCategory('pet')" id="ui_catPet2">🐶 Pet Care</div>
  </div>

  <!-- POPULAR TASKS -->
  <h3 id="ui_popularTasks" class="section-title">Popular Tasks for You</h3>
  <div id="homePopular" class="task-grid"></div>

  <!-- HOURS BANNER -->
  <div class="hours-banner">
    <h3 id="ui_hoursBannerTitle">Track Your Volunteer Hours & Earn Rewards!</h3>
    <p id="ui_hoursBannerText">Build your resume for the future.</p>
    <button id="ui_hoursBannerBtn" class="btn primary" onclick="navigateTo('hours')">Get Started</button>
  </div>
</div>

<!-- SEARCH SCREEN -->
<div id="screen-search" class="screen">
  <h2 id="ui_searchTitle">Search Tasks</h2>
  <input id="searchInput" placeholder="Search…" oninput="liveSearch()">
  <p id="searchStatus" class="muted"></p>
  <div id="searchResults" class="task-grid"></div>
</div>

<!-- MESSAGES SCREEN -->
<div id="screen-messages" class="screen">
  <h2 id="ui_messagesTitle">Messages</h2>
  <div id="chat" class="chat-box"></div>

  <div class="chat-input-row">
    <input id="chatInput" placeholder="Type a message…">
    <button id="ui_sendBtn" class="btn primary" onclick="sendMsg()">Send</button>
  </div>
</div>

<!-- HOURS SCREEN -->
<div id="screen-hours" class="screen">
  <h2 id="ui_hoursTitle">Your Volunteer Hours</h2>
  <div id="hoursList"></div>
  <button id="ui_exportHoursBtn" class="btn primary" onclick="exportVolunteerHours()">Export Hours</button>
</div>

<!-- PROFILE SCREEN -->
<div id="screen-profile" class="screen">
  <h2 id="ui_profileTitle">Your Profile</h2>

  <div id="profilePfp" class="pfp"></div>

  <p><strong id="ui_nameLabel">Name:</strong> <span id="pName"></span></p>
  <p><strong id="ui_usernameLabel">Username:</strong> <span id="pUsername"></span></p>
  <p><strong id="ui_emailLabel">Email:</strong> <span id="pEmail"></span></p>
  <p><strong id="ui_roleLabel">Role:</strong> <span id="pRole"></span></p>
  <p><strong id="ui_verifiedLabel">Verified:</strong> <span id="pVerified"></span></p>
  <p id="pRank" class="muted"></p>

  <h3 id="ui_editProfileTitle">Edit Profile</h3>
  <input id="peName" placeholder="Name">
  <input id="peUsername" placeholder="Username">
  <input id="setEmail" placeholder="Email">
  <select id="peRole">
    <option value="helper">Helper</option>
    <option value="senior">Senior</option>
  </select>

  <label class="checkbox-row">
    <input type="checkbox" id="peVerified">
    <span id="ui_verifiedToggleLabel">Verified account</span>
  </label>

  <button id="ui_saveBtn" class="btn primary" onclick="saveSettings()">Save</button>
</div>

<!-- TASK DETAILS SCREEN -->
<div id="screen-task" class="screen">
  <button id="ui_backBtn" class="btn secondary" onclick="navigateBack()">Back</button>

  <div class="img-wrapper">
    <div class="shimmer"></div>
    <img id="tdImg" class="task-img" onload="this.classList.add('loaded')">
  </div>

  <h2 id="tdTitle"></h2>
  <p id="tdDesc"></p>

  <p><strong id="ui_payLabel">Pay:</strong> <span id="tdPay"></span></p>
  <p><strong id="ui_seniorLabel">Senior:</strong> <span id="tdSenior"></span></p>
  <p><strong id="ui_categoryLabel">Category:</strong> <span id="tdCat"></span></p>
  <p><strong id="ui_difficultyLabel">Difficulty:</strong> <span id="tdDiff"></span></p>
  <p><strong id="ui_timeLabel">Time:</strong> <span id="tdTime"></span></p>
</div>

<!-- BOTTOM NAV -->
<div id="bottomNav" class="bottom-nav hidden">
  <div class="nav-item" onclick="navigateTo('home')">
    <svg class="nav-icon" viewBox="0 0 24 24">
      <path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/>
    </svg>
    <span id="ui_navHome">Home</span>
  </div>

  <div class="nav-item" onclick="navigateTo('search')">
    <svg class="nav-icon" viewBox="0 0 24 24">
      <path d="M10 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm11 20-6-6"/>
    </svg>
    <span id="ui_navSearch">Search</span>
  </div>

  <div class="nav-item" onclick="navigateTo('messages')">
    <svg class="nav-icon" viewBox="0 0 24 24">
      <path d="M4 4h16v12H7l-3 3V4z"/>
    </svg>
    <span id="ui_navMessages">Messages</span>
  </div>

  <div class="nav-item" onclick="navigateTo('hours')">
    <svg class="nav-icon" viewBox="0 0 24 24">
      <path d="M12 1a11 11 0 1 1 0 22 11 11 0 0 1 0-22zm0 5v6l4 2"/>
    </svg>
    <span id="ui_navHours">Hours</span>
  </div>

  <div class="nav-item" onclick="navigateTo('profile')">
    <svg class="nav-icon" viewBox="0 0 24 24">
      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5z"/>
    </svg>
    <span id="ui_navProfile">Profile</span>
  </div>
</div>

<script src="script.js"></script>
</body>
</html>
