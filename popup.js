document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-button");
  const chatMessages = document.getElementById("chat-messages");

  sendButton.addEventListener("click", sendMessage);

  // ... (previous code)

  async function sendMessage() {
    const message = chatInput.value;
    if (message.trim() === "") return;

    chatMessages.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

    try {
      const response = await fetch("https://localhost:5192/pet/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();
      chatMessages.innerHTML += `<p><strong>Pet:</strong> ${data.response}</p>`;
    } catch (error) {
      console.error("Error:", error);
      chatMessages.innerHTML += `<p>Sorry, I couldn't connect to the pet right now.</p>`;
    }

    chatInput.value = "";
  }
});
