// Set up the alarm when the extension is installed or updated
chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('checkInAlarm', { periodInMinutes: 1 });
  });
  
  // Listen for the alarm
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkInAlarm') {
      // Create a notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Pet Monster Check-in',
        message: 'Your pet monster wants to see you! Click here to check in.',
        buttons: [{ title: 'Check In' }],
        requireInteraction: true
      });
    }
  });
  
  // Listen for notification clicks
  function openPopup() {
    chrome.action.openPopup();
  }
  
  chrome.notifications.onClicked.addListener((notificationId) => {
    openPopup();
  });
  
  chrome.notifications.onButtonClicked.addListener((notificationId, buttonIndex) => {
    if (buttonIndex === 0) {
      openPopup();
    }
  });