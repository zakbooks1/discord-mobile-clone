import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

export async function GET() {
  await client.connect();
  const db = client.db("chatdb");
  const data = await db.collection("messages").find().toArray();
  return NextResponse.json(data);
}

export async function POST(req) {
  const { text } = await req.json();
  await client.connect();
  const db = client.db("chatdb");
  await db.collection("messages").insertOne({ text, date: new Date() });
  return NextResponse.json({ success: true });
}
