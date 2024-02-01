import { body, param } from "express-validator";
import { TodoController } from "../controller/TodoController";
import authentication from "../middlewares/authentication";

export const todoRoutes = [
  {
    method: "get",
    route: "/todos",
    controller: TodoController,
    action: "findAll",
    middlewares: [authentication],
    validation: [],
  },
  {
    method: "get",
    route: "/todos/:todoId",
    controller: TodoController,
    action: "findOne",
    middlewares: [authentication],
    validation: [param("todoId").isInt()],
  },
  {
    method: "post",
    route: "/todos",
    controller: TodoController,
    action: "create",
    middlewares: [authentication],
    validation: [
      body("todoName").notEmpty().isString(),
      body("todoDate").notEmpty().isString(),
    ],
  },
  {
    method: "patch",
    route: "/todos/:todoId",
    controller: TodoController,
    action: "changeStatus",
    middlewares: [authentication],
    validation: [param("todoId").isInt()],
  },
  {
    method: "delete",
    route: "/todos/:todoId",
    controller: TodoController,
    action: "deleteOne",
    middlewares: [authentication],
    validation: [param("todoId").isInt()],
  },
];
