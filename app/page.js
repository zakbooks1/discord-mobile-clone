"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const refresh = async () => {
    const res = await fetch("/api/messages"); // This looks for app/api/messages/route.js
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => { refresh(); }, []);

  const send = async () => {
    await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ text })
    });
    setText("");
    refresh();
  };

  return (
    <div style={{ background: '#111', color: 'white', minHeight: '100vh' }}>
       {/* Your Chat UI here */}
    </div>
  );
}
