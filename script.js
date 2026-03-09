/**
 * XPath Practice Question Paper
 * script.js
 * 
 * How to edit:
 *  - Add new questions to the `questions` array below
 *  - type: "write"  → user types the XPath
 *  - type: "mcq"    → user picks from options A/B/C/D
 *  - answers[]      → list of all accepted correct answers (trimmed, case-sensitive for XPath)
 *  - correct        → for MCQ, the letter of the correct option e.g. "B"
 */

const questions = [

  /* ── Q1 ── Relative XPath / Input by ID ─────────────────────────────── */
  {
    id: 1,
    topic: "Relative XPath — Input field",
    type: "write",
    snippet: `<form id="loginForm">
  <label for="username">Username</label>
  <input type="text" id="username" name="userName">
  <label for="password">Password</label>
  <input type="password" id="password" name="password">
  <button type="submit">Login</button>
</form>`,
    question: "Write an XPath to select the <strong>username</strong> input field.",
    answers: [
      "//input[@id='username']",
      "//input[@name='userName']",
      "//form[@id='loginForm']//input[@type='text']",
      "//input[@type='text'][@id='username']"
    ]
  },

  /* ── Q2 ── Absolute XPath ────────────────────────────────────────────── */
  {
    id: 2,
    topic: "Absolute XPath",
    type: "mcq",
    snippet: `<html>
  <body>
    <div>
      <form>
        <input type="text" id="email">
      </form>
    </div>
  </body>
</html>`,
    question: "Which of the following is a valid <strong>absolute XPath</strong> to reach the email input?",
    options: {
      A: "/html/body/div/form/input",
      B: "//form/input[@id='email']",
      C: "//input[@id='email']",
      D: "/body/div/form/input"
    },
    correct: "A"
  },

  /* ── Q3 ── Select by attribute (type) ───────────────────────────────── */
  {
    id: 3,
    topic: "Select by Attribute",
    type: "write",
    snippet: `<div class="actions">
  <button type="submit">Login</button>
  <button type="button">Cancel</button>
</div>`,
    question: "Write an XPath to select <strong>only the submit button</strong> using its <code>type</code> attribute.",
    answers: [
      "//button[@type='submit']",
      "//div[@class='actions']/button[@type='submit']",
      "//div/button[@type='submit']"
    ]
  },

  /* ── Q4 ── text() function ───────────────────────────────────────────── */
  {
    id: 4,
    topic: "Select by text()",
    type: "mcq",
    snippet: `<div class="actions">
  <button type="submit">Login</button>
  <button type="button">Cancel</button>
</div>`,
    question: "Pick the correct XPath to click the <strong>Login button</strong> by its visible text.",
    options: {
      A: "//button[@type='Login']",
      B: "//button[text()='Login']",
      C: "//div[text()='Login']",
      D: "//button[@class='Login']"
    },
    correct: "B"
  },

  /* ── Q5 ── contains() on class ──────────────────────────────────────── */
  {
    id: 5,
    topic: "contains() — Class attribute",
    type: "write",
    snippet: `<div class="nav-menu primary-nav">
  <a href="/home">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</div>`,
    question: "The navigation div has a dynamic class that always <strong>contains</strong> the word <em>nav-menu</em>. Write an XPath to select this div.",
    answers: [
      "//div[contains(@class,'nav-menu')]",
      "//div[contains(@class, 'nav-menu')]",
      "//div[contains(@class,'primary-nav')]",
      "//div[contains(@class, 'primary-nav')]"
    ]
  },

  /* ── Q6 ── starts-with() ────────────────────────────────────────────── */
  {
    id: 6,
    topic: "starts-with() — Dynamic IDs",
    type: "mcq",
    snippet: `<table>
  <tr>
    <td id="row_001">Alice</td>
    <td id="row_002">Bob</td>
    <td id="row_003">Charlie</td>
  </tr>
</table>`,
    question: "The <code>id</code> values are dynamic but always <strong>start with</strong> <code>row_</code>. Which XPath selects all such cells?",
    options: {
      A: "//td[@id='row_']",
      B: "//td[contains(@id,'row')]",
      C: "//td[starts-with(@id,'row_')]",
      D: "//td[@id starts-with 'row_']"
    },
    correct: "C"
  },

  /* ── Q7 ── AND condition ─────────────────────────────────────────────── */
  {
    id: 7,
    topic: "AND condition",
    type: "write",
    snippet: `<form id="signupForm">
  <input type="text" name="firstName" placeholder="First Name">
  <input type="text" name="lastName"  placeholder="Last Name">
  <input type="email" name="email"    placeholder="Email">
  <input type="submit" value="Register">
</form>`,
    question: "Write an XPath to select the input that has <strong>both</strong> <code>type='text'</code> <strong>and</strong> <code>name='firstName'</code>.",
    answers: [
      "//input[@type='text' and @name='firstName']",
      "//input[@name='firstName' and @type='text']",
      "//form//input[@type='text' and @name='firstName']"
    ]
  },

  /* ── Q8 ── OR condition ──────────────────────────────────────────────── */
  {
    id: 8,
    topic: "OR condition",
    type: "write",
    snippet: `<form id="registerForm">
  <input type="text"     id="username" placeholder="Username">
  <input type="password" id="password" placeholder="Password">
  <input type="email"    id="email"    placeholder="Email">
</form>`,
    question: "Write an XPath to select inputs whose type is <strong>either</strong> <code>text</code> <strong>or</strong> <code>email</code> using the <code>or</code> operator.",
    answers: [
      "//input[@type='text' or @type='email']",
      "//form//input[@type='text' or @type='email']",
      "//form[@id='registerForm']//input[@type='text' or @type='email']"
    ]
  },

  /* ── Q9 ── Indexing ──────────────────────────────────────────────────── */
  {
    id: 9,
    topic: "Indexing",
    type: "write",
    snippet: `<ul id="menuList">
  <li>Dashboard</li>
  <li>Reports</li>
  <li>Settings</li>
  <li>Logout</li>
</ul>`,
    question: "Write an XPath to select the <strong>third</strong> list item (Settings) using index.",
    answers: [
      "//ul[@id='menuList']/li[3]",
      "(//li)[3]",
      "//ul/li[3]"
    ]
  },

  /* ── Q10 ── last() ───────────────────────────────────────────────────── */
  {
    id: 10,
    topic: "last() function",
    type: "mcq",
    snippet: `<ul id="steps">
  <li>Step 1: Fill form</li>
  <li>Step 2: Review</li>
  <li>Step 3: Submit</li>
</ul>`,
    question: "Which XPath selects the <strong>last</strong> list item regardless of how many items exist?",
    options: {
      A: "//ul/li[3]",
      B: "//ul/li[@last]",
      C: "//ul/li[last()]",
      D: "//ul/li[position()=end()]"
    },
    correct: "C"
  },

  /* ── Q11 ── position() ───────────────────────────────────────────────── */
  {
    id: 11,
    topic: "position() function",
    type: "write",
    snippet: `<table id="dataTable">
  <tr><td>Row 1</td></tr>
  <tr><td>Row 2</td></tr>
  <tr><td>Row 3</td></tr>
</table>`,
    question: "Write an XPath to select the <strong>second</strong> <code>&lt;tr&gt;</code> using the <code>position()</code> function.",
    answers: [
      "//table[@id='dataTable']/tr[position()=2]",
      "//tr[position()=2]",
      "//table/tr[position()=2]"
    ]
  },

  /* ── Q12 ── parent axis ──────────────────────────────────────────────── */
  {
    id: 12,
    topic: "parent:: axis",
    type: "mcq",
    snippet: `<div class="form-group">
  <label for="city">City</label>
  <input type="text" id="city" name="city">
</div>`,
    question: "You have located the input <code>id='city'</code>. Which XPath navigates to its <strong>parent</strong> div?",
    options: {
      A: "//input[@id='city']/ancestor::div",
      B: "//input[@id='city']/parent::div",
      C: "//input[@id='city']/../div",
      D: "//div/child::input[@id='city']"
    },
    correct: "B"
  },

  /* ── Q13 ── child axis ───────────────────────────────────────────────── */
  {
    id: 13,
    topic: "child:: axis",
    type: "write",
    snippet: `<nav id="topNav">
  <a href="/home">Home</a>
  <a href="/profile">Profile</a>
  <a href="/logout">Logout</a>
</nav>`,
    question: "Write an XPath using the <code>child::</code> axis to select all <code>&lt;a&gt;</code> elements inside <code>nav#topNav</code>.",
    answers: [
      "//nav[@id='topNav']/child::a",
      "//nav[@id='topNav']/a"
    ]
  },

  /* ── Q14 ── ancestor axis ────────────────────────────────────────────── */
  {
    id: 14,
    topic: "ancestor:: axis",
    type: "write",
    snippet: `<div id="wrapper">
  <section class="content">
    <form id="contactForm">
      <input type="text" id="fullName">
    </form>
  </section>
</div>`,
    question: "Starting from the input <code>id='fullName'</code>, write an XPath using <code>ancestor::</code> to reach the <strong>div#wrapper</strong>.",
    answers: [
      "//input[@id='fullName']/ancestor::div[@id='wrapper']",
      "//input[@id='fullName']/ancestor::div"
    ]
  },

  /* ── Q15 ── descendant axis ──────────────────────────────────────────── */
  {
    id: 15,
    topic: "descendant:: axis",
    type: "mcq",
    snippet: `<div id="sidebar">
  <ul>
    <li><a href="/page1">Page 1</a></li>
    <li><a href="/page2">Page 2</a></li>
  </ul>
</div>`,
    question: "Which XPath uses the <code>descendant::</code> axis to select <strong>all links</strong> inside <code>div#sidebar</code>?",
    options: {
      A: "//div[@id='sidebar']//a",
      B: "//div[@id='sidebar']/descendant::a",
      C: "//div[@id='sidebar']/child::a",
      D: "//div[@id='sidebar']/following::a"
    },
    correct: "B"
  },

  /* ── Q16 ── following-sibling axis ───────────────────────────────────── */
  {
    id: 16,
    topic: "following-sibling:: axis",
    type: "write",
    snippet: `<div class="field-row">
  <label for="dob">Date of Birth</label>
  <input type="date" id="dob" name="dob">
</div>`,
    question: "You know the label <code>for='dob'</code>. Write an XPath using <code>following-sibling::</code> to reach the input next to it.",
    answers: [
      "//label[@for='dob']/following-sibling::input",
      "//label[@for='dob']/following-sibling::input[@id='dob']"
    ]
  },

  /* ── Q17 ── preceding-sibling axis ──────────────────────────────────── */
  {
    id: 17,
    topic: "preceding-sibling:: axis",
    type: "mcq",
    snippet: `<tr>
  <td>Product Name</td>
  <td>Quantity</td>
  <td class="price">$49.99</td>
</tr>`,
    question: "You are on the <code>td.price</code> cell. Which XPath selects the <strong>cell that comes before it</strong> (Quantity)?",
    options: {
      A: "//td[@class='price']/preceding::td",
      B: "//td[@class='price']/preceding-sibling::td[1]",
      C: "//td[@class='price']/parent::td",
      D: "//td[@class='price']/ancestor::td"
    },
    correct: "B"
  },

  /* ── Q18 ── following axis ───────────────────────────────────────────── */
  {
    id: 18,
    topic: "following:: axis",
    type: "write",
    snippet: `<div id="page">
  <h2 id="sectionA">Section A</h2>
  <p>Some intro text.</p>
  <h2 id="sectionB">Section B</h2>
  <p>More content here.</p>
</div>`,
    question: "Write an XPath using the <code>following::</code> axis to select all elements that appear after <code>h2#sectionA</code>.",
    answers: [
      "//h2[@id='sectionA']/following::*",
      "//h2[@id='sectionA']/following::node()"
    ]
  },

  /* ── Q19 ── preceding axis ───────────────────────────────────────────── */
  {
    id: 19,
    topic: "preceding:: axis",
    type: "write",
    snippet: `<form id="checkoutForm">
  <input type="text"   id="cardName"   placeholder="Name on Card">
  <input type="text"   id="cardNumber" placeholder="Card Number">
  <input type="submit" id="payBtn"     value="Pay Now">
</form>`,
    question: "Write an XPath using the <code>preceding::</code> axis to select <strong>all elements</strong> that appear before the submit input <code>id='payBtn'</code>.",
    answers: [
      "//input[@id='payBtn']/preceding::*",
      "//input[@value='Pay Now']/preceding::*",
      "//input[@id='payBtn']/preceding::input"
    ]
  },

  /* ── Q20 ── self axis ────────────────────────────────────────────────── */
  {
    id: 20,
    topic: "self:: axis",
    type: "write",
    snippet: `<button id="saveBtn" class="btn-primary" type="button">Save</button>`,
    question: "Write an XPath using the <code>self::</code> axis to select the button element itself when you are already on it (starting from <code>//button[@id='saveBtn']</code>).",
    answers: [
      "//button[@id='saveBtn']/self::button",
      "//button[@id='saveBtn']/self::*"
    ]
  },

  /* ── Q21 ── Checkbox ─────────────────────────────────────────────────── */
  {
    id: 21,
    topic: "Checkboxes",
    type: "mcq",
    snippet: `<div class="preferences">
  <input type="checkbox" id="chk_news"   name="subscribe" value="news">
  <label for="chk_news">Newsletter</label>
  <input type="checkbox" id="chk_offers" name="subscribe" value="offers">
  <label for="chk_offers">Special Offers</label>
</div>`,
    question: "Which XPath selects <strong>all checkbox inputs</strong> inside the preferences div?",
    options: {
      A: "//div[@class='preferences']//input[@type='check']",
      B: "//div[@class='preferences']//input[@type='checkbox']",
      C: "//div//checkbox",
      D: "//input[contains(@id,'chk')][@type]"
    },
    correct: "B"
  },

  /* ── Q22 ── Table row by text ────────────────────────────────────────── */
  {
    id: 22,
    topic: "Tables — Row selection",
    type: "write",
    snippet: `<table id="userTable">
  <thead>
    <tr><th>Name</th><th>Role</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>Alice</td><td>Admin</td><td>Active</td></tr>
    <tr><td>Bob</td>  <td>User</td> <td>Inactive</td></tr>
    <tr><td>Carol</td><td>User</td> <td>Active</td></tr>
  </tbody>
</table>`,
    question: "Write an XPath to select the <strong>entire table row</strong> that contains the name <em>Bob</em>.",
    answers: [
      "//tr[td[text()='Bob']]",
      "//table[@id='userTable']//tr[td[text()='Bob']]",
      "//tbody/tr[td[text()='Bob']]"
    ]
  },

  /* ── Q23 ── Link by partial text ─────────────────────────────────────── */
  {
    id: 23,
    topic: "Links — contains() on text",
    type: "mcq",
    snippet: `<footer>
  <a href="/privacy-policy">Privacy Policy</a>
  <a href="/terms-of-service">Terms of Service</a>
  <a href="/contact-us">Contact Us</a>
</footer>`,
    question: "Which XPath selects the link whose text <strong>contains</strong> the word <em>Privacy</em>?",
    options: {
      A: "//a[text()='Privacy']",
      B: "//a[@href='Privacy']",
      C: "//a[contains(text(),'Privacy')]",
      D: "//a[starts-with(@href,'Privacy')]"
    },
    correct: "C"
  },

  /* ── Q24 ── Label associated with input ──────────────────────────────── */
  {
    id: 24,
    topic: "Labels and Inputs",
    type: "write",
    snippet: `<div class="form-group">
  <label for="phoneNumber">Phone</label>
  <input type="tel" id="phoneNumber" name="phone" placeholder="+1 000 000 0000">
</div>`,
    question: "Write an XPath to find the <strong>input field</strong> by locating its associated label text <em>Phone</em> and then navigating to the input.",
    answers: [
      "//label[text()='Phone']/following-sibling::input",
      "//label[contains(text(),'Phone')]/following-sibling::input",
      "//input[@id='phoneNumber']"
    ]
  },

  /* ── Q25 ── Nested spans / Dynamic ID ────────────────────────────────── */
  {
    id: 25,
    topic: "Dynamic IDs — Nested spans",
    type: "mcq",
    snippet: `<div class="product-card">
  <span class="product-title">
    <span class="badge new-badge">NEW</span>
    Wireless Headphones
  </span>
  <span class="product-price">$89.99</span>
  <button id="addToCart_8472" class="add-btn">Add to Cart</button>
</div>`,
    question: "The button ID is dynamic (e.g. <code>addToCart_8472</code>). Which XPath <strong>reliably</strong> targets this button regardless of the number?",
    options: {
      A: "//button[@id='addToCart_8472']",
      B: "//button[contains(@id,'addToCart_')]",
      C: "//button[@class and @id]",
      D: "//div/button[last()]"
    },
    correct: "B"
  }
];

