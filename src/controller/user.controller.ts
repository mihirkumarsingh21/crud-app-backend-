import { Request, Response } from "express"
import {client} from "../prismaClient/prisma.client.js"


export const addUser = async (req: Request, res: Response): Promise <void> => {
    try {
    
        const {username, email, password, todos} = req.body;

        const createUser = await client.user.create({
            data: {
                username,
                email,
                password,
                todos
            }
        })

        console.table([username, email, password, todos]);
        

        res.status(201).json({
            success: "true",
            message: "user added successfully.",
            user: createUser
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: `server error something went wrong :${error.message}`
        })
    }
} 

export const getUser = async (req: Request,  res: Response): Promise < void > => {
    try {
        const {id} = req.params as {
            id: string
        }

       const user = await client.user.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                username: true,
                email: true
            }
        })

        res.status(200).json({
            success: true,
            user
        })

    } catch (error: any) {
        console.log(`error while gettting user : ${error.message}`);
        
        res.status(500).json({
            success: false,
            message: `server error something went wrong : ${error.message}`
        })
    }
}