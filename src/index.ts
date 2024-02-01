import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import errorHandler from "./middlewares/errorHandler";
import { validationResult } from "express-validator";
import * as cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(cors("*"));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        ...route.middlewares,
        ...route.validation,
        async (req: Request, res: Response, next: Function) => {
          try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            return res.json(result);
          } catch (error) {
            next(error);
          }
        }
      );
    });

    app.use(errorHandler);
    app.listen(3000);

    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
