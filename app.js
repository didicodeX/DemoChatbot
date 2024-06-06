const messagesContainer = document.querySelector(".chat__main");
const btnSend = document.querySelector(".btn-send");
const userInput = document.querySelector(".user-input");
let isLoading = false;

btnSend.addEventListener("click", function () {
  let userInputValue = userInput.value.trim();
  if (!isLoading) {
    sendMessage(userInputValue);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});

async function sendMessage(userInputValue) {
  const messageContainer = document.querySelector(".chat__main");
  messageContainer.innerHTML += `<div class="user">${userInputValue}</div>`;

  isLoading = true;

  try {
    const response = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInputValue }),
    });

    const data = await response.json();

    setTimeout(() => {
      const loadingDotsElement = document.createElement("div");
      loadingDotsElement.className = "loading-dots";
      loadingDotsElement.innerHTML =
        "<div></div><div></div><div></div><div></div>";
      messageContainer.appendChild(loadingDotsElement);
      messageContainer.scrollTop = messageContainer.scrollHeight;

      setTimeout(() => {
        messageContainer.removeChild(loadingDotsElement);
        messageContainer.innerHTML += `<div class="bot">${data.response}</div>`;
        messageContainer.scrollTop = messageContainer.scrollHeight;

        isLoading = false;
      }, 2000);
    }, 500);
  } catch (error) {
    console.error("Erreur:", error);
    messageContainer.innerHTML += `<div class="message bot">Erreur de serveur</div>`;
  }

  userInput.value = "";
  btnSend.style.opacity = "0";
  userInput.focus();
}

// Manipulation du DOM
const chatButton = document.querySelector(".chat__button");
const chatContainer = document.querySelector(".chat");
const chatClose = document.querySelector(".chat__close");

chatButton.addEventListener("click", () => {
  chatContainer.classList.toggle("show");
  userInput.focus();
});

chatClose.addEventListener("click", () => {
  chatContainer.classList.remove("show");
});

let chatbotDisplayed = false; 
window.addEventListener("scroll", () => {
  if (!chatbotDisplayed && window.scrollY > 100) { 
    chatContainer.classList.add("show"); 
    userInput.focus(); 
    chatbotDisplayed = true; 
  }
});

userInput.addEventListener("input", () => {
  var userInputValue = userInput.value.trim();
  if (userInputValue !== "") {
    btnSend.style.opacity = "1";
  } else {
    btnSend.style.opacity = "0";
  }
});

userInput.addEventListener("keydown", (e) => {
  var userInputValue = userInput.value.trim();
  if (e.key === "Enter" && userInputValue !== "" && !isLoading) {
    sendMessage(userInputValue);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  } else {
    console.log("error");
  }
});

// Courses Figma
const btn = document.querySelector(".btn-connexion");
const courses = document.querySelectorAll(".course");
const layer = document.querySelector(".layer");

btn.addEventListener('click', () => {
  connexion.classList.toggle("connect");
  layer.style.display = "block";
});

layer.addEventListener('click', () => {
  layer.style.display = "none";
  connexion.classList.toggle("connect");
});

courses.forEach(course => {
  course.addEventListener('click', () => {
    console.log(course);
    course.classList.toggle("active")
  })
});