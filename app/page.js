"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/supabase"; // Updated import

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // 1. Fetch initial messages
    const fetchMessages = async () => {
      const { data } = await db
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setMessages(data);
    };

    fetchMessages();

    // 2. Setup Realtime subscription (replaces onSnapshot)
    const channel = db
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      db.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!text) return;

    // Supabase insert
    const { error } = await db
      .from("messages")
      .insert([{ text }]);

    if (error) {
      console.error("Error sending:", error.message);
    } else {
      setText("");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#111",
      color: "white",
      fontFamily: "sans-serif"
    }}>

      <div style={{ padding: 15, background: "#222", borderBottom: "1px solid #333" }}>
        # general (Supabase Powered)
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={msg.id || i} style={{
            background: "#333",
            padding: "10px 15px",
            borderRadius: 10,
            marginBottom: 8,
            maxWidth: "80%"
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{
        display: "flex",
        padding: 10,
        background: "#222"
      }}>
        <input
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            border: "none",
            outline: "none",
            background: "#444",
            color: "white"
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Message..."
        />
        <button 
          onClick={sendMessage} 
          style={{ 
            marginLeft: 10, 
            padding: "0 20px", 
            borderRadius: 8, 
            border: "none", 
            background: "#3eaf7c", 
            color: "white",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
