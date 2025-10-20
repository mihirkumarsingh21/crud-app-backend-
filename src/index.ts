import { PrismaClient } from "../src/generated/client/client.js";


const client = new PrismaClient();


const createUser = async () => {
   const user = await client.user.update({
        where: {
           id: 1
        },
        data: {
            username: "purnima",
            email: "p@gmail.com"
        }
    })

    console.log(`USER : ${JSON.stringify(user)}`);
    
}

createUser();