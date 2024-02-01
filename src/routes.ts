import { todoRoutes } from "./routes/todoRoutes";
import { userRoutes } from "./routes/userRoutes";

export const Routes = [...userRoutes, ...todoRoutes];
