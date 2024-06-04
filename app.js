// Cree une fonction pour scroller
// messagesContainer.scrollTop = messagesContainer.scrollHeight;

const messagesContainer = document.querySelector(".chat__main");
const btnSend = document.querySelector(".btn-send");

userInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    sendMessage();
  }
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

btnSend.addEventListener("click", () => {
  sendMessage();
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  document.getElementById("userInput").value = "";

  const messageContainer = document.querySelector(".chat__main");
  messageContainer.innerHTML += `<div class="user ">${userInput}</div>`;

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });

    const data = await response.json();

    setTimeout(() => {
      messageContainer.innerHTML += `
        <div class="mes">
          <div class="message bot">${data.response}</div>
        </div>`;
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
  } catch (error) {
    console.error("Erreur:", error);
    messageContainer.innerHTML += `<div class="message bot">Erreur de serveur</div>`;
  }
}
