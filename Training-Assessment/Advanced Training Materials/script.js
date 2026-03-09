/**
 * XPath Advanced Practice Paper — script.js
 * Paper 2: HTML/DOM & Advanced Web Concepts for Automation
 *
 * HOW TO EDIT:
 *   type: "write" → candidate types the XPath
 *   type: "mcq"   → candidate picks A / B / C / D
 *   answers[]     → ALL accepted correct answers (write questions)
 *   correct       → letter of the correct MCQ option
 *   explanation   → shown in feedback to reinforce the concept
 *
 * ANSWER KEY is in a SEPARATE file: answer-key.html
 * Do NOT share answer-key.html with candidates.
 */

const questions = [

  /* ═══════════════════════════════════════════════════════════════════════
     SECTION 1 — ADVANCED XPATH FUNCTIONS
  ═══════════════════════════════════════════════════════════════════════ */

  /* ── Q1 ── normalize-space() ─────────────────────────────────────────── */
  {
    id: 1,
    topic: "normalize-space() Function",
    type: "write",
    snippet: `<div class="checkout-panel">
  <button id="placeOrder">
    Place   Order
  </button>
  <button id="cancelOrder">Cancel</button>
</div>`,
    question: "The <strong>Place Order</strong> button text has extra spaces and line breaks inside it. Write an XPath using <code>normalize-space()</code> to reliably locate this button.",
    answers: [
      "//button[normalize-space()='Place Order']",
      "//button[normalize-space(text())='Place Order']",
      "//button[normalize-space(.)='Place Order']",
      "//div[@class='checkout-panel']/button[normalize-space()='Place Order']"
    ],
    explanation: "normalize-space() strips leading/trailing whitespace and collapses internal spaces, making it perfect for buttons or labels that have dynamic whitespace in their text."
  },

  /* ── Q2 ── not() predicate ───────────────────────────────────────────── */
  {
    id: 2,
    topic: "not() Predicate",
    type: "mcq",
    snippet: `<form id="profileForm">
  <input type="text"  id="fname"  placeholder="First Name">
  <input type="text"  id="lname"  placeholder="Last Name"  disabled>
  <input type="email" id="email"  placeholder="Email">
  <input type="tel"   id="phone"  placeholder="Phone"      disabled>
</form>`,
    question: "Which XPath selects only the input fields that are <strong>not disabled</strong>?",
    options: {
      A: "//input[@disabled=false]",
      B: "//input[not(@disabled)]",
      C: "//input[@enabled]",
      D: "//input[disable()=false]"
    },
    correct: "B",
    explanation: "not(@disabled) checks that the disabled attribute does not exist on the element. @disabled=false is incorrect because the attribute value is not 'false' — its mere presence means disabled."
  },

  /* ── Q3 ── XPath Union operator | ───────────────────────────────────── */
  {
    id: 3,
    topic: "XPath Union Operator ( | )",
    type: "write",
    snippet: `<div class="modal-footer">
  <button type="submit"  class="btn-primary">Confirm</button>
  <button type="reset"   class="btn-secondary">Reset</button>
  <a href="/help"        class="btn-link">Help</a>
</div>`,
    question: "Write a <strong>single XPath expression</strong> using the union operator <code>|</code> to select <em>both</em> the <strong>Confirm button</strong> and the <strong>Help link</strong> together.",
    answers: [
      "//button[@type='submit'] | //a[@href='/help']",
      "//button[text()='Confirm'] | //a[text()='Help']",
      "//button[@class='btn-primary'] | //a[@class='btn-link']",
      "//button[normalize-space()='Confirm'] | //a[normalize-space()='Help']"
    ],
    explanation: "The | operator creates a union of two node-sets. It is the only set operator in XPath 1.0 and is widely used to locate multiple unrelated elements in one driver call."
  },

  /* ── Q4 ── translate() — case-insensitive match ──────────────────────── */
  {
    id: 4,
    topic: "translate() — Case-Insensitive Search",
    type: "mcq",
    snippet: `<nav class="main-menu">
  <a href="/dashboard">DASHBOARD</a>
  <a href="/reports">Reports</a>
  <a href="/settings">settings</a>
</nav>`,
    question: "You need to find the <strong>Dashboard</strong> link regardless of whether its text is upper, lower, or mixed case. Which XPath uses <code>translate()</code> to achieve case-insensitive matching?",
    options: {
      A: "//a[lower-case(text())='dashboard']",
      B: "//a[text()='dashboard' or text()='DASHBOARD']",
      C: "//a[translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='dashboard']",
      D: "//a[normalize-space()='dashboard']"
    },
    correct: "C",
    explanation: "translate() replaces each character in the first argument that appears in the second argument with the corresponding character from the third argument. This converts text to lowercase for a case-insensitive comparison. lower-case() is XPath 2.0 and not supported in all automation drivers."
  },

  /* ── Q5 ── count() function ──────────────────────────────────────────── */
  {
    id: 5,
    topic: "count() Function",
    type: "write",
    snippet: `<table id="ordersTable">
  <thead>
    <tr>
      <th>Order ID</th><th>Customer</th><th>Amount</th><th>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>1001</td><td>Alice</td><td>$120</td><td>Shipped</td></tr>
    <tr><td>1002</td><td>Bob</td>  <td>$85</td> <td>Pending</td></tr>
    <tr><td>1003</td><td>Carol</td><td>$200</td><td>Shipped</td></tr>
  </tbody>
</table>`,
    question: "Write an XPath expression using <code>count()</code> to return the total number of <strong>data rows</strong> (tbody rows only, not the header row) in this table.",
    answers: [
      "count(//table[@id='ordersTable']/tbody/tr)",
      "count(//table[@id='ordersTable']//tbody/tr)",
      "count(//tbody/tr)",
      "count(//table/tbody/tr)"
    ],
    explanation: "count() returns the number of nodes in a node-set. Using tbody/tr specifically targets only data rows, excluding the thead row."
  },

  /* ── Q6 ── string-length() function ──────────────────────────────────── */
  {
    id: 6,
    topic: "string-length() Function",
    type: "write",
    snippet: `<ul id="productList">
  <li data-sku="AB">Short SKU</li>
  <li data-sku="XYZABC123">Long SKU</li>
  <li data-sku="MN">Short SKU</li>
</ul>`,
    question: "Write an XPath using <code>string-length()</code> to select all list items whose <code>data-sku</code> attribute has a length <strong>greater than 4 characters</strong>.",
    answers: [
      "//li[string-length(@data-sku) > 4]",
      "//ul[@id='productList']/li[string-length(@data-sku) > 4]",
      "//ul/li[string-length(@data-sku) > 4]"
    ],
    explanation: "string-length() returns the number of characters in a string. It works on attribute values, text nodes, or any string expression."
  },

  /* ═══════════════════════════════════════════════════════════════════════
     SECTION 2 — MODERN HTML ATTRIBUTES (DATA-* AND ARIA)
  ═══════════════════════════════════════════════════════════════════════ */

  /* ── Q7 ── data-testid ───────────────────────────────────────────────── */
  {
    id: 7,
    topic: "data-testid — Test Automation Attribute",
    type: "write",
    snippet: `<div class="login-container">
  <input data-testid="email-input"    type="email"    placeholder="Email">
  <input data-testid="password-input" type="password" placeholder="Password">
  <button data-testid="login-submit"  type="submit">Sign In</button>
</div>`,
    question: "The developer has added <code>data-testid</code> attributes specifically for automation. Write an XPath to locate the <strong>Sign In button</strong> using its <code>data-testid</code> value.",
    answers: [
      "//button[@data-testid='login-submit']",
      "//*[@data-testid='login-submit']",
      "//button[@data-testid='login-submit'][@type='submit']"
    ],
    explanation: "data-testid is a best-practice custom attribute added by developers purely for test automation. It is stable, does not change with styling or layout changes, and is the recommended locator strategy."
  },

  /* ── Q8 ── data-cy (Cypress style) ──────────────────────────────────── */
  {
    id: 8,
    topic: "data-cy — Cypress-Style Test Attribute",
    type: "mcq",
    snippet: `<form data-cy="signup-form">
  <input data-cy="name-field"    type="text"  placeholder="Full Name">
  <input data-cy="email-field"   type="email" placeholder="Email Address">
  <select data-cy="country-select">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </select>
  <button data-cy="signup-submit">Create Account</button>
</form>`,
    question: "Which XPath correctly locates the <strong>country dropdown</strong> using its <code>data-cy</code> attribute?",
    options: {
      A: "//select[data-cy='country-select']",
      B: "//select[@data-cy='country-select']",
      C: "//select[@data='country-select']",
      D: "//select[cy='country-select']"
    },
    correct: "B",
    explanation: "Custom data-* attributes are accessed with the @ prefix just like standard attributes. The syntax is always //tag[@attribute-name='value']. Forgetting @ is a very common mistake."
  },

  /* ── Q9 ── aria-label ────────────────────────────────────────────────── */
  {
    id: 9,
    topic: "ARIA — aria-label Attribute",
    type: "write",
    snippet: `<header class="app-header">
  <button aria-label="Open navigation menu" class="hamburger-btn">
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
    <span class="icon-bar"></span>
  </button>
  <button aria-label="Search" class="search-btn">
    <svg><!-- search icon --></svg>
  </button>
  <button aria-label="Close dialog" class="close-btn">✕</button>
</header>`,
    question: "Icon buttons often have no visible text. Write an XPath to locate the <strong>Close dialog button</strong> using its <code>aria-label</code> attribute.",
    answers: [
      "//button[@aria-label='Close dialog']",
      "//header//button[@aria-label='Close dialog']",
      "//*[@aria-label='Close dialog']"
    ],
    explanation: "aria-label provides an accessible name for elements that have no visible text. In automation, it is a very reliable locator for icon-only buttons, image buttons, and SVG controls."
  },

  /* ── Q10 ── aria-placeholder ─────────────────────────────────────────── */
  {
    id: 10,
    topic: "ARIA — aria-placeholder Attribute",
    type: "mcq",
    snippet: `<div class="custom-input-wrapper">
  <div
    role="textbox"
    aria-placeholder="Search for products..."
    aria-label="Product search"
    contenteditable="true"
    id="searchBox">
  </div>
  <button aria-label="Run search">Search</button>
</div>`,
    question: "This is a custom search box built with a <code>div</code> instead of an <code>input</code>. Which XPath reliably locates it using <code>aria-placeholder</code>?",
    options: {
      A: "//input[@placeholder='Search for products...']",
      B: "//div[@aria-placeholder='Search for products...']",
      C: "//div[@placeholder='Search for products...']",
      D: "//*[text()='Search for products...']"
    },
    correct: "B",
    explanation: "Custom UI components built with divs/spans use ARIA attributes instead of native HTML attributes. aria-placeholder is the ARIA equivalent of the HTML placeholder attribute."
  },

  /* ── Q11 ── aria-expanded (Accordion) ───────────────────────────────── */
  {
    id: 11,
    topic: "ARIA — aria-expanded (Accordion / Dropdown)",
    type: "write",
    snippet: `<div class="accordion">
  <button class="acc-header" aria-expanded="true"  aria-controls="panel1">Billing Details</button>
  <div id="panel1" class="acc-panel"><!-- content --></div>

  <button class="acc-header" aria-expanded="false" aria-controls="panel2">Shipping Address</button>
  <div id="panel2" class="acc-panel hidden"><!-- content --></div>

  <button class="acc-header" aria-expanded="false" aria-controls="panel3">Payment Method</button>
  <div id="panel3" class="acc-panel hidden"><!-- content --></div>
</div>`,
    question: "Write an XPath to select the accordion header button that is currently <strong>expanded</strong> (open).",
    answers: [
      "//button[@aria-expanded='true']",
      "//button[@class='acc-header'][@aria-expanded='true']",
      "//button[contains(@class,'acc-header') and @aria-expanded='true']"
    ],
    explanation: "aria-expanded='true' indicates the controlled region is currently visible/open. This is commonly used for accordions, dropdowns, and tree nodes. In automation you can assert this attribute to verify open/closed state."
  },

  /* ── Q12 ── aria-selected (Tabs) ─────────────────────────────────────── */
  {
    id: 12,
    topic: "ARIA — aria-selected (Tab Panels)",
    type: "mcq",
    snippet: `<div role="tablist" aria-label="Report Tabs">
  <button role="tab" aria-selected="true"  id="tab-summary">Summary</button>
  <button role="tab" aria-selected="false" id="tab-detail">Detail</button>
  <button role="tab" aria-selected="false" id="tab-export">Export</button>
</div>`,
    question: "Which XPath selects the tab that is <strong>currently active / selected</strong>?",
    options: {
      A: "//button[@role='tab'][@active='true']",
      B: "//button[@aria-selected='true']",
      C: "//button[@selected='true']",
      D: "//button[@role='tab'][1]"
    },
    correct: "B",
    explanation: "aria-selected='true' indicates the currently active tab. Never use [1] as the active tab can change. Asserting aria-selected='true' after clicking a tab is a standard way to verify tab switching."
  },

  /* ── Q13 ── aria-checked (Custom Checkbox) ──────────────────────────── */
  {
    id: 13,
    topic: "ARIA — aria-checked (Custom Checkbox / Toggle)",
    type: "write",
    snippet: `<div class="settings-panel">
  <div role="checkbox" aria-checked="true"  tabindex="0" data-setting="notifications">
    Email Notifications
  </div>
  <div role="checkbox" aria-checked="false" tabindex="0" data-setting="sms">
    SMS Alerts
  </div>
  <div role="checkbox" aria-checked="true"  tabindex="0" data-setting="newsletter">
    Newsletter
  </div>
</div>`,
    question: "Write an XPath to select <strong>all custom checkbox divs that are currently checked</strong> (aria-checked='true').",
    answers: [
      "//*[@role='checkbox'][@aria-checked='true']",
      "//div[@role='checkbox'][@aria-checked='true']",
      "//div[@aria-checked='true']",
      "//*[@aria-checked='true']"
    ],
    explanation: "Custom checkboxes built with div/span elements use role='checkbox' and aria-checked to communicate state. In automation, verify checked state with @aria-checked='true' rather than @checked, which only works on native inputs."
  },

  /* ═══════════════════════════════════════════════════════════════════════
     SECTION 3 — SPECIAL INPUT STATES
  ═══════════════════════════════════════════════════════════════════════ */

  /* ── Q14 ── Hidden input ─────────────────────────────────────────────── */
  {
    id: 14,
    topic: "Hidden Input Fields",
    type: "mcq",
    snippet: `<form id="paymentForm" action="/pay" method="POST">
  <input type="hidden" name="csrf_token"   value="x9aK3mZ...">
  <input type="hidden" name="session_id"   value="sess_abc123">
  <input type="hidden" name="amount_cents" value="4999">
  <button type="submit">Pay $49.99</button>
</form>`,
    question: "Which XPath locates the hidden input that stores the <strong>CSRF token</strong>?",
    options: {
      A: "//input[@type='hidden' and @name='csrf_token']",
      B: "//input[@hidden and @name='csrf_token']",
      C: "//hidden[@name='csrf_token']",
      D: "//input[@display='none' and @name='csrf_token']"
    },
    correct: "A",
    explanation: "Hidden inputs use type='hidden'. They are in the DOM and locatable by XPath even though invisible. Reading their values (e.g. CSRF token, session ID) is useful in security and integration testing."
  },

  /* ── Q15 ── Disabled elements ────────────────────────────────────────── */
  {
    id: 15,
    topic: "Disabled Elements",
    type: "write",
    snippet: `<div class="wizard-nav">
  <button id="btnBack"   type="button" disabled>← Back</button>
  <button id="btnNext"   type="button">Next →</button>
  <button id="btnSubmit" type="submit" disabled>Submit</button>
</div>`,
    question: "Write an XPath to select <strong>all buttons that are currently disabled</strong> in this wizard navigation bar.",
    answers: [
      "//button[@disabled]",
      "//div[@class='wizard-nav']/button[@disabled]",
      "//button[@disabled='disabled']",
      "//div//button[@disabled]"
    ],
    explanation: "The disabled attribute is a boolean attribute. @disabled (existence check) is the most reliable selector. @disabled='disabled' also works in HTML5 but the attribute value may vary."
  },

  /* ── Q16 ── Read-only inputs ─────────────────────────────────────────── */
  {
    id: 16,
    topic: "Read-Only Input Fields",
    type: "write",
    snippet: `<form class="user-profile">
  <input type="text"  id="username"   value="john_doe"         readonly>
  <input type="email" id="email"      value="john@example.com" readonly>
  <input type="text"  id="department" value="Engineering">
  <input type="tel"   id="phone"      value="+1-555-0100">
</form>`,
    question: "Write an XPath to select <strong>only the read-only</strong> input fields in this user profile form.",
    answers: [
      "//input[@readonly]",
      "//form[@class='user-profile']//input[@readonly]",
      "//input[@readonly='readonly']"
    ],
    explanation: "readonly is a boolean HTML attribute. Use @readonly to check its presence. Read-only fields are present in the DOM and can be interacted with (e.g. scrolled, copied) but their value cannot be changed by the user."
  },

  /* ── Q17 ── File upload ──────────────────────────────────────────────── */
  {
    id: 17,
    topic: "File Upload Input",
    type: "write",
    snippet: `<div class="upload-section">
  <label for="avatarUpload">Profile Picture</label>
  <input type="file" id="avatarUpload"
         name="avatar"
         accept="image/png, image/jpeg"
         data-testid="avatar-file-input">

  <label for="resumeUpload">Upload Resume</label>
  <input type="file" id="resumeUpload"
         name="resume"
         accept=".pdf,.doc,.docx"
         data-testid="resume-file-input">
</div>`,
    question: "Write an XPath to locate the <strong>resume file upload</strong> input field using its <code>name</code> attribute.",
    answers: [
      "//input[@type='file'][@name='resume']",
      "//input[@name='resume']",
      "//input[@type='file' and @name='resume']",
      "//input[@data-testid='resume-file-input']"
    ],
    explanation: "File inputs (type='file') are located the same way as other inputs. In Selenium you interact with them using sendKeys('/path/to/file') to set the file path directly — you do not click Open on the OS dialog."
  },

  /* ═══════════════════════════════════════════════════════════════════════
     SECTION 4 — COMPLEX DOM STRUCTURES
  ═══════════════════════════════════════════════════════════════════════ */

  /* ── Q18 ── Select > Option dropdown ────────────────────────────────── */
  {
    id: 18,
    topic: "Select Dropdown — Option by Value",
    type: "mcq",
    snippet: `<div class="field-group">
  <label for="roleSelect">Assign Role</label>
  <select id="roleSelect" name="role">
    <option value="">-- Select Role --</option>
    <option value="viewer">Viewer</option>
    <option value="editor">Editor</option>
    <option value="admin">Administrator</option>
    <option value="owner">Owner</option>
  </select>
</div>`,
    question: "Which XPath locates the <strong>Administrator option</strong> inside the role dropdown?",
    options: {
      A: "//select[@id='roleSelect']/option[text()='Administrator']",
      B: "//select[@id='roleSelect']/option[@value='admin']",
      C: "//option[@value='admin']",
      D: "All of the above are valid"
    },
    correct: "D",
    explanation: "All three are valid XPaths. Option A finds by visible text, B by value attribute, C by value from anywhere on page. In Selenium however, you use the Select class (Select.selectByValue / selectByVisibleText) rather than clicking individual option elements directly."
  },

  /* ── Q19 ── Table — cell by column header ────────────────────────────── */
  {
    id: 19,
    topic: "Table — Select Cell by Column Header Name",
    type: "write",
    snippet: `<table id="inventoryTable">
  <thead>
    <tr>
      <th>Item</th>
      <th>Category</th>
      <th>Stock</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Wireless Mouse</td>
      <td>Electronics</td>
      <td>142</td>
      <td>$29.99</td>
    </tr>
    <tr>
      <td>USB-C Hub</td>
      <td>Electronics</td>
      <td>57</td>
      <td>$49.99</td>
    </tr>
  </tbody>
</table>`,
    question: "Write an XPath to select the <strong>Price cell</strong> from the row where the <strong>Item is 'USB-C Hub'</strong>. The column position must be determined dynamically from the header name.",
    answers: [
      "//tr[td[1][text()='USB-C Hub']]/td[count(//th[text()='Price']/preceding-sibling::th)+1]",
      "//tbody/tr[td[text()='USB-C Hub']]/td[4]",
      "//tr[td[text()='USB-C Hub']]/td[last()]"
    ],
    explanation: "The dynamic version uses count(//th[text()='Price']/preceding-sibling::th)+1 to calculate the column index. This is robust even if columns are reordered. The hardcoded td[4] works but breaks if column order changes."
  },

  /* ── Q20 ── contenteditable (Rich Text Editor) ──────────────────────── */
  {
    id: 20,
    topic: "contenteditable — Rich Text Editor",
    type: "mcq",
    snippet: `<div class="composer">
  <div class="toolbar">
    <button data-cmd="bold">B</button>
    <button data-cmd="italic">I</button>
  </div>
  <div id="editorBody"
       role="textbox"
       contenteditable="true"
       aria-label="Message body"
       aria-multiline="true"
       class="editor-area">
  </div>
</div>`,
    question: "This is a rich text editor built with a <code>div</code>. Which XPath is the <strong>most reliable</strong> way to locate the editable area?",
    options: {
      A: "//div[@id='editorBody']",
      B: "//div[@contenteditable='true']",
      C: "//div[@aria-label='Message body']",
      D: "All of the above are valid and reliable"
    },
    correct: "D",
    explanation: "All three work. In practice, prefer data-testid > aria-label > id > contenteditable attribute for stability. contenteditable='true' alone would match ANY rich editor on the page if there were multiple."
  },

  /* ── Q21 ── SVG elements ─────────────────────────────────────────────── */
  {
    id: 21,
    topic: "SVG Elements — local-name()",
    type: "write",
    snippet: `<div class="chart-container">
  <svg id="barChart" width="400" height="300" role="img" aria-label="Sales Chart">
    <g class="bars">
      <rect class="bar" x="10" y="50" width="40" height="150" fill="#4a90e2"/>
      <rect class="bar" x="60" y="80" width="40" height="120" fill="#4a90e2"/>
    </g>
    <text x="200" y="290" text-anchor="middle">Monthly Sales</text>
  </svg>
</div>`,
    question: "SVG elements are in a different XML namespace. Write an XPath using <code>local-name()</code> to locate the <strong>SVG element</strong> by its id <code>barChart</code>.",
    answers: [
      "//*[local-name()='svg'][@id='barChart']",
      "//*[@id='barChart']",
      "//svg[@id='barChart']"
    ],
    explanation: "SVG elements exist in the SVG namespace (http://www.w3.org/2000/svg). Using local-name()='svg' or //* ignores namespace and works reliably in browsers. //svg may or may not work depending on the driver's namespace handling."
  },

  /* ═══════════════════════════════════════════════════════════════════════
     SECTION 5 — MODERN FRAMEWORK PATTERNS & ADVANCED COMBINATIONS
  ═══════════════════════════════════════════════════════════════════════ */

  /* ── Q22 ── React / data-* custom attributes ────────────────────────── */
  {
    id: 22,
    topic: "React / Framework — Custom data-* Attributes",
    type: "mcq",
    snippet: `<div data-reactroot="">
  <ul data-component="TodoList">
    <li data-index="0" data-completed="false" data-id="todo_1">Buy groceries</li>
    <li data-index="1" data-completed="true"  data-id="todo_2">Send report</li>
    <li data-index="2" data-completed="false" data-id="todo_3">Book flight</li>
  </ul>
</div>`,
    question: "Which XPath selects all to-do items that are <strong>not yet completed</strong> based on their <code>data-completed</code> attribute?",
    options: {
      A: "//li[@data-completed='false']",
      B: "//li[not(@data-completed)]",
      C: "//li[@completed='false']",
      D: "//li[@data-completed=false]"
    },
    correct: "A",
    explanation: "data-* attribute values are always strings in the DOM. Use @data-completed='false' (string comparison), NOT @data-completed=false (number/boolean comparison which will not work as expected in XPath 1.0)."
  },

  /* ── Q23 ── Wildcard * and @* ────────────────────────────────────────── */
  {
    id: 23,
    topic: "Wildcard * and @* (Any Element / Any Attribute)",
    type: "write",
    snippet: `<section class="user-card">
  <div class="card-header">
    <img src="/avatars/alice.png" alt="Alice">
    <h3>Alice Johnson</h3>
  </div>
  <div class="card-body">
    <span data-field="email">alice@example.com</span>
    <span data-field="role">Administrator</span>
    <span data-field="joined">2022-03-15</span>
  </div>
</section>`,
    question: "Write an XPath using the <code>*</code> wildcard and <code>@data-field</code> to select <strong>any element</strong> (regardless of tag name) that has <code>data-field='role'</code>.",
    answers: [
      "//*[@data-field='role']",
      "//section//*[@data-field='role']",
      "//div[@class='card-body']//*[@data-field='role']"
    ],
    explanation: "The * wildcard matches any element tag name. //*[@data-field='role'] selects the span without needing to know it is a span. This is especially useful when the tag may change between implementations."
  },

  /* ── Q24 ── not(contains()) combination ─────────────────────────────── */
  {
    id: 24,
    topic: "not( contains() ) — Exclude Elements by Partial Class",
    type: "mcq",
    snippet: `<nav class="breadcrumb">
  <a href="/home"     class="crumb-link">Home</a>
  <a href="/products" class="crumb-link">Products</a>
  <a href="/laptops"  class="crumb-link">Laptops</a>
  <span               class="crumb-link crumb-active">Dell XPS 15</span>
</nav>`,
    question: "You want to select all breadcrumb items that are <strong>links</strong>, but <strong>exclude</strong> the active (current page) item. Which XPath correctly excludes elements whose class contains <code>crumb-active</code>?",
    options: {
      A: "//nav[@class='breadcrumb']/a[not(@class='crumb-active')]",
      B: "//*[@class='crumb-link'][not(contains(@class,'crumb-active'))]",
      C: "//a[not(@class contains 'crumb-active')]",
      D: "//a[@class='crumb-link']"
    },
    correct: "B",
    explanation: "not(contains(@class,'crumb-active')) excludes any element whose class attribute contains that substring. Option A uses exact match which would fail because the active span has 'crumb-link crumb-active' (two classes). Option D selects only exact class match 'crumb-link' — this also works for the links but misses the span."
  },

  /* ── Q25 ── Complex multi-predicate with axes ────────────────────────── */
  {
    id: 25,
    topic: "Complex Multi-Predicate — Axes + Functions Combined",
    type: "write",
    snippet: `<div class="form-section">
  <div class="field-group has-error">
    <label for="cardNum">Card Number</label>
    <input type="text" id="cardNum" value="1234" aria-invalid="true">
    <span class="error-msg">Card number must be 16 digits.</span>
  </div>
  <div class="field-group">
    <label for="expiry">Expiry Date</label>
    <input type="text" id="expiry" value="12/26" aria-invalid="false">
  </div>
  <div class="field-group has-error">
    <label for="cvv">CVV</label>
    <input type="text" id="cvv" value="12" aria-invalid="true">
    <span class="error-msg">CVV must be 3 digits.</span>
  </div>
</div>`,
    question: "Write an XPath to find <strong>all error message spans</strong> inside field groups that contain an input with <code>aria-invalid='true'</code>. Use a combination of axes and predicates.",
    answers: [
      "//div[contains(@class,'field-group')][input[@aria-invalid='true']]/span[@class='error-msg']",
      "//div[@class='field-group has-error']/span[@class='error-msg']",
      "//div[contains(@class,'has-error')]/span[contains(@class,'error-msg')]",
      "//input[@aria-invalid='true']/following-sibling::span[@class='error-msg']"
    ],
    explanation: "This combines: contains(@class,'field-group') to match the container, a child predicate [input[@aria-invalid='true']] to filter only groups with invalid inputs, then /span[@class='error-msg'] to reach the error text. The following-sibling version is equally valid and elegant."
  }

];

