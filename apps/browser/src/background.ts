import { onCommandListener } from "./listeners/onCommandListener";

chrome.runtime.onInstalled.addListener((installedDetails) => {
  console.log("onInstalled", installedDetails);
  if (installedDetails.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.commands.getAll((commands) => {
      console.log("commands", commands);
    });
  }
});

chrome.commands.onCommand.addListener(onCommandListener);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("onMessage: ", {
    request,
    sender,
  });
});