/* ═══════════════════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════════════════ */
let currentIndex = 0;
let score        = 0;
let results      = Array(questions.length).fill(null); // null | 'correct' | 'wrong'
let checked      = Array(questions.length).fill(false);

/* ═══════════════════════════════════════════════════════════════════════════
   INIT — build question cards dynamically
═══════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  buildQuestions();
  showQuestion(0);
  updateProgressBar();
});

function buildQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  questions.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "question-card hidden";
    card.id = `qcard-${idx}`;

    /* ── Header ── */
    const header = `
      <div class="q-header">
        <span class="q-number">Question ${q.id} of ${questions.length}</span>
        <span class="q-topic">${q.topic}</span>
      </div>`;

    /* ── Snippet ── */
    const snippet = `
      <div class="snippet-label">HTML Snippet</div>
      <pre class="code-block"><code>${escapeHtml(q.snippet)}</code></pre>`;

    /* ── Question text ── */
    const qtext = `<p class="q-text">${q.question}</p>`;

    /* ── Answer area ── */
    let answerArea = "";
    if (q.type === "write") {
      answerArea = `
        <div class="answer-area">
          <label class="ans-label" for="input-${idx}">Your XPath:</label>
          <input type="text" id="input-${idx}" class="xpath-input"
                 placeholder="Type your XPath expression here..."
                 autocomplete="off" spellcheck="false">
        </div>`;
    } else {
      let opts = "";
      ["A","B","C","D"].forEach(letter => {
        opts += `
          <label class="option-label" id="opt-label-${idx}-${letter}">
            <input type="radio" name="mcq-${idx}" value="${letter}" id="opt-${idx}-${letter}">
            <span class="opt-letter">${letter}.</span>
            <code class="opt-code">${escapeHtml(q.options[letter])}</code>
          </label>`;
      });
      answerArea = `<div class="options-group" id="opts-${idx}">${opts}</div>`;
    }

    /* ── Feedback ── */
    const feedback = `<div class="feedback hidden" id="feedback-${idx}"></div>`;

    /* ── Buttons ── */
    const buttons = `
      <div class="btn-row">
        <button class="btn btn-check" onclick="checkAnswer(${idx})">Check Answer</button>
        ${idx < questions.length - 1
          ? `<button class="btn btn-next" id="next-${idx}" onclick="goNext(${idx})" disabled>Next →</button>`
          : `<button class="btn btn-submit" id="submit-btn" onclick="submitAll()" disabled>Submit All</button>`
        }
      </div>`;

    card.innerHTML = header + snippet + qtext + answerArea + feedback + buttons;
    container.appendChild(card);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════════════════════ */
