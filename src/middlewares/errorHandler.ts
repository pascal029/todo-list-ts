import { Request, Response, NextFunction, ErrorRequestHandler } from "express";

export default function errorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
}
