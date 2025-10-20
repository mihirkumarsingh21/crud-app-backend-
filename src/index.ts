import { Client } from "pg";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.json());


const pgClient = new Client({
   connectionString: process.env.PGSQL_CONNECTION_STRING
})

pgClient.connect();

app.post("/register", async (req, res) => {
   try {
     const {username, email, password, city, country, street, pincode} = req.body;

     const sqlUserInsertQuery = `INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING id`;
     
     const sqlAddressesInsertQuery = `INSERT INTO addresses (city, country, street, pincode, user_id) VALUES ($1, $2, $3, $4, $5)`;


     await pgClient.query("BEGIN");
     
     const regUser = await pgClient.query(sqlUserInsertQuery, [username, email, password]);
     const userId = regUser.rows[0].id;
     await pgClient.query(sqlAddressesInsertQuery, [city, country, street, pincode, userId]);

     await pgClient.query("COMMIT");


    res.json({
        message: "user register successfully.",
        regUser
    })


   } catch (error: any) {
    console.log(`error : ${error}`);
    
        res.status(500).json({
            success: false,
            message: error.message
        })

        return;
   }
})

app.get("/metadata", async (req, res) => {
    try {
        const { id } = req.query;
        const userGetQuery = `SELECT username, email FROM users WHERE id = $1`;
        const addressesGetQuery = `SELECT * FROM addresses WHERE user_id = $1`;

        const res1 = await pgClient.query(userGetQuery, [id]);
        const res2 = await pgClient.query(addressesGetQuery, [id]);


        res.json({
            success: true,
            users: res1.rows[0],
            addresses: res2.rows
        })

    } catch (error: any) {
        console.log(`error while getting user + meta data: ${error}`);
        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
    }
})

app.get("/metadata-bettar", async (req, res) => {
    try {
        const {id} = req.query;
        const userQuery = `SELECT users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode FROM users JOIN addresses ON users.id = addresses.user_id WHERE users.id = $1`;

       const response = await pgClient.query(userQuery, [id]);
       res.status(200).json({
        success: true,
        message: response.rows
       })

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: `server error something went wrong: ${error.message}`
        })
    }
})


app.listen(3000)