function showQuestion(idx) {
  document.querySelectorAll(".question-card").forEach(c => c.classList.add("hidden"));
  const card = document.getElementById(`qcard-${idx}`);
  if (card) {
    card.classList.remove("hidden");
    card.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  currentIndex = idx;
  updateProgressBar();
  updateStepNav();
}

function goNext(idx) {
  showQuestion(idx + 1);
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHECK ANSWER
═══════════════════════════════════════════════════════════════════════════ */
function checkAnswer(idx) {
  // If already answered correctly, do nothing
  if (checked[idx]) return;

  const q          = questions[idx];
  const feedbackEl = document.getElementById(`feedback-${idx}`);
  const nextBtn    = document.getElementById(`next-${idx}`);
  const submitBtn  = document.getElementById("submit-btn");

  let isCorrect = false;

  /* ── Write questions ── */
  if (q.type === "write") {
    const inputEl = document.getElementById(`input-${idx}`);
    const userVal = inputEl.value.trim();

    if (!userVal) {
      showFeedback(feedbackEl, "warn", "⚠ Please enter your XPath before checking.");
      return;
    }

    isCorrect = q.answers.some(a => a.trim() === userVal);

    if (isCorrect) {
      // Lock and move on
      inputEl.disabled = true;
      showFeedback(feedbackEl, "correct", "✔ Correct!");
      checked[idx] = true;
      results[idx] = "correct";
      score++;
      if (nextBtn)   nextBtn.disabled   = false;
      if (submitBtn) submitBtn.disabled = false;
      updateStepNav();
    } else {
      // Wrong – keep input open, no answer revealed
      showFeedback(feedbackEl, "wrong", "✘ Incorrect. Please try again.");
    }

  /* ── MCQ questions ── */
  } else {
    const selected = document.querySelector(`input[name="mcq-${idx}"]:checked`);

    if (!selected) {
      showFeedback(feedbackEl, "warn", "⚠ Please select an option before checking.");
      return;
    }

    isCorrect = selected.value === q.correct;

    if (isCorrect) {
      // Lock radios and highlight correct option
      document.querySelectorAll(`input[name="mcq-${idx}"]`).forEach(r => r.disabled = true);
      ["A","B","C","D"].forEach(letter => {
        const lbl = document.getElementById(`opt-label-${idx}-${letter}`);
        if (letter === q.correct) lbl.classList.add("opt-correct");
      });
      showFeedback(feedbackEl, "correct", "✔ Correct!");
      checked[idx] = true;
      results[idx] = "correct";
      score++;
      if (nextBtn)   nextBtn.disabled   = false;
      if (submitBtn) submitBtn.disabled = false;
      updateStepNav();
    } else {
      // Wrong – keep radios open, clear selection, no answer revealed
      document.querySelectorAll(`input[name="mcq-${idx}"]`).forEach(r => r.checked = false);
      showFeedback(feedbackEl, "wrong", "✘ Incorrect. Please try again.");
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   SUBMIT ALL
═══════════════════════════════════════════════════════════════════════════ */
function submitAll() {
  // Treat any skipped (unanswered) questions as wrong in the final score
  questions.forEach((_, idx) => {
    if (!checked[idx]) {
      results[idx] = "wrong";   // unanswered = wrong for scoring purposes
      checked[idx] = false;     // still not locked (no retry needed at end)
    }
  });

  const total   = questions.length;
  const correct = results.filter(r => r === "correct").length;
  const wrong   = total - correct;
  const pct     = Math.round((correct / total) * 100);

  // Hide question area
  document.getElementById("questionsContainer").classList.add("hidden");
  document.getElementById("stepNav").classList.add("hidden");
  document.getElementById("progressWrap").classList.add("hidden");

  // Show result
  const resultSection = document.getElementById("resultSection");
  resultSection.classList.remove("hidden");

  document.getElementById("res-total").textContent   = total;
  document.getElementById("res-correct").textContent = correct;
  document.getElementById("res-wrong").textContent   = wrong;
  document.getElementById("res-pct").textContent     = pct + "%";

  // Performance message
  let msg = "", msgClass = "";
  if (pct === 100)      { msg = "🏆 Perfect score! Excellent work.";              msgClass = "perf-excellent"; }
  else if (pct >= 80)   { msg = "✅ Great job! You have a strong XPath foundation."; msgClass = "perf-good"; }
  else if (pct >= 60)   { msg = "📘 Good effort. Review the missed questions.";   msgClass = "perf-average"; }
  else                  { msg = "📖 Keep practising — XPath mastery takes time."; msgClass = "perf-low"; }

  const msgEl = document.getElementById("performanceMsg");
  msgEl.textContent  = msg;
  msgEl.className    = "perf-msg " + msgClass;

  resultSection.scrollIntoView({ behavior: "smooth" });
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESET
═══════════════════════════════════════════════════════════════════════════ */
function resetAll() {
  currentIndex = 0;
  score        = 0;
  results      = Array(questions.length).fill(null);
  checked      = Array(questions.length).fill(false);

  document.getElementById("resultSection").classList.add("hidden");
  document.getElementById("questionsContainer").classList.remove("hidden");
  document.getElementById("stepNav").classList.remove("hidden");
  document.getElementById("progressWrap").classList.remove("hidden");

  buildQuestions();
  showQuestion(0);
  updateProgressBar();
}

/* ═══════════════════════════════════════════════════════════════════════════
   STEP NAVIGATOR
═══════════════════════════════════════════════════════════════════════════ */
function updateStepNav() {
  const nav = document.getElementById("stepNav");
  nav.innerHTML = "";
  questions.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.textContent = idx + 1;
    btn.className   = "step-btn";
    if (idx === currentIndex)          btn.classList.add("step-active");
    if (results[idx] === "correct")    btn.classList.add("step-correct");
    else if (results[idx] === "wrong") btn.classList.add("step-wrong");
    btn.onclick = () => showQuestion(idx);
    nav.appendChild(btn);
  });
}

/* ═══════════════════════════════════════════════════════════════════════════
   PROGRESS BAR
═══════════════════════════════════════════════════════════════════════════ */
function updateProgressBar() {
  const answered = checked.filter(Boolean).length;
  const pct      = Math.round((answered / questions.length) * 100);
  document.getElementById("progressBar").style.width  = pct + "%";
  document.getElementById("progressLabel").textContent = `${answered} / ${questions.length} answered`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════════ */
function showFeedback(el, type, html) {
  el.innerHTML   = html;
  el.className   = `feedback feedback-${type}`;
  el.classList.remove("hidden");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
