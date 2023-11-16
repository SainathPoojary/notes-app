import { NextFunction, Request, RequestHandler, Response } from "express";
import { verify } from "jsonwebtoken";
import { Decode } from "../interfaces/types";

const { SECRET } = process.env;

export const auth: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies.access_token;

  if (!token)
    return res.status(403).json({
      status: 403,
      error: "access-denied",
      message: "No token found",
    });

  try {
    if (!SECRET) throw new Error("Secret is not defined");
    const decode: Decode = verify(token, SECRET) as Decode;
    req.body.user_id = decode.user_id;
    req.body.email = decode.email;
  } catch (error) {
    return res.status(401).json({
      status: 401,
      error: "unauthorized",
      message: "Invalid token",
    });
  }

  next();
};
