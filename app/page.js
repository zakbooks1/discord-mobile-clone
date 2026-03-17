"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const loadMessages = async () => {
    const res = await fetch("/api/messages");
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (!text) return;
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    setText("");
    loadMessages();
  };

  return (
    <div style={{ background: "#111", color: "white", minHeight: "100vh", padding: 20 }}>
      <h2>MongoDB Chat</h2>
      <div>
        {messages.map((m, i) => <div key={i} style={{ padding: 10, borderBottom: "1px solid #333" }}>{m.text}</div>)}
      </div>
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        style={{ color: "black", padding: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
