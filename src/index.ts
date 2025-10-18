import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST
})


const connectingToDatabase = async (): Promise < void > => {
   const connectionInstance = await client.connect();
   console.log(`databasecresponse: ${connectionInstance}`);
   
}



connectingToDatabase();
// timestamps -> 1 : 22 : 00