async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const userText = input.value;
  chat.innerHTML += `<p><b>You:</b> ${userText}</p>`;
  input.value = "";

  const res = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: userText })
  });

  const data = await res.json();

  typeEffect("AI: " + data.reply, chat);
}

function typeEffect(text, element) {
  let i = 0;
  const p = document.createElement("p");
  element.appendChild(p);

  const interval = setInterval(() => {
    p.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 15);
}
