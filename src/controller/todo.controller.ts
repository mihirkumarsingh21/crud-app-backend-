// import { Request, Response } from "express";
// import { client } from "../prismaClient/prisma.client.js";


// export const addTodo = async (req: Request, res: Response ) : Promise < void > => {
//     try {

//         const {userId} = req.params as {
//             userId: string
//         };
        
//         await client.todo.create({
//             data: {
//                 title: "go to gym",
//                 description: "regular going to gym is good for health.",
//                 done: false,
//                 user: Number(userId)

//             }
//         })
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: `server error something went wrong : ${error}`
//         })
//         return;
//     }
// }