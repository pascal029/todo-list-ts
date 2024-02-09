import { IncomeController } from "../controller/IncomeController";
import authentication from "../middlewares/authentication";

export const incomeRoutes = [
  {
    controller: IncomeController,
    route: "/incomes",
    method: "post",
    action: "create",
    validation: [],
    middlewares: [authentication],
  },
  {
    controller: IncomeController,
    route: "/incomes",
    method: "get",
    action: "findOne",
    validation: [],
    middlewares: [authentication],
  },
  {
    controller: IncomeController,
    route: "/incomes",
    action: "updateIncomes",
    method: "patch",
    validation: [],
    middlewares: [authentication],
  },
];
