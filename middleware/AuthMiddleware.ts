import { NextFunction, Request , Response } from "express";
import { config } from "dotenv";
import { verify } from "jsonwebtoken";
config();

export function authMiddleware(req: Request,res: Response,next: NextFunction){

    const token : string|undefined = req.header('auth-token');

    if(!token) return res.status(401).send('Access Denied');

    if(!process.env.APP_SECRET) {
        throw new Error ('App secret not set please add APP_SECRET to .env');
    }

    try {
        verify(token , process.env.APP_SECRET);
        next();
    }catch(error) {
        return res.status(400).send('Invalid Token');
    }
}