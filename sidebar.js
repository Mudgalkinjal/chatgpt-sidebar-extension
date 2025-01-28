document.addEventListener("DOMContentLoaded", () => {
    const chatContainer = document.getElementById("chatContainer");
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");
  
    function appendMessage(content, isUser) {
      const messageDiv = document.createElement("div");
      messageDiv.className = isUser ? "user-message" : "bot-message";
      messageDiv.textContent = content;
      chatContainer.appendChild(messageDiv);
      chatContainer.scrollTop = chatContainer.scrollHeight; 
    }
  
    sendButton.addEventListener("click", () => {
      const query = userInput.value.trim();
      if (!query) return;
  
      appendMessage(query, true);
      userInput.value = "";
  
      window.postMessage({ type: "query", data: query }, "*");
    });
  
    window.addEventListener("message", (event) => {
      if (event.data.type === "response") {
        appendMessage(event.data.data, false);
      } else if (event.data.type === "error") {
        appendMessage(`Error: ${event.data.error}`, false);
      }
    });
  });
  