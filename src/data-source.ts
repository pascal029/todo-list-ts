import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Todo } from "./entity/Todo";
import { Income } from "./entity/Incomes";
import { IncomeSource } from "./entity/IncomeSources";
import { IncomeAllocation } from "./entity/IncomeAllocations";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "todo-list",
  synchronize: true,
  logging: false,
  entities: [User, Todo, Income, IncomeSource, IncomeAllocation],
  migrations: [],
  subscribers: [],
});
