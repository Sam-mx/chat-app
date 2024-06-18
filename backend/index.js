require("dotenv").config();
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const axios = require("axios");
const { OpenAI } = require("openai");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const PORT = process.env.PORT || 3001;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

async function generateQuote() {
  try {
    const params = {
      messages: [{ role: "user", content: "Say this is a test" }],
      model: "gpt-3.5-turbo",
    };

    const chat = await openai.chat.completions.create(params);

    const message = chat.choices[0].message.content;

    return message;
  } catch (error) {
    console.error("Error generating quote:", error.message);
    return "Sorry, I couldn't generate a text.";
  }
}

// const QUOTABLE_API_URL = "https://api.quotable.io/random";

// const generateQuote = async () => {
//   try {
//     const response = await axios.get(QUOTABLE_API_URL);
//     if (response.status === 200) {
//       const { content, author } = response.data;
//       console.log("Quote generated:", content, "-", author);
//       return `${content} - ${author}`;
//     } else {
//       console.error("Unexpected response status:", response.status);
//       return "Unexpected response status.";
//     }
//   } catch (error) {
//     console.error("Error generating quote:", error.message);
//     return "Sorry, I couldn't generate a quote.";
//   }
// };

wss.on("connection", (ws) => {
  console.log("A user connected");

  ws.on("message", async (message) => {
    console.log("Received message:", message);

    let responseMessage = await generateQuote();
    console.log("Sending response:", responseMessage);
    ws.send(responseMessage);
  });

  ws.on("close", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
