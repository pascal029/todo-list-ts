import { Request } from "express";
import { AppDataSource } from "../data-source";
import { IncomeAllocation } from "../entity/IncomeAllocations";
import { IncomeController } from "./IncomeController";

export class AllocationIncomeController {
  private allocationIncomeRepository =
    AppDataSource.getRepository(IncomeAllocation);

  async findAll(request, _, __) {
    const { userId } = request;
    const allocationIncomes = await this.allocationIncomeRepository.find({
      where: { user: { id: userId } },
    });
    return allocationIncomes;
  }

  async create(request: Request, _, __) {
    const { userId } = request;
    const { allocationAmount, bankName } = request.body;

    const newIncomeAllocation = await this.allocationIncomeRepository.save({
      bankName,
      allocationAmount,
      user: {
        id: userId,
      },
    });

    const incomeController = new IncomeController();

    await incomeController.updateUsage(request);

    return newIncomeAllocation;
  }
}
