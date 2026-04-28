async function sendMessage() {
  const input = document.getElementById("userInput").value;
  const chatbox = document.getElementById("chatbox");

  chatbox.innerHTML += "<p><b>You:</b> " + input + "</p>";

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer YOUR_API_KEY_HERE",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: input }]
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;

  chatbox.innerHTML += "<p><b>AI:</b> " + reply + "</p>";
}
