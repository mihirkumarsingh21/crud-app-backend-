import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import todoRoute from "./routes/todo.route.js";

dotenv.config();
const app = express();

app.use(express.json());


app.use("/api/v1/users", userRoute);
app.use("/api/v1/todos", todoRoute);




const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`SERVER IS RUNNING AT PORT -> ${port}`);
    
})