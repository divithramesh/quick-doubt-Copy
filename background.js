
console.log("Quick Doubt background script started");

chrome.commands.onCommand.addListener(async (command) => {
  console.log("Shortcut command received:", command);

  if (command !== "show-quick-doubt") return;

  try {
    const tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    });

    console.log("Tabs returned:", tabs);

    const tab = tabs[0];

    if (!tab?.id || !tab.url?.startsWith("https://chatgpt.com/")) {
      console.log("No usable ChatGPT tab found.");
      return;
    }

    await chrome.tabs.sendMessage(tab.id, {
      action: "show-quick-doubt"
    });

    console.log("Message sent to Quick Doubt content script.");
  } catch (error) {
    console.error("Quick Doubt error:", error);
  }
});
