
console.log("Quick Doubt loaded");

let doubtCard = null;

// Collect visible lesson text from the ChatGPT page.
function getLessonContext() {
  const turns = [
    ...document.querySelectorAll("[data-chatgpt-search-unit-key]")
  ];

  const messages = turns
    .map(turn => {
      const key = turn.getAttribute("data-chatgpt-search-unit-key");
      const text = turn.innerText.trim();

      return { key, text };
    })
    .filter(turn =>
      turn.key?.endsWith(":assistant") &&
      turn.text.length > 0
    )
    .map(turn => turn.text);

  return messages.slice(-3).join("\n\n");
}

// Create the Quick Doubt button.
const launchButton = document.createElement("button");

launchButton.textContent = "Quick Doubt";

Object.assign(launchButton.style, {
  position: "fixed",
  right: "24px",
  bottom: "24px",
  padding: "12px 18px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  zIndex: "2147483647"
});

document.body.appendChild(launchButton);

// Show the card when the button is clicked or shortcut is used.
launchButton.addEventListener("click", () => {
  if (doubtCard) {
    doubtCard.remove();
  }

  const selectedText = window.getSelection()?.toString().trim();

  doubtCard = document.createElement("div");

  Object.assign(doubtCard.style, {
    position: "fixed",
    right: "24px",
    bottom: "80px",
    width: "300px",
    padding: "20px",
    background: "white",
    color: "#222",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 6px 30px #0003",
    zIndex: "2147483647",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.5"
  });

  const title = document.createElement("h3");
  title.textContent = "Quick Doubt";
  title.style.marginTop = "0";

  const term = document.createElement("p");
  term.textContent = selectedText
    ? "Selected: " + selectedText
    : "No text selected yet.";

  const contextTitle = document.createElement("h4");
  contextTitle.textContent = "Lesson context";
  contextTitle.style.marginBottom = "6px";

  const contextPreview = document.createElement("p");
  contextPreview.textContent =
    getLessonContext() || "No lesson text found.";

  Object.assign(contextPreview.style, {
    fontSize: "12px",
    maxHeight: "180px",
    overflowY: "auto",
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere"
  });

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", () => {
    doubtCard.remove();
    doubtCard = null;
  });

  doubtCard.append(
    title,
    term,
    contextTitle,
    contextPreview,
    closeButton
  );

  document.body.appendChild(doubtCard);
});

// Receive the keyboard shortcut from background.js.
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "show-quick-doubt") {
    launchButton.click();
  }
});
