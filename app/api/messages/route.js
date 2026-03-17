import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// Replace with your real connection string from MongoDB Atlas
const uri = "mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    const db = client.db("chat_app");
    const messages = await db.collection("messages").find({}).toArray();
    return NextResponse.json(messages);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { text } = await req.json();
    await client.connect();
    const db = client.db("chat_app");
    await db.collection("messages").insertOne({ text, createdAt: new Date() });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
