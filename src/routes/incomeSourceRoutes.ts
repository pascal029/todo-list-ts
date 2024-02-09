import { body } from "express-validator";
import authentication from "../middlewares/authentication";
import { IncomeSourceController } from "../controller/IncomeSourcesController";

export const incomeSourceRoutes = [
  {
    method: "post",
    route: "/income-sources",
    action: "create",
    validation: [
      body("incomeName").notEmpty().isString(),
      body("amount").notEmpty().isInt(),
    ],
    middlewares: [authentication],
    controller: IncomeSourceController,
  },
  {
    method: "get",
    route: "/income-sources",
    action: "findAll",
    validation: [],
    middlewares: [authentication],
    controller: IncomeSourceController,
  },
];
