document.addEventListener("DOMContentLoaded", function () {
    const chatInput = document.getElementById("chat-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");
  
    // Define the API URL
    const apiUrl = 'http://localhost:5192';
  
    sendButton.addEventListener("click", sendMessage);
  
    async function sendMessage() {
      const message = chatInput.value;
      if (message.trim() === "") return;
  
      chatMessages.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
  
      try {
        const response = await fetch(`${apiUrl}/pet/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: message }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        chatMessages.innerHTML += `<p><strong>Pet:</strong> ${data.response}</p>`;
      } catch (error) {
        console.error("Error details:", error);
        chatMessages.innerHTML += `<p>Sorry, I couldn't connect to the pet right now. Error: ${error.message}</p>`;
      }
  
      chatInput.value = "";
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    const iframe = document.getElementById('chatframe');
    // Replace with your actual embed code from Azure Bot Service
    iframe.src = 'https://webchat.botframework.com/embed/YOUR_BOT_ID?s=VZMgcFC1hbg.zXBkugz_XqR6INajYCjXoJPIqDcE9rTatQV09O4spgU';
});

document.addEventListener('DOMContentLoaded', function() {
  const chatbox = document.getElementById('chatbox');
  const userInput = document.getElementById('user-input');

  function addMessage(message, isUser) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${isUser ? 'You' : 'Bot'}: ${message}`;
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && this.value) {
      const message = this.value;
      addMessage(message, true);
      this.value = '';

      fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      .then(response => response.json())
      .then(data => {
        addMessage(data.reply, false);
      })
      .catch(error => {
        console.error('Error:', error);
        addMessage('Sorry, I encountered an error.', false);
      });
    }
  });

  addMessage('Hello! How can I assist you with your wellness today?', false);
});