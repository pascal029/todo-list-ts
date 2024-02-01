import { body } from "express-validator";
import { UserController } from "../controller/UserController";

export const userRoutes = [
  {
    method: "post",
    route: "/users/register",
    controller: UserController,
    action: "save",
    validation: [
      body("email").notEmpty().isEmail(),
      body("username").notEmpty().isString(),
      body("firstName").notEmpty().isString(),
      body("lastName").notEmpty().isString(),
      body("password").notEmpty().isString(),
    ],
    middlewares: [],
  },
  {
    method: "post",
    route: "/users/login",
    controller: UserController,
    action: "login",
    validation: [
      body("email").notEmpty().isEmail(),
      body("password").notEmpty().isString(),
    ],
    middlewares: [],
  },
];
