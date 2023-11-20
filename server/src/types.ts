import { Request } from "express";

export type JWTTokenPayload = {
  userId: 'string';
}

export interface RequestWithPayload extends Request {
  userToken?: JWTTokenPayload;
}