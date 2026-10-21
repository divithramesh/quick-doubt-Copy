
console.log("Quick Doubt loaded");

let doubtCard = null;

// Create a button we can click to test the extension.
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

// Show the card when the button is clicked.
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
    width: "280px",
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
    : "No text selected yet. This is a test of the floating card.";

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", () => {
    doubtCard.remove();
    doubtCard = null;
  });

  doubtCard.append(title, term, closeButton);
  document.body.appendChild(doubtCard);
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "show-quick-doubt") {
    launchButton.click();
  }
});

