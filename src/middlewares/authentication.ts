import { Request, Response, NextFunction } from "express";

export default function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorizationHeader = request.headers.authorization?.split(" ")[1];
  if (!authorizationHeader) throw { status: 401, message: "unauthorized" };

  request.userId = 1;
  next();
}