/* ═══════════════════════════════════════════════════════════════════════════
   STATE
═══════════════════════════════════════════════════════════════════════════ */
let currentIndex = 0;
let score        = 0;
let results      = Array(questions.length).fill(null);
let checked      = Array(questions.length).fill(false);

/* ═══════════════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  buildQuestions();
  showQuestion(0);
  updateProgressBar();
});

/* ═══════════════════════════════════════════════════════════════════════════
   BUILD ALL QUESTION CARDS
═══════════════════════════════════════════════════════════════════════════ */
function buildQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  questions.forEach((q, idx) => {
    const card = document.createElement("div");
    card.className = "question-card hidden";
    card.id = `qcard-${idx}`;

    const header = `
      <div class="q-header">
        <span class="q-number">Question ${q.id} of ${questions.length}</span>
        <span class="q-topic">${q.topic}</span>
      </div>`;

    const snippet = `
      <div class="snippet-label">HTML Snippet</div>
      <pre class="code-block"><code>${escapeHtml(q.snippet)}</code></pre>`;

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

    const feedback = `<div class="feedback hidden" id="feedback-${idx}"></div>`;

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

function goNext(idx) { showQuestion(idx + 1); }

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
  questions.forEach((_, idx) => {
    if (!checked[idx]) { results[idx] = "wrong"; }  // unanswered = wrong for scoring
  });

  const total   = questions.length;
  const correct = results.filter(r => r === "correct").length;
  const wrong   = total - correct;
  const pct     = Math.round((correct / total) * 100);

  document.getElementById("questionsContainer").classList.add("hidden");
  document.getElementById("stepNav").classList.add("hidden");
  document.getElementById("progressWrap").classList.add("hidden");

  const rs = document.getElementById("resultSection");
  rs.classList.remove("hidden");

  document.getElementById("res-total").textContent   = total;
  document.getElementById("res-correct").textContent = correct;
  document.getElementById("res-wrong").textContent   = wrong;
  document.getElementById("res-pct").textContent     = pct + "%";

  let msg = "", cls = "";
  if (pct === 100)    { msg = "🏆 Outstanding! You have mastered advanced XPath.";            cls = "perf-excellent"; }
  else if (pct >= 80) { msg = "✅ Excellent grasp of advanced web automation concepts.";       cls = "perf-good"; }
  else if (pct >= 60) { msg = "📘 Good foundation. Revisit ARIA and DOM structure concepts."; cls = "perf-average"; }
  else                { msg = "📖 Keep going — these are advanced topics. Review and retry."; cls = "perf-low"; }

  const msgEl = document.getElementById("performanceMsg");
  msgEl.textContent = msg;
  msgEl.className   = "perf-msg " + cls;

  rs.scrollIntoView({ behavior: "smooth" });
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
  document.getElementById("progressBar").style.width    = pct + "%";
  document.getElementById("progressLabel").textContent  = `${answered} / ${questions.length} answered`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════════════════════ */
function showFeedback(el, type, html) {
  el.innerHTML  = html;
  el.className  = `feedback feedback-${type}`;
  el.classList.remove("hidden");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
