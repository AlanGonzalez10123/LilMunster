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
