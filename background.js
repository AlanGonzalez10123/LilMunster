// Set up the alarm when the extension is installed or updated

const messages = ['I want to see you! Click to check in!','How are you feeling?', "Hi, take a brain break!", "How about a walk?", "Have you eaten today?", "How about a stretch?"]

let i = 0;

function getNextMessage(){
    message = messages[i]
    i = (i + 1) % messages.length;
    return message;
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.alarms.create('checkInAlarm', { periodInMinutes: 60 });
  });
  
  // Listen for the alarm
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkInAlarm') {
      // Create a notification
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'Lil Munster Check In',
        message: getNextMessage(),
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