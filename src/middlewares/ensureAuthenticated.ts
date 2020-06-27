import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../config/auth";

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing");
  }

  const { secret } = authConfig.jwt;

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, secret);

    console.log(decoded);

    return next();
  } catch (error) {
    throw new Error("Invalid JWT token");
  }
}
