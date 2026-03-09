/* ═══════════════════════════════════════════════════════════════════════════
   Playwright Interview Practice — script.js
   ─────────────────────────────────────────────────────────────────────────
   HOW TO ADD / EDIT QUESTIONS
   ────────────────────────────
   Each question object has:
     id       : unique number
     type     : "write" | "mcq"
     topic    : short topic label
     snippet  : HTML markup shown to candidate (use HTML entities for < >)
     question : the question text
     hint     : optional placeholder hint inside textarea

   For type:"write":
     answers  : { js: [[kw1,kw2,...], ...], ts: [...], py: [...] }
                Each inner array is ONE accepted pattern.
                ALL keywords in that array must appear in the submitted code
                (case-insensitive). ANY one matching pattern = correct.

   For type:"mcq":
     options  : { A:"...", B:"...", C:"...", D:"..." }
     correct  : "A" | "B" | "C" | "D"
   ═══════════════════════════════════════════════════════════════════════════ */

"use strict";

/* ── State ────────────────────────────────────────────────────────────────── */
let currentLang   = localStorage.getItem("pw_lang") || "";
let currentIndex  = 0;
let checked       = [];   // true once correctly answered
let results       = [];   // "correct" | "wrong" | undefined
let score         = 0;

/* ═══════════════════════════════════════════════════════════════════════════
   QUESTION BANK  (50 questions: 35 write-type, 15 MCQ)
═══════════════════════════════════════════════════════════════════════════ */
const questions = [

  /* ── Q01 ─ Navigate & Assert Title ──────────────────────────────────────── */
  {
    id: 1, type: "write", topic: "Navigation & Assertions",
    snippet: `&lt;!-- Target page --&gt;\n&lt;head&gt;&lt;title&gt;Dashboard | MyApp&lt;/title&gt;&lt;/head&gt;\n&lt;body&gt;\n  &lt;h1 class="page-title"&gt;Welcome to Dashboard&lt;/h1&gt;\n&lt;/body&gt;`,
    question: "Navigate to 'https://example.com/dashboard', assert the page title equals 'Dashboard | MyApp', and assert the h1 text contains 'Welcome to Dashboard'.",
    hint: "// Use page.goto(), expect(page).toHaveTitle(), expect(locator).toContainText()",
    answers: {
      js: [["goto","toHaveTitle","Dashboard"],["goto","title()","Dashboard"]],
      ts: [["goto","toHaveTitle","Dashboard"],["goto","title()","Dashboard"]],
      py: [["goto","expect","to_have_title","Dashboard"],["goto","title()","Dashboard"]]
    }
  },

  /* ── Q02 ─ Fill form & Click Submit ─────────────────────────────────────── */
  {
    id: 2, type: "write", topic: "Form Fill & Submit",
    snippet: `&lt;form id="login-form"&gt;\n  &lt;input type="text"  name="username" placeholder="Username" /&gt;\n  &lt;input type="password" name="password" placeholder="Password" /&gt;\n  &lt;button type="submit" data-testid="login-btn"&gt;Login&lt;/button&gt;\n&lt;/form&gt;`,
    question: "Fill the username field with 'admin', password with 'Secret123', then click the Login button (use data-testid locator). Assert the page URL contains '/home' after login.",
    hint: "// getByPlaceholder / fill / getByTestId / click / toHaveURL",
    answers: {
      js: [["fill","admin","Secret123","login-btn","click"],["getByPlaceholder","admin","Secret123","getByTestId","click"]],
      ts: [["fill","admin","Secret123","login-btn","click"],["getByPlaceholder","admin","Secret123","getByTestId","click"]],
      py: [["fill","admin","Secret123","login-btn","click"],["get_by_placeholder","admin","Secret123","get_by_test_id","click"]]
    }
  },

  /* ── Q03 ─ Network Intercept / Route ────────────────────────────────────── */
  {
    id: 3, type: "write", topic: "Network Interception",
    snippet: `&lt;!-- App makes GET /api/users on load --&gt;\n&lt;div id="user-list"&gt;&lt;!-- populated by API --&gt;&lt;/div&gt;`,
    question: "Intercept all GET requests to '**/api/users' and mock the response with JSON body: [{\"id\":1,\"name\":\"Alice\"}] and status 200. Then navigate to the page and assert '#user-list' is visible.",
    hint: "// page.route() / route.fulfill() / JSON body",
    answers: {
      js: [["route","api/users","fulfill","Alice"],["route","api/users","fulfill","200"]],
      ts: [["route","api/users","fulfill","Alice"],["route","api/users","fulfill","200"]],
      py: [["route","api/users","fulfill","Alice"],["route","api/users","fulfill","200"]]
    }
  },

  /* ── Q04 ─ Handle Alert Dialog ──────────────────────────────────────────── */
  {
    id: 4, type: "write", topic: "Dialog Handling",
    snippet: `&lt;button onclick="alert('Confirm deletion?')"&gt;Delete Account&lt;/button&gt;`,
    question: "Click the 'Delete Account' button. Before clicking, set up a handler that automatically accepts the alert dialog and captures its message. Assert the captured message equals 'Confirm deletion?'.",
    hint: "// page.on('dialog', ...) / dialog.accept() / dialog.message()",
    answers: {
      js: [["on","dialog","accept","message","Confirm deletion"]],
      ts: [["on","dialog","accept","message","Confirm deletion"]],
      py: [["on","dialog","accept","message","Confirm deletion"]]
    }
  },

  /* ── Q05 ─ iFrame Interaction ───────────────────────────────────────────── */
  {
    id: 5, type: "write", topic: "iFrame Handling",
    snippet: `&lt;iframe src="/payment-widget" name="payment-frame"&gt;&lt;/iframe&gt;\n&lt;!-- Inside iframe: --&gt;\n&lt;input id="card-number" placeholder="Card Number" /&gt;\n&lt;button id="pay-btn"&gt;Pay Now&lt;/button&gt;`,
    question: "Locate the iframe named 'payment-frame', type '4111111111111111' into the card number field inside the iframe, then click the 'Pay Now' button inside the same iframe.",
    hint: "// page.frameLocator() / .fill() inside frame",
    answers: {
      js: [["frameLocator","payment-frame","card-number","4111111111111111","pay-btn"],["frameLocator","payment","fill","4111"]],
      ts: [["frameLocator","payment-frame","card-number","4111111111111111","pay-btn"],["frameLocator","payment","fill","4111"]],
      py: [["frame_locator","payment","fill","4111"],["frame_locator","payment-frame","4111111111111111"]]
    }
  },

  /* ── Q06 ─ Multiple Tabs / New Page ─────────────────────────────────────── */
  {
    id: 6, type: "write", topic: "Multi-Tab Handling",
    snippet: `&lt;a href="https://docs.example.com" target="_blank" id="docs-link"&gt;Open Docs&lt;/a&gt;`,
    question: "Click the 'Open Docs' link which opens in a new tab. Switch to the new tab, assert its URL contains 'docs.example.com', then close it and return focus to the original page.",
    hint: "// context.waitForEvent('page') / newPage.waitForLoadState()",
    answers: {
      js: [["waitForEvent","page","docs.example.com","close"],["context","waitForEvent","page","url"]],
      ts: [["waitForEvent","page","docs.example.com","close"],["context","waitForEvent","page","url"]],
      py: [["wait_for_event","page","docs.example.com","close"],["context","wait_for_event","page","url"]]
    }
  },

  /* ── Q07 ─ File Upload ──────────────────────────────────────────────────── */
  {
    id: 7, type: "write", topic: "File Upload",
    snippet: `&lt;input type="file" id="avatar-upload" accept="image/*" /&gt;\n&lt;button id="upload-btn"&gt;Upload Avatar&lt;/button&gt;\n&lt;p id="upload-status"&gt;&lt;/p&gt;`,
    question: "Upload a file at path './fixtures/avatar.png' to the file input. Click the Upload button. Assert that the '#upload-status' element has text 'Upload successful'.",
    hint: "// locator.setInputFiles() for file upload",
    answers: {
      js: [["setInputFiles","avatar.png","upload-btn","upload-status"],["setInputFiles","avatar","click","Upload"]],
      ts: [["setInputFiles","avatar.png","upload-btn","upload-status"],["setInputFiles","avatar","click","Upload"]],
      py: [["set_input_files","avatar.png","upload-btn"],["set_input_files","avatar","click","Upload"]]
    }
  },

  /* ── Q08 ─ Drag and Drop ────────────────────────────────────────────────── */
  {
    id: 8, type: "write", topic: "Drag & Drop",
    snippet: `&lt;div id="drag-item" draggable="true"&gt;Drag Me&lt;/div&gt;\n&lt;div id="drop-zone"&gt;Drop Here&lt;/div&gt;`,
    question: "Drag the '#drag-item' element and drop it onto '#drop-zone'. After the drop, assert '#drop-zone' contains the text 'Drag Me'.",
    hint: "// locator.dragTo() is the simplest approach",
    answers: {
      js: [["dragTo","drag-item","drop-zone"],["drag_to","drag","drop"]],
      ts: [["dragTo","drag-item","drop-zone"],["drag_to","drag","drop"]],
      py: [["drag_to","drag-item","drop-zone"],["drag_to","drag","drop"]]
    }
  },

  /* ── Q09 ─ Keyboard Shortcuts ───────────────────────────────────────────── */
  {
    id: 9, type: "write", topic: "Keyboard Actions",
    snippet: `&lt;div id="editor" contenteditable="true"&gt;\n  Some editable content here\n&lt;/div&gt;\n&lt;span id="copy-hint"&gt;&lt;/span&gt;`,
    question: "Click the '#editor' div to focus it, select all text using Ctrl+A (or Meta+A on Mac), copy with Ctrl+C, then press Escape. Assert the editor element is focused.",
    hint: "// locator.press() / 'Control+A' / 'Control+C'",
    answers: {
      js: [["press","Control+A","Control+C"],["keyboard","press","Control"]],
      ts: [["press","Control+A","Control+C"],["keyboard","press","Control"]],
      py: [["press","Control+A","Control+C"],["keyboard","press","Control"]]
    }
  },

  /* ── Q10 ─ Hover & Tooltip ──────────────────────────────────────────────── */
  {
    id: 10, type: "write", topic: "Hover & Tooltip",
    snippet: `&lt;button id="info-btn" title="Click for help"&gt;\n  ?\n&lt;/button&gt;\n&lt;div class="tooltip" role="tooltip"&gt;Click for help&lt;/div&gt;`,
    question: "Hover over '#info-btn'. After hovering, assert that the tooltip element (role='tooltip') is visible and contains the text 'Click for help'.",
    hint: "// locator.hover() / getByRole('tooltip') / toBeVisible()",
    answers: {
      js: [["hover","tooltip","Click for help","toBeVisible"],["hover","info-btn","tooltip","visible"]],
      ts: [["hover","tooltip","Click for help","toBeVisible"],["hover","info-btn","tooltip","visible"]],
      py: [["hover","tooltip","Click for help","to_be_visible"],["hover","info-btn","tooltip","visible"]]
    }
  },

  /* ── Q11 ─ Select Dropdown ──────────────────────────────────────────────── */
  {
    id: 11, type: "write", topic: "Select / Dropdown",
    snippet: `&lt;label for="country"&gt;Country&lt;/label&gt;\n&lt;select id="country" name="country"&gt;\n  &lt;option value="us"&gt;United States&lt;/option&gt;\n  &lt;option value="uk"&gt;United Kingdom&lt;/option&gt;\n  &lt;option value="au"&gt;Australia&lt;/option&gt;\n&lt;/select&gt;`,
    question: "Select 'Australia' from the country dropdown by its value 'au'. Then assert the selected option text is 'Australia'.",
    hint: "// locator.selectOption({ value: 'au' })",
    answers: {
      js: [["selectOption","au","Australia"],["select_option","au","Australia"]],
      ts: [["selectOption","au","Australia"],["select_option","au","Australia"]],
      py: [["select_option","au","Australia"],["select_option","au"]]
    }
  },

  /* ── Q12 ─ Assert Element Count ─────────────────────────────────────────── */
  {
    id: 12, type: "write", topic: "Assertions — Count",
    snippet: `&lt;ul id="product-list"&gt;\n  &lt;li class="product-item"&gt;Product A&lt;/li&gt;\n  &lt;li class="product-item"&gt;Product B&lt;/li&gt;\n  &lt;li class="product-item"&gt;Product C&lt;/li&gt;\n  &lt;li class="product-item"&gt;Product D&lt;/li&gt;\n  &lt;li class="product-item"&gt;Product E&lt;/li&gt;\n&lt;/ul&gt;`,
    question: "Assert that there are exactly 5 elements with class 'product-item' on the page.",
    hint: "// expect(locator).toHaveCount(5)",
    answers: {
      js: [["toHaveCount","5","product-item"],["toHaveCount","product-item","5"]],
      ts: [["toHaveCount","5","product-item"],["toHaveCount","product-item","5"]],
      py: [["to_have_count","5","product-item"],["to_have_count","product-item","5"]]
    }
  },

  /* ── Q13 ─ Extract Table Data ───────────────────────────────────────────── */
  {
    id: 13, type: "write", topic: "Table Data Extraction",
    snippet: `&lt;table id="data-table"&gt;\n  &lt;thead&gt;&lt;tr&gt;&lt;th&gt;Name&lt;/th&gt;&lt;th&gt;Score&lt;/th&gt;&lt;/tr&gt;&lt;/thead&gt;\n  &lt;tbody&gt;\n    &lt;tr&gt;&lt;td&gt;Alice&lt;/td&gt;&lt;td&gt;95&lt;/td&gt;&lt;/tr&gt;\n    &lt;tr&gt;&lt;td&gt;Bob&lt;/td&gt;&lt;td&gt;82&lt;/td&gt;&lt;/tr&gt;\n  &lt;/tbody&gt;\n&lt;/table&gt;`,
    question: "Extract all text from the first column (Name) of '#data-table' and store in an array. Assert the array equals ['Alice', 'Bob'].",
    hint: "// locator.allTextContents() / page.$$eval()",
    answers: {
      js: [["allTextContents","Alice","Bob"],["allInnerTexts","Alice","Bob"],["$$eval","Alice","Bob"]],
      ts: [["allTextContents","Alice","Bob"],["allInnerTexts","Alice","Bob"]],
      py: [["all_text_contents","Alice","Bob"],["all_inner_texts","Alice","Bob"]]
    }
  },

  /* ── Q14 ─ Wait for API Response ────────────────────────────────────────── */
  {
    id: 14, type: "write", topic: "waitForResponse",
    snippet: `&lt;button id="load-data"&gt;Load Users&lt;/button&gt;\n&lt;div id="users-container"&gt;&lt;/div&gt;\n&lt;!-- Clicking the button triggers GET /api/users --&gt;`,
    question: "Click the 'Load Users' button and simultaneously wait for the network response from '**/api/users'. Assert the response status is 200 and the response body (JSON) has a property 'data'.",
    hint: "// Promise.all([page.waitForResponse(), locator.click()])",
    answers: {
      js: [["waitForResponse","api/users","click","status","200"],["Promise.all","waitForResponse","click"]],
      ts: [["waitForResponse","api/users","click","status","200"],["Promise.all","waitForResponse","click"]],
      py: [["wait_for_response","api/users","click","status"],["expect_response","api/users","click"]]
    }
  },

  /* ── Q15 ─ Soft Assertions ──────────────────────────────────────────────── */
  {
    id: 15, type: "write", topic: "Soft Assertions",
    snippet: `&lt;div id="profile"&gt;\n  &lt;h2 id="display-name"&gt;Jane Doe&lt;/h2&gt;\n  &lt;span id="user-email"&gt;jane@example.com&lt;/span&gt;\n  &lt;span id="user-role"&gt;Admin&lt;/span&gt;\n&lt;/div&gt;`,
    question: "Use soft assertions to verify: (1) '#display-name' has text 'Jane Doe', (2) '#user-email' has text 'jane@example.com', (3) '#user-role' has text 'Admin'. The test should not stop on first failure. Finally call assertAll() to throw accumulated errors.",
    hint: "// const softly = expect.configure({ soft: true }) OR use test's built-in soft",
    answers: {
      js: [["soft","Jane Doe","jane@example.com","Admin","assertAll"],["softAssertions","Jane Doe","assertAll"]],
      ts: [["soft","Jane Doe","jane@example.com","Admin","assertAll"],["softAssertions","Jane Doe","assertAll"]],
      py: [["soft","Jane Doe","jane@example.com","Admin","assert_all"],["expect.soft","Jane","Admin"]]
    }
  },

  /* ── Q16 ─ Page Object Model ────────────────────────────────────────────── */
  {
    id: 16, type: "write", topic: "Page Object Model",
    snippet: `&lt;!-- Login page --&gt;\n&lt;input data-testid="email-input" /&gt;\n&lt;input data-testid="password-input" type="password"/&gt;\n&lt;button data-testid="submit-btn"&gt;Sign In&lt;/button&gt;`,
    question: "Create a LoginPage class (Page Object) with: (1) a constructor accepting 'page', (2) locators for email, password, and submit button using data-testid, (3) a 'login(email, password)' method that fills both fields and clicks submit. Then write a test that uses this class to log in with 'user@test.com' / 'pass123'.",
    hint: "// class LoginPage { constructor(page) { this.emailInput = page.getByTestId(...) } }",
    answers: {
      js: [["class","LoginPage","constructor","page","getByTestId","login","fill","click"],["class","LoginPage","page","email","password","submit","login"]],
      ts: [["class","LoginPage","constructor","page","getByTestId","login","fill","click"],["class","LoginPage","Page","email","password","login"]],
      py: [["class","LoginPage","def __init__","page","get_by_test_id","def login","fill","click"],["class","LoginPage","page","login","fill","click"]]
    }
  },

  /* ── Q17 ─ Custom Fixture ───────────────────────────────────────────────── */
  {
    id: 17, type: "write", topic: "Custom Fixtures",
    snippet: `&lt;!-- Requires authenticated user to access the app --&gt;\n&lt;div id="app-shell"&gt;...&lt;/div&gt;`,
    question: "Create a custom Playwright fixture called 'loggedInPage' that: (1) navigates to '/login', (2) fills credentials, (3) clicks submit, (4) waits for navigation to '/dashboard', (5) yields the page for use in tests. Write a test using this fixture.",
    hint: "// test.extend({ loggedInPage: async ({page}, use) => { ... await use(page); } })",
    answers: {
      js: [["test.extend","loggedInPage","use","page","login","dashboard"],["extend","loggedInPage","async","use","page"]],
      ts: [["test.extend","loggedInPage","use","page","login","dashboard"],["extend","loggedInPage","async","use","page"]],
      py: [["@pytest.fixture","loggedInPage","page","login","dashboard"],["fixture","logged_in","page","yield"]]
    }
  },

  /* ── Q18 ─ waitForFunction ──────────────────────────────────────────────── */
  {
    id: 18, type: "write", topic: "waitForFunction",
    snippet: `&lt;div id="counter"&gt;0&lt;/div&gt;\n&lt;button id="increment"&gt;+1&lt;/button&gt;\n&lt;!-- Clicking increments counter every 500ms asynchronously --&gt;`,
    question: "Click '#increment' 3 times. Use waitForFunction to wait until the '#counter' element's innerText equals '3' (JavaScript expression evaluated in the browser). Assert the counter value is '3'.",
    hint: "// page.waitForFunction(() => document.querySelector('#counter').textContent === '3')",
    answers: {
      js: [["waitForFunction","counter","3"],["waitForFunction","innerText","3"]],
      ts: [["waitForFunction","counter","3"],["waitForFunction","innerText","3"]],
      py: [["wait_for_function","counter","3"],["wait_for_function","innerText","3"]]
    }
  },

  /* ── Q19 ─ evaluate() in Page Context ───────────────────────────────────── */
  {
    id: 19, type: "write", topic: "page.evaluate()",
    snippet: `&lt;div id="scroll-target" style="margin-top:3000px"&gt;Deep Content&lt;/div&gt;`,
    question: "Use page.evaluate() to execute JavaScript in the browser: scroll the window to position Y=3000, then read and return document.documentElement.scrollTop. Assert the returned value is greater than or equal to 2900.",
    hint: "// await page.evaluate(() => { window.scrollTo(0,3000); return document.documentElement.scrollTop; })",
    answers: {
      js: [["evaluate","scrollTo","scrollTop"],["evaluate","scroll","3000"]],
      ts: [["evaluate","scrollTo","scrollTop"],["evaluate","scroll","3000"]],
      py: [["evaluate","scrollTo","scrollTop"],["evaluate","scroll","3000"]]
    }
  },

  /* ── Q20 ─ Element Screenshot ───────────────────────────────────────────── */
  {
    id: 20, type: "write", topic: "Screenshots",
    snippet: `&lt;div id="chart-widget" style="width:600px;height:400px"&gt;\n  &lt;canvas id="chart"&gt;&lt;/canvas&gt;\n&lt;/div&gt;`,
    question: "Take a screenshot of only the '#chart-widget' element (not the full page) and save it to './screenshots/chart.png'. Then verify the file exists by asserting the locator is visible before taking the shot.",
    hint: "// locator.screenshot({ path: '...' })",
    answers: {
      js: [["screenshot","chart-widget","chart.png"],["screenshot","chart","png"]],
      ts: [["screenshot","chart-widget","chart.png"],["screenshot","chart","png"]],
      py: [["screenshot","chart-widget","chart.png"],["screenshot","chart","png"]]
    }
  },

  /* ── Q21 ─ Scroll to Element ────────────────────────────────────────────── */
  {
    id: 21, type: "write", topic: "Scroll Actions",
    snippet: `&lt;div style="height:5000px"&gt;\n  &lt;footer id="site-footer" style="margin-top:4800px"&gt;\n    &lt;a href="/privacy"&gt;Privacy Policy&lt;/a&gt;\n  &lt;/footer&gt;\n&lt;/div&gt;`,
    question: "Scroll the '#site-footer' element into view. After scrolling, assert the 'Privacy Policy' link inside the footer is visible in the viewport.",
    hint: "// locator.scrollIntoViewIfNeeded() / expect(locator).toBeInViewport()",
    answers: {
      js: [["scrollIntoViewIfNeeded","site-footer","Privacy"],["scrollIntoViewIfNeeded","footer"]],
      ts: [["scrollIntoViewIfNeeded","site-footer","Privacy"],["scrollIntoViewIfNeeded","footer"]],
      py: [["scroll_into_view_if_needed","site-footer","Privacy"],["scroll_into_view","footer"]]
    }
  },

  /* ── Q22 ─ Get & Assert Attribute ───────────────────────────────────────── */
  {
    id: 22, type: "write", topic: "Attribute Assertions",
    snippet: `&lt;a id="download-link"\n   href="/files/report.pdf"\n   download\n   aria-label="Download annual report"&gt;\n  Download Report\n&lt;/a&gt;`,
    question: "Get the 'href' attribute of '#download-link' and assert it equals '/files/report.pdf'. Also assert the element has the 'aria-label' attribute value 'Download annual report'.",
    hint: "// expect(locator).toHaveAttribute('href', '/files/report.pdf')",
    answers: {
      js: [["toHaveAttribute","href","report.pdf"],["toHaveAttribute","aria-label","Download"]],
      ts: [["toHaveAttribute","href","report.pdf"],["toHaveAttribute","aria-label","Download"]],
      py: [["to_have_attribute","href","report.pdf"],["to_have_attribute","aria-label","Download"]]
    }
  },

  /* ── Q23 ─ Browser Context & Storage State ──────────────────────────────── */
  {
    id: 23, type: "write", topic: "Browser Context / Storage State",
    snippet: `&lt;!-- After login, the app stores a JWT in localStorage --&gt;\n&lt;!-- key: 'auth_token', value: 'eyJhbGci...' --&gt;`,
    question: "After logging in, save the browser storage state (cookies + localStorage) to a file './auth.json'. Then create a NEW browser context that restores this saved state, and assert the new page can access '/dashboard' without logging in again.",
    hint: "// context.storageState({ path: './auth.json' }) / browser.newContext({ storageState: ... })",
    answers: {
      js: [["storageState","auth.json","newContext","storageState"],["storageState","auth","newContext","dashboard"]],
      ts: [["storageState","auth.json","newContext","storageState"],["storageState","auth","newContext","dashboard"]],
      py: [["storage_state","auth.json","new_context","storage_state"],["storage_state","auth","new_context","dashboard"]]
    }
  },

  /* ── Q24 ─ Modify Response Body ─────────────────────────────────────────── */
  {
    id: 24, type: "write", topic: "Response Modification",
    snippet: `&lt;!-- App fetches /api/config and reads feature flags --&gt;\n&lt;div id="beta-feature" style="display:none"&gt;Beta Feature&lt;/div&gt;`,
    question: "Intercept the GET request to '**/api/config'. Fetch the real response, then modify the JSON body to set 'betaEnabled: true', and fulfill with the modified body. Assert '#beta-feature' becomes visible after the page loads.",
    hint: "// route.fetch() then route.fulfill({ json: {...original, betaEnabled:true} })",
    answers: {
      js: [["route","fetch","fulfill","betaEnabled","beta-feature"],["route.fetch","fulfill","betaEnabled"]],
      ts: [["route","fetch","fulfill","betaEnabled","beta-feature"],["route.fetch","fulfill","betaEnabled"]],
      py: [["route","fetch","fulfill","betaEnabled","beta-feature"],["route","fetch","fulfill","beta"]]
    }
  },

  /* ── Q25 ─ File Download Verification ───────────────────────────────────── */
  {
    id: 25, type: "write", topic: "File Download",
    snippet: `&lt;button id="export-btn"&gt;Export as CSV&lt;/button&gt;\n&lt;!-- Clicking triggers a file download --&gt;`,
    question: "Click 'Export as CSV' and capture the download event. Assert the downloaded file's suggested filename contains 'export' and ends with '.csv'. Save the file to './downloads/export.csv'.",
    hint: "// page.waitForEvent('download') / download.suggestedFilename() / download.saveAs()",
    answers: {
      js: [["waitForEvent","download","suggestedFilename","csv","saveAs"],["waitForEvent","download","csv"]],
      ts: [["waitForEvent","download","suggestedFilename","csv","saveAs"],["waitForEvent","download","csv"]],
      py: [["wait_for_event","download","suggested_filename","csv","save_as"],["wait_for_event","download","csv"]]
    }
  },

  /* ── Q26 ─ Shadow DOM ───────────────────────────────────────────────────── */
  {
    id: 26, type: "write", topic: "Shadow DOM",
    snippet: `&lt;!-- Web component with Shadow DOM --&gt;\n&lt;my-login-widget&gt;\n  #shadow-root\n    &lt;input type="text"  id="shadow-username" /&gt;\n    &lt;input type="password" id="shadow-pass" /&gt;\n    &lt;button id="shadow-login"&gt;Login&lt;/button&gt;\n&lt;/my-login-widget&gt;`,
    question: "Playwright's auto-piercing can reach into Shadow DOM. Fill '#shadow-username' with 'admin' and '#shadow-pass' with 'pw123' inside the 'my-login-widget' shadow root, then click '#shadow-login'. Assert the page URL changes to '/home'.",
    hint: "// Playwright pierces Shadow DOM automatically with CSS selectors",
    answers: {
      js: [["shadow-username","admin","shadow-pass","shadow-login","click"],["my-login-widget","fill","admin","click"]],
      ts: [["shadow-username","admin","shadow-pass","shadow-login","click"],["my-login-widget","fill","admin","click"]],
      py: [["shadow-username","admin","shadow-pass","shadow-login","click"],["my-login-widget","fill","admin","click"]]
    }
  },

  /* ── Q27 ─ expect.poll() ────────────────────────────────────────────────── */
  {
    id: 27, type: "write", topic: "expect.poll()",
    snippet: `&lt;div id="job-status"&gt;Pending&lt;/div&gt;\n&lt;!-- Status changes asynchronously: Pending → Running → Done --&gt;`,
    question: "Use expect.poll() to repeatedly poll a function that reads the text content of '#job-status' until it equals 'Done'. Set a timeout of 15 seconds and polling interval of 500ms.",
    hint: "// await expect.poll(async () => await page.locator(...).textContent(), { timeout:15000, intervals:[500] }).toBe('Done')",
    answers: {
      js: [["expect.poll","job-status","Done","timeout","15000"],["poll","job-status","Done","500"]],
      ts: [["expect.poll","job-status","Done","timeout","15000"],["poll","job-status","Done","500"]],
      py: [["expect","poll","job-status","Done","timeout","15000"],["poll","job-status","Done","500"]]
    }
  },

  /* ── Q28 ─ API Testing ──────────────────────────────────────────────────── */
  {
    id: 28, type: "write", topic: "API Testing (request context)",
    snippet: `&lt;!-- REST API:\n  POST /api/auth/login  { username, password }\n  → { token, userId }\n  GET  /api/users/{id}  (requires Bearer token)\n  → { id, name, email }\n--&gt;`,
    question: "Using Playwright's APIRequestContext: (1) POST to '/api/auth/login' with credentials and capture the token. (2) GET '/api/users/1' using the token as Authorization Bearer header. (3) Assert the response status is 200 and body contains 'name' property.",
    hint: "// request.post() / request.get() / response.json()",
    answers: {
      js: [["request","post","api/auth/login","token","get","api/users","Bearer","json"],["apiRequest","post","login","token","Authorization","Bearer"]],
      ts: [["request","post","api/auth/login","token","get","api/users","Bearer","json"],["apiRequest","post","login","token","Authorization","Bearer"]],
      py: [["request","post","api/auth/login","token","get","api/users","Bearer","json"],["api_request","post","login","token","Authorization","Bearer"]]
    }
  },

  /* ── Q29 ─ Geolocation Mocking ──────────────────────────────────────────── */
  {
    id: 29, type: "write", topic: "Geolocation Mocking",
    snippet: `&lt;button id="get-location"&gt;Get My Location&lt;/button&gt;\n&lt;div id="location-display"&gt;&lt;/div&gt;\n&lt;!-- JS calls navigator.geolocation.getCurrentPosition() --&gt;`,
    question: "Create a browser context with mocked geolocation set to latitude 51.5074 (London). Grant the 'geolocation' permission. Navigate to the page. Click 'Get My Location' and assert '#location-display' contains '51.5074'.",
    hint: "// browser.newContext({ geolocation: {latitude, longitude}, permissions: ['geolocation'] })",
    answers: {
      js: [["geolocation","51.5074","permissions","geolocation","location-display"],["newContext","geolocation","51.5","geolocation"]],
      ts: [["geolocation","51.5074","permissions","geolocation","location-display"],["newContext","geolocation","51.5","geolocation"]],
      py: [["geolocation","51.5074","permissions","geolocation","location-display"],["new_context","geolocation","51.5","geolocation"]]
    }
  },

  /* ── Q30 ─ Tracing ──────────────────────────────────────────────────────── */
  {
    id: 30, type: "write", topic: "Tracing",
    snippet: `&lt;!-- Entire test flow to be traced --&gt;\n&lt;form id="checkout-form"&gt;\n  &lt;input name="card" /&gt;\n  &lt;button type="submit"&gt;Purchase&lt;/button&gt;\n&lt;/form&gt;`,
    question: "Start a Playwright trace before test actions with screenshots and snapshots enabled. Perform the checkout (fill card, click Purchase). Stop the trace and save it to './trace/checkout.zip'. The trace should capture screenshots on each action.",
    hint: "// context.tracing.start({ screenshots:true, snapshots:true }) / .stop({ path: ... })",
    answers: {
      js: [["tracing","start","screenshots","snapshots","stop","checkout.zip"],["tracing.start","screenshots:true","stop","path"]],
      ts: [["tracing","start","screenshots","snapshots","stop","checkout.zip"],["tracing.start","screenshots:true","stop","path"]],
      py: [["tracing","start","screenshots","snapshots","stop","checkout.zip"],["tracing.start","screenshots","stop","path"]]
    }
  },

  /* ── Q31 ─ Confirm Dialog ───────────────────────────────────────────────── */
  {
    id: 31, type: "write", topic: "Confirm Dialog Dismiss",
    snippet: `&lt;button id="delete-btn" onclick="if(confirm('Are you sure?')) deleteItem()"&gt;\n  Delete Item\n&lt;/button&gt;\n&lt;div id="item"&gt;Important Item&lt;/div&gt;`,
    question: "Set up a dialog handler that DISMISSES (cancels) the confirm dialog. Click 'Delete Item'. Assert '#item' is still visible (deletion was cancelled).",
    hint: "// dialog.dismiss() in the 'dialog' event handler",
    answers: {
      js: [["on","dialog","dismiss","Are you sure","item","toBeVisible"],["dialog","dismiss","visible"]],
      ts: [["on","dialog","dismiss","Are you sure","item","toBeVisible"],["dialog","dismiss","visible"]],
      py: [["on","dialog","dismiss","Are you sure","item","to_be_visible"],["dialog","dismiss","visible"]]
    }
  },

  /* ── Q32 ─ Multi-checkbox ───────────────────────────────────────────────── */
  {
    id: 32, type: "write", topic: "Checkbox / Radio Operations",
    snippet: `&lt;div id="skills"&gt;\n  &lt;input type="checkbox" id="js-skill"  value="js"  /&gt; JavaScript\n  &lt;input type="checkbox" id="ts-skill"  value="ts"  /&gt; TypeScript\n  &lt;input type="checkbox" id="py-skill"  value="py"  /&gt; Python\n  &lt;input type="checkbox" id="java-skill" value="java"/&gt; Java\n&lt;/div&gt;`,
    question: "Check the 'JavaScript' and 'TypeScript' checkboxes. Uncheck 'Java' if it happens to be checked. Assert that both '#js-skill' and '#ts-skill' are checked, and '#java-skill' is NOT checked.",
    hint: "// locator.check() / locator.uncheck() / toBeChecked() / not.toBeChecked()",
    answers: {
      js: [["check","js-skill","ts-skill","uncheck","toBeChecked","not"],["check","js","ts","uncheck","java","toBeChecked"]],
      ts: [["check","js-skill","ts-skill","uncheck","toBeChecked","not"],["check","js","ts","uncheck","java","toBeChecked"]],
      py: [["check","js-skill","ts-skill","uncheck","to_be_checked","not_"],["check","js","ts","uncheck","java","to_be_checked"]]
    }
  },

  /* ── Q33 ─ waitForLoadState ─────────────────────────────────────────────── */
  {
    id: 33, type: "write", topic: "waitForLoadState",
    snippet: `&lt;!-- SPA with heavy JavaScript that loads data after DOMContentLoaded --&gt;\n&lt;div id="spa-root"&gt;&lt;/div&gt;`,
    question: "Navigate to 'https://spa.example.com'. Wait for the network to become idle ('networkidle' state). Then wait for the '#spa-root' element to be visible. Assert the page URL does not contain '/error'.",
    hint: "// page.waitForLoadState('networkidle') / expect(page).not.toHaveURL(/\\/error/)",
    answers: {
      js: [["waitForLoadState","networkidle","spa-root","not","error"],["waitForLoadState","networkidle"]],
      ts: [["waitForLoadState","networkidle","spa-root","not","error"],["waitForLoadState","networkidle"]],
      py: [["wait_for_load_state","networkidle","spa-root"],["wait_for_load_state","networkidle"]]
    }
  },

  /* ── Q34 ─ Locator Chaining & Filter ────────────────────────────────────── */
  {
    id: 34, type: "write", topic: "Locator Chaining & filter()",
    snippet: `&lt;ul id="todo-list"&gt;\n  &lt;li class="todo done"&gt;Buy groceries&lt;/li&gt;\n  &lt;li class="todo"&gt;Write tests&lt;/li&gt;\n  &lt;li class="todo done"&gt;Read docs&lt;/li&gt;\n  &lt;li class="todo"&gt;Deploy app&lt;/li&gt;\n&lt;/ul&gt;`,
    question: "Using locator chaining and the filter() method, get all '.todo' items that do NOT have the 'done' class (incomplete todos). Assert the count of incomplete items is 2 and the first incomplete item contains 'Write tests'.",
    hint: "// locator('.todo').filter({ hasNot: locator('.done') }) or .not.filter",
    answers: {
      js: [["filter","todo","done","toHaveCount","2","Write tests"],["filter","hasNot","done","2","Write tests"]],
      ts: [["filter","todo","done","toHaveCount","2","Write tests"],["filter","hasNot","done","2","Write tests"]],
      py: [["filter","todo","done","to_have_count","2","Write tests"],["filter","has_not","done","2","Write tests"]]
    }
  },

  /* ── Q35 ─ Mobile Emulation ─────────────────────────────────────────────── */
  {
    id: 35, type: "write", topic: "Mobile Emulation",
    snippet: `&lt;nav class="desktop-nav"&gt;...&lt;/nav&gt;\n&lt;nav class="mobile-nav" style="display:none"&gt;\n  &lt;button class="hamburger"&gt;☰&lt;/button&gt;\n&lt;/nav&gt;`,
    question: "Create a browser context emulating an iPhone 13 (use Playwright's built-in device descriptor). Navigate to the page. Assert the '.mobile-nav' is visible and '.desktop-nav' is hidden. Click the hamburger button.",
    hint: "// const { devices } = require('@playwright/test') / browser.newContext({ ...devices['iPhone 13'] })",
    answers: {
      js: [["devices","iPhone","mobile-nav","toBeVisible","desktop-nav","hamburger"],["devices","iPhone 13","newContext","mobile-nav"]],
      ts: [["devices","iPhone","mobile-nav","toBeVisible","desktop-nav","hamburger"],["devices","iPhone 13","newContext","mobile-nav"]],
      py: [["devices","iPhone","mobile-nav","to_be_visible","desktop-nav","hamburger"],["devices","iphone","new_context","mobile-nav"]]
    }
  },

  /* ══════════════════════════════════════════════════════════════════════════
     MCQ QUESTIONS (36–50)
  ══════════════════════════════════════════════════════════════════════════ */

  /* ── Q36 ─ Auto-waiting ─────────────────────────────────────────────────── */
  {
    id: 36, type: "mcq", topic: "Auto-waiting",
    snippet: `// This test fails intermittently:\nawait page.click('#submit-btn');\nawait expect(page.locator('#result')).toHaveText('Done');`,
    question: "Which statement about Playwright's auto-waiting is CORRECT when the above code fails with 'element not found'?",
    options: {
      A: "You must always add explicit page.waitForSelector('#submit-btn') before every click().",
      B: "Playwright auto-waits for the element to be actionable (visible, stable, enabled) before click(), but the #result assertion may time out if the action takes longer than the default 5s timeout.",
      C: "Auto-waiting only applies to fill() and type(), not to click().",
      D: "You must use page.pause() to enable auto-waiting."
    },
    correct: "B"
  },

  /* ── Q37 ─ Locator Priority ─────────────────────────────────────────────── */
  {
    id: 37, type: "mcq", topic: "Locator Best Practices",
    snippet: `// Four ways to find the same "Search" button:\npage.locator('#search-btn')              // CSS id\npage.locator('button:text("Search")')    // text\npage.getByRole('button', {name:'Search'})// role\npage.getByTestId('search-btn')           // data-testid`,
    question: "According to Playwright's official recommendations, what is the PREFERRED order of locator strategies (most preferred first)?",
    options: {
      A: "CSS id → text → role → data-testid",
      B: "getByRole → getByTestId → getByText → CSS/XPath",
      C: "XPath → CSS → role → text",
      D: "data-testid → CSS id → text → role"
    },
    correct: "B"
  },

  /* ── Q38 ─ Browser Context vs Page ──────────────────────────────────────── */
  {
    id: 38, type: "mcq", topic: "Browser Context vs Page",
    snippet: `const context1 = await browser.newContext();\nconst context2 = await browser.newContext();\nconst page1 = await context1.newPage();\nconst page2 = await context2.newPage();`,
    question: "Which of the following is TRUE about browser contexts in Playwright?",
    options: {
      A: "context1 and context2 share cookies and localStorage — they are just different tabs.",
      B: "context1 and context2 are completely isolated: separate cookies, localStorage, and sessions. They behave like separate incognito windows.",
      C: "You can only create one BrowserContext per Browser instance.",
      D: "Browser contexts are deprecated — use pages directly instead."
    },
    correct: "B"
  },

  /* ── Q39 ─ page.route() vs page.on('request') ───────────────────────────── */
  {
    id: 39, type: "mcq", topic: "Network Interception",
    snippet: `// Option A:\nawait page.route('**/api/**', route => route.fulfill({ body:'{}' }));\n// Option B:\npage.on('request', req => console.log(req.url()));`,
    question: "What is the KEY difference between page.route() and page.on('request')?",
    options: {
      A: "They are identical — page.route() is just a newer alias for page.on('request').",
      B: "page.on('request') can block/modify requests; page.route() only observes them.",
      C: "page.route() intercepts and can fulfill/abort/continue requests. page.on('request') is read-only — it cannot block or modify requests.",
      D: "page.route() only works for POST requests."
    },
    correct: "C"
  },

  /* ── Q40 ─ Parallel Execution ───────────────────────────────────────────── */
  {
    id: 40, type: "mcq", topic: "Parallel Execution",
    snippet: `// playwright.config.ts\nexport default defineConfig({\n  workers: 4,\n  fullyParallel: true,\n});`,
    question: "With fullyParallel: true and workers: 4 in config, how does Playwright execute tests?",
    options: {
      A: "All tests in a single file run in parallel; tests across files run sequentially.",
      B: "Tests within the same file always run sequentially; only different files can run in parallel.",
      C: "Each individual test can run in its own worker — tests within the same file can also run in parallel (not just file-level parallelism).",
      D: "workers: 4 means exactly 4 test files are created, one per worker."
    },
    correct: "C"
  },

  /* ── Q41 ─ Soft Assertions vs Hard ──────────────────────────────────────── */
  {
    id: 41, type: "mcq", topic: "Soft vs Hard Assertions",
    snippet: `const softly = expect.configure({ soft: true });\nawait softly(page.locator('#a')).toHaveText('Hello');\nawait softly(page.locator('#b')).toHaveText('World');\nawait expect(page).toHaveURL('/success');\nawait expect(softly).assertAll();`,
    question: "If '#a' has wrong text but '#b' is correct and the URL is '/success', what happens?",
    options: {
      A: "The test passes because the final hard assertion on URL succeeded.",
      B: "The test stops immediately when '#a' fails — soft assertions still throw on failure.",
      C: "The test continues past both soft failures, passes the URL assertion, but throws a combined error at assertAll() listing all soft failures.",
      D: "Soft assertions never cause test failures — they only log warnings."
    },
    correct: "C"
  },

  /* ── Q42 ─ Fixture Scope ────────────────────────────────────────────────── */
  {
    id: 42, type: "mcq", topic: "Fixture Scope",
    snippet: `test.extend({\n  expensiveSetup: [ async ({}, use) => {\n    const data = await heavyDatabaseSetup();\n    await use(data);\n    await cleanup(data);\n  }, { scope: 'worker' } ]\n})`,
    question: "The fixture above uses scope: 'worker'. What does this mean?",
    options: {
      A: "heavyDatabaseSetup() runs once per test — same as the default behaviour.",
      B: "heavyDatabaseSetup() runs once per test file.",
      C: "heavyDatabaseSetup() runs once per worker process and is shared across all tests running in that worker, reducing setup cost.",
      D: "scope: 'worker' is invalid — only 'test' and 'global' are valid scopes."
    },
    correct: "C"
  },

  /* ── Q43 ─ waitForLoadState Options ─────────────────────────────────────── */
  {
    id: 43, type: "mcq", topic: "waitForLoadState",
    snippet: `await page.goto('https://example.com');\nawait page.waitForLoadState('???');`,
    question: "Which waitForLoadState option waits until there are no network connections for at least 500ms — ideal for SPAs that load data via fetch/XHR after initial render?",
    options: {
      A: "load",
      B: "domcontentloaded",
      C: "networkidle",
      D: "committed"
    },
    correct: "C"
  },

  /* ── Q44 ─ test.step() ───────────────────────────────────────────────────── */
  {
    id: 44, type: "mcq", topic: "test.step()",
    snippet: `await test.step('Login as admin', async () => {\n  await page.fill('#user', 'admin');\n  await page.fill('#pass', 'secret');\n  await page.click('#submit');\n});`,
    question: "What is the PRIMARY benefit of using test.step() in Playwright?",
    options: {
      A: "test.step() runs the enclosed actions in a separate browser context for isolation.",
      B: "test.step() groups actions with a label that appears in test reports and trace viewer, making debugging and reading reports much easier.",
      C: "test.step() automatically retries the enclosed actions on failure.",
      D: "test.step() is required for all async operations in Playwright."
    },
    correct: "B"
  },

  /* ── Q45 ─ Retry Configuration ───────────────────────────────────────────── */
  {
    id: 45, type: "mcq", topic: "Retry Configuration",
    snippet: `// playwright.config.ts\nexport default defineConfig({\n  retries: 2,\n});\n\n// In a test file:\ntest('flaky test', { retries: 0 }, async ({ page }) => {\n  // ...\n});`,
    question: "With retries: 2 globally but retries: 0 on the specific test, how many times will 'flaky test' run if it fails?",
    options: {
      A: "3 times (original + 2 global retries — test-level config is ignored).",
      B: "1 time only — test-level retries: 0 overrides the global config, so no retries.",
      C: "2 times — one retry is always attempted regardless of config.",
      D: "The configuration is invalid — you cannot set retries at test level."
    },
    correct: "B"
  },

  /* ── Q46 ─ getByRole Accessibility ──────────────────────────────────────── */
  {
    id: 46, type: "mcq", topic: "getByRole & Accessibility",
    snippet: `&lt;button aria-label="Close dialog" class="close-x"&gt;✕&lt;/button&gt;`,
    question: "What is the CORRECT Playwright locator to select this button by its accessible role and label?",
    options: {
      A: "page.locator('button.close-x')",
      B: "page.getByRole('button', { name: 'Close dialog' })",
      C: "page.getByLabel('Close dialog')",
      D: "page.locator('[aria-label]')"
    },
    correct: "B"
  },

  /* ── Q47 ─ Trace Viewer ──────────────────────────────────────────────────── */
  {
    id: 47, type: "mcq", topic: "Trace Viewer",
    snippet: `// playwright.config.ts\nexport default defineConfig({\n  use: { trace: 'on-first-retry' },\n});`,
    question: "With trace: 'on-first-retry', when is a trace file generated?",
    options: {
      A: "A trace is recorded for every single test run.",
      B: "A trace is only recorded when running with --debug flag.",
      C: "A trace is recorded only when a test is being retried for the first time (i.e., the test failed once and is being retried).",
      D: "A trace is recorded for the last retry before the test is marked as failed."
    },
    correct: "C"
  },

  /* ── Q48 ─ globalSetup ───────────────────────────────────────────────────── */
  {
    id: 48, type: "mcq", topic: "Global Setup / Teardown",
    snippet: `// playwright.config.ts\nexport default defineConfig({\n  globalSetup: './global-setup.ts',\n  globalTeardown: './global-teardown.ts',\n});`,
    question: "What is the key characteristic of globalSetup in Playwright?",
    options: {
      A: "globalSetup runs before each test file, similar to beforeAll per file.",
      B: "globalSetup runs once before the entire test suite starts, in a separate process. It cannot access the 'page' or 'browser' fixtures directly.",
      C: "globalSetup runs in the same worker as the first test file.",
      D: "globalSetup is deprecated — use beforeAll with scope:'worker' instead."
    },
    correct: "B"
  },

  /* ── Q49 ─ Locator strictness ────────────────────────────────────────────── */
  {
    id: 49, type: "mcq", topic: "Strict Mode / Locator Strictness",
    snippet: `// Page has THREE elements matching '.btn':\nawait page.locator('.btn').click();`,
    question: "What happens when page.locator('.btn').click() is called and there are 3 matching elements?",
    options: {
      A: "Playwright clicks the first matching element automatically.",
      B: "Playwright throws a 'strict mode violation' error because the locator resolved to more than one element.",
      C: "Playwright clicks all 3 elements sequentially.",
      D: "Playwright ignores the extra elements and randomly picks one."
    },
    correct: "B"
  },

  /* ── Q50 ─ expect.toPass() ───────────────────────────────────────────────── */
  {
    id: 50, type: "mcq", topic: "expect.toPass() — Retry Assertion",
    snippet: `await expect(async () => {\n  const resp = await request.get('/api/status');\n  expect(resp.status()).toBe(200);\n  const body = await resp.json();\n  expect(body.ready).toBe(true);\n}).toPass({ timeout: 10000 });`,
    question: "What does expect(fn).toPass() do that a regular expect() assertion cannot do?",
    options: {
      A: "It is used only for API response assertions — regular expect() cannot handle responses.",
      B: "It wraps any arbitrary async function and retries the ENTIRE block (including the API call) until all inner assertions pass or the timeout expires — useful when an API becomes ready over time.",
      C: "It is equivalent to expect.poll() — they are the same under the hood.",
      D: "It allows assertions to run without awaiting the promise."
    },
    correct: "B"
  }

]; // end questions[]

