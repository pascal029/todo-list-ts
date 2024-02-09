import { incomeRoutes } from "./routes/incomeRoutes";
import { incomeSourceRoutes } from "./routes/incomeSourceRoutes";
import { todoRoutes } from "./routes/todoRoutes";
import { userRoutes } from "./routes/userRoutes";

export const Routes = [
  ...userRoutes,
  ...todoRoutes,
  ...incomeSourceRoutes,
  ...incomeRoutes,
];
