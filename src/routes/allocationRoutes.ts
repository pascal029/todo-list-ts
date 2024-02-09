import { body } from "express-validator";
import { AllocationIncomeController } from "../controller/AllocationController";
import authentication from "../middlewares/authentication";

export const allocationRoutes = [
  {
    controller: AllocationIncomeController,
    route: "/income-allocations",
    method: "get",
    action: "findAll",
    validation: [],
    middlewares: [authentication],
  },
  {
    controller: AllocationIncomeController,
    route: "/income-allocations",
    method: "post",
    action: "create",
    validation: [
      body("allocationAmount").notEmpty().isInt(),
      body("bankName").notEmpty().isString(),
    ],
    middlewares: [authentication],
  },
];
