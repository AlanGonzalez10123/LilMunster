document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const chatMessages = document.getElementById("chat-messages");
  const chatbox = document.getElementById('chatbox');

  // Define the API URL - make sure this matches your Azure Function URL
  const apiUrl = 'http://localhost:3000';

  function addMessage(message, isUser) {
      const messageElement = document.createElement('p');
      messageElement.innerHTML = `<strong>${isUser ? 'You' : 'Munster'}:</strong> ${message}`;
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
      const message = chatInput.value;
      if (message.trim() === "") return;

      addMessage(message, true);
      chatInput.value = "";

      try {
        const response = await fetch(`${apiUrl}/chat`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ message: message }),
          });

          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.reply) {
              addMessage(data.reply, false);
          } else {
              console.error('Unexpected response:', data);
              addMessage('Sorry, I received an unexpected response.', false);
          }
      } catch (error) {
          console.error("Error details:", error);
          addMessage(`Sorry, I couldn't connect right now. Error: ${error.message}`, false);
      }
  }

  sendButton.addEventListener("click", sendMessage);

  chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
          sendMessage();
      }
  });

  // Initial greeting
  addMessage('Hiya, what\'s going on! ', false);
});