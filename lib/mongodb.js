import { MongoClient } from "mongodb";

const uri = "mongodb+srv://zabooks:<db_password>@cluster0.dladnh4.mongodb.net/?appName=Cluster0"; 
const options = {};

let client;
let clientPromise;

if (!clientPromise) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
