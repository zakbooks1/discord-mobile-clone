"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  // Fetch messages from your API
  const getMessages = async () => {
    const response = await fetch("/api/messages");
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  const sendMessage = async () => {
    if (!text) return;

    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ text, createdAt: new Date() }),
    });

    setText("");
    getMessages(); // Refresh list
  };

  // ... (Keep your same return/UI code from before)
}