/* ═══════════════════════════════════════════════════════════════════════════
   LANGUAGE MANAGEMENT
═══════════════════════════════════════════════════════════════════════════ */
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("pw_lang", lang);

  // Update button styles
  ["js","ts","py"].forEach(l => {
    const btn = document.getElementById(`btn-${l}`);
    btn.className = `lang-btn${l===lang ? ` active-${l}` : ""}`;
  });

  // Update hint text
  const labels = { js:"JavaScript", ts:"TypeScript", py:"Python" };
  document.getElementById("langHint").textContent =
    `✔ Validating as ${labels[lang]} — change anytime`;

  // Rebuild question area to refresh lang indicators on current card
  buildQuestions();
  showQuestion(currentIndex);
}

/* ═══════════════════════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  checked  = Array(questions.length).fill(false);
  results  = Array(questions.length).fill(undefined);
  score    = 0;
  currentIndex = 0;

  if (currentLang) setLang(currentLang);  // restore saved lang
  buildQuestions();
  updateStepNav();
  updateProgressBar();
  showQuestion(0);
});

/* ═══════════════════════════════════════════════════════════════════════════
   BUILD QUESTION CARDS
═══════════════════════════════════════════════════════════════════════════ */
function buildQuestions() {
  const container = document.getElementById("questionsContainer");
  container.innerHTML = "";

  questions.forEach((q, idx) => {
    const div = document.createElement("div");
    div.className = "question-card hidden";
    div.id = `qcard-${idx}`;
    div.innerHTML = buildCardHTML(q, idx);
    container.appendChild(div);
  });
}

