"use client";

import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "messages"), (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!text) return;

    await addDoc(collection(db, "messages"), {
      text,
      createdAt: Date.now(),
    });

    setText("");
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      background: "#111",
      color: "white"
    }}>

      <div style={{ padding: 15, background: "#222" }}>
        # general
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            background: "#333",
            padding: 10,
            borderRadius: 10,
            marginBottom: 5
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
            padding: 10,
            borderRadius: 10,
            border: "none"
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
        />
        <button onClick={sendMessage} style={{ marginLeft: 5 }}>
          Send
        </button>
      </div>

    </div>
  );
}
