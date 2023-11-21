import { Response, NextFunction } from "express"
import jwt from 'jsonwebtoken';

import { JWTTokenPayload, RequestWithPayload } from "../types";

const PRIVATE_KEY = process.env.PRIVATE_KEY!;

export async function authMiddleware(req: RequestWithPayload, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.accessToken;

    if(!token) {
      return res.status(401).json({message: 'No authenication token'})
    }

    const decodedToken = await jwt.verify(token, PRIVATE_KEY) as JWTTokenPayload;
    req.userToken = decodedToken;
    next()
  } catch (error) {
    console.log(error)
    res.status(401).send({message: 'Authentication Error'});
  }
}