import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = process.env.OPENAI_API_KEY;

let conversation = [
  { role: "system", content: "You are a helpful, smart, and friendly AI assistant." }
];

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  conversation.push({ role: "user", content: userMessage });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: conversation
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    conversation.push({ role: "assistant", content: reply });

    res.json({ reply });

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
