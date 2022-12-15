chrome.tabs.onUpdated.addListener((tabId, tab) => {
  // since many people uses chrome, and typing search bar will do google search, this works
  // can extend to more scenarios
  if (tab.url && tab.url.includes("google.com/search")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    const handler = urlParameters.get("q");
    if (handler.includes("$")) {
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
      // // testing the message sending way allow for even more functionality
      // chrome.tabs.sendMessage(tabId, {
      //   type: "REDIRECT",
      //   handler: urlParameters.get("q"),
      // });
    }
  }
});
