import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { decode, verify } from "jsonwebtoken";
import UserRepository from "../Repositories/UserRepository";
config();

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token: string | undefined = req.header("auth-token");

  if (!token) return res.status(401).send("Access Denied");

  if (!process.env.APP_SECRET) {
    throw new Error("App secret not set please add APP_SECRET to .env");
  }

  try {
    let decodedJwt = decode(token);

    if (decodedJwt && typeof decodedJwt !== "string") {
      res.locals.currentUser = await new UserRepository().findUserWithRole(
        decodedJwt._id
      );
    }
  } catch (e) {
    throw new Error("Something went wrong with auth user");
  }

  try {
    verify(token, process.env.APP_SECRET);
    next();
  } catch (error) {
    return res.status(400).send("Invalid Token");
  }
}