function buildCardHTML(q, idx) {
  const typeBadge = q.type === "write"
    ? `<span class="q-type-badge badge-write">Write Code</span>`
    : `<span class="q-type-badge badge-mcq">MCQ</span>`;

  const snippetHTML = `
    <div class="snippet-wrap">
      <div class="snippet-label">HTML / Code Snippet</div>
      <pre class="snippet-code">${q.snippet}</pre>
    </div>`;

  const isLast = idx === questions.length - 1;
  const nextOrSubmit = isLast
    ? `<button class="btn btn-submit" id="submit-btn" onclick="submitAll()" disabled>Submit All ✓</button>`
    : `<button class="btn btn-next"   id="next-${idx}" onclick="goNext(${idx})" disabled>Next →</button>`;

  const btns = `
    <div class="btn-row">
      <button class="btn btn-check" onclick="checkAnswer(${idx})">Check Answer</button>
      ${nextOrSubmit}
    </div>`;

  const feedbackDiv = `<div class="feedback hidden" id="feedback-${idx}"></div>`;

  if (q.type === "write") {
    const langKey   = currentLang || "js";
    const liClass   = `li-${langKey}`;
    const langNames = { js:"JavaScript", ts:"TypeScript", py:"Python" };

    return `
      <div class="q-meta">
        <span class="q-num">Q${q.id}</span>
        <span class="q-topic">${q.topic}</span>
        ${typeBadge}
      </div>
      ${snippetHTML}
      <p class="q-text">${q.question}</p>
      <div class="code-input-label">
        Your Answer
        <span class="lang-indicator ${liClass}">${langNames[langKey]}</span>
      </div>
      <textarea
        id="input-${idx}"
        class="code-textarea"
        placeholder="${escHtml(q.hint || '// Write your Playwright code here...')}"
        spellcheck="false"
        autocorrect="off"
        autocapitalize="off"
      ></textarea>
      ${feedbackDiv}
      ${btns}`;
  } else {
    // MCQ
    const opts = ["A","B","C","D"].map(letter => {
      const text = q.options[letter] || "";
      return `
        <label class="mcq-option-label" id="opt-label-${idx}-${letter}">
          <input type="radio" name="mcq-${idx}" value="${letter}" />
          <span><strong>${letter}.</strong> ${escHtml(text)}</span>
        </label>`;
    }).join("");

    return `
      <div class="q-meta">
        <span class="q-num">Q${q.id}</span>
        <span class="q-topic">${q.topic}</span>
        ${typeBadge}
      </div>
      ${snippetHTML}
      <p class="q-text">${q.question}</p>
      <div class="mcq-options">${opts}</div>
      ${feedbackDiv}
      ${btns}`;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   CHECK ANSWER — Write: keyword pattern matching per language
                — MCQ:   correct option check
═══════════════════════════════════════════════════════════════════════════ */
function checkAnswer(idx) {
  if (checked[idx]) return; // already answered correctly

  if (!currentLang && questions[idx].type === "write") {
    const fbEl = document.getElementById(`feedback-${idx}`);
    showFeedback(fbEl, "warn", "⚠ Please select a language (JavaScript / TypeScript / Python) in the bar at the top first.");
    return;
  }

  const q         = questions[idx];
  const feedbackEl= document.getElementById(`feedback-${idx}`);
  const nextBtn   = document.getElementById(`next-${idx}`);
  const submitBtn = document.getElementById("submit-btn");

  let isCorrect = false;

  if (q.type === "write") {
    const inputEl = document.getElementById(`input-${idx}`);
    const code    = inputEl.value.trim();

    if (!code) {
      showFeedback(feedbackEl, "warn", "⚠ Please write your Playwright code before checking.");
      return;
    }

    const lang     = currentLang || "js";
    const patterns = q.answers[lang] || q.answers["js"] || [];
    const codeLow  = code.toLowerCase();

    // Each pattern is an array of required keywords — ALL must be present
    isCorrect = patterns.some(pattern =>
      pattern.every(kw => codeLow.includes(kw.toLowerCase()))
    );

    if (isCorrect) {
      inputEl.disabled = true;
      showFeedback(feedbackEl, "correct", "✔ Correct! Well done.");
      checked[idx] = true;
      results[idx] = "correct";
      score++;
      if (nextBtn)   nextBtn.disabled   = false;
      if (submitBtn) submitBtn.disabled = false;
      updateStepNav();
    } else {
      showFeedback(feedbackEl, "wrong", "✘ Incorrect. Please try again.");
    }

  } else {
    // MCQ
    const selected = document.querySelector(`input[name="mcq-${idx}"]:checked`);
    if (!selected) {
      showFeedback(feedbackEl, "warn", "⚠ Please select an option before checking.");
      return;
    }

    isCorrect = selected.value === q.correct;

    if (isCorrect) {
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
      document.querySelectorAll(`input[name="mcq-${idx}"]`).forEach(r => r.checked = false);
      showFeedback(feedbackEl, "wrong", "✘ Incorrect. Please try again.");
    }
  }
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
   SUBMIT ALL
═══════════════════════════════════════════════════════════════════════════ */
function submitAll() {
  // unanswered questions count as wrong in final score
  questions.forEach((_, idx) => {
    if (!checked[idx]) { results[idx] = "wrong"; }
  });

  const total   = questions.length;
  const correct = results.filter(r => r === "correct").length;
  const wrong   = total - correct;
  const pct     = Math.round((correct / total) * 100);

  document.getElementById("questionsContainer").classList.add("hidden");
  document.getElementById("stepNav").classList.add("hidden");
  document.getElementById("progressWrap").classList.add("hidden");

  const resultSection = document.getElementById("resultSection");
  resultSection.classList.remove("hidden");
  document.getElementById("res-total").textContent   = total;
  document.getElementById("res-correct").textContent = correct;
  document.getElementById("res-wrong").textContent   = wrong;
  document.getElementById("res-pct").textContent     = pct + "%";

  let msg = "", msgClass = "";
  if (pct === 100)    { msg = "🏆 Perfect score! Senior Playwright engineer material."; msgClass = "perf-excellent"; }
  else if (pct >= 80) { msg = "✅ Excellent! Strong Playwright fundamentals and advanced knowledge."; msgClass = "perf-good"; }
  else if (pct >= 60) { msg = "📘 Good effort. Revise network interception, fixtures, and tracing."; msgClass = "perf-average"; }
  else                { msg = "📖 Keep practising — dive deeper into Playwright's API docs."; msgClass = "perf-low"; }

  const msgEl = document.getElementById("performanceMsg");
  msgEl.textContent = msg;
  msgEl.className   = "perf-msg " + msgClass;
  resultSection.scrollIntoView({ behavior: "smooth" });
}

/* ═══════════════════════════════════════════════════════════════════════════
   RESTART
═══════════════════════════════════════════════════════════════════════════ */
function restartQuiz() {
  checked      = Array(questions.length).fill(false);
  results      = Array(questions.length).fill(undefined);
  score        = 0;
  currentIndex = 0;
  document.getElementById("resultSection").classList.add("hidden");
  document.getElementById("questionsContainer").classList.remove("hidden");
  document.getElementById("stepNav").classList.remove("hidden");
  document.getElementById("progressWrap").classList.remove("hidden");
  buildQuestions();
  updateStepNav();
  updateProgressBar();
  showQuestion(0);
}

/* ═══════════════════════════════════════════════════════════════════════════
   UI HELPERS
═══════════════════════════════════════════════════════════════════════════ */
function showFeedback(el, type, msg) {
  el.className = `feedback ${type}`;
  el.innerHTML = msg;
}

function updateProgressBar() {
  const done  = checked.filter(Boolean).length;
  const total = questions.length;
  const pct   = Math.round((done / total) * 100);
  document.getElementById("progressFill").style.width  = pct + "%";
  document.getElementById("progressLabel").textContent =
    `Question ${currentIndex + 1} of ${total}`;
  document.getElementById("progressPct").textContent   = pct + "% complete";
}

function updateStepNav() {
  const nav = document.getElementById("stepNav");
  nav.innerHTML = "";
  questions.forEach((_, idx) => {
    const btn = document.createElement("button");
    btn.className = "step-btn";
    btn.textContent = idx + 1;
    btn.title = questions[idx].topic;
    btn.onclick = () => showQuestion(idx);
    if (idx === currentIndex) btn.classList.add("active");
    if (results[idx] === "correct") btn.classList.add("step-correct");
    else if (results[idx] === "wrong") btn.classList.add("step-wrong");
    nav.appendChild(btn);
  });
}

function escHtml(str) {
  return String(str)
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;");
}
