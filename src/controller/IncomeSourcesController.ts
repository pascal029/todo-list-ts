import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { IncomeSource } from "../entity/IncomeSources";
import { IncomeController } from "./IncomeController";

export class IncomeSourceController {
  private incomeSourceRepository = AppDataSource.getRepository(IncomeSource);

  async findAll(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;
    const incomeSources = await this.incomeSourceRepository.find({
      where: { user: { id: userId } },
    });

    return incomeSources;
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;
    const { amount, incomeName } = request.body;
    const incomeSources = await this.incomeSourceRepository.save({
      amount,
      incomeName,
      user: {
        id: userId,
      },
    });
    const incomeController = new IncomeController();

    await incomeController.updateIncomes(request, "_", "_");

    return incomeSources;
  }
}
