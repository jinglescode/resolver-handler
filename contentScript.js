(() => {
  // testing: do the message listening method
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { type, value, handler } = obj;
    if (type === "REDIRECT") {
      chrome.tabs.query(
        {
          currentWindow: true,
          active: true,
        },
        function (tab) {
          chrome.tabs.update(tab.id, {
            url: `https://pool.pm/${handler}`,
          });
        }
      );
    }
  });
})();
