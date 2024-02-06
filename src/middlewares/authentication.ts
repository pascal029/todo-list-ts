import { Request, Response, NextFunction } from "express";
import {verifyJwt} from "../helpers/jwt"
import {UserController} from "../controller/UserController"

export default async function authentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authorizationHeader = request.headers.authorization?.split(" ")[1];
  if (!authorizationHeader ) throw { status: 401, message: "unauthorized" };

  const {id} = verifyJwt(authorizationHeader)
  if (!id ) throw { status: 401, message: "unauthorized" };
  
  const userController = new UserController()
  const user = await userController.one(id)
  
  if (user == "unregistered user") throw { status: 401, message: "unauthorized" };
  

  request.userId = id
  next();
}
