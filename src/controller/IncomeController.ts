import { Request } from "express";
import { AppDataSource } from "../data-source";
import { IncomeAllocation } from "../entity/IncomeAllocations";
import { Income } from "../entity/Incomes";

export class IncomeController {
  private incomeRepository = AppDataSource.getRepository(Income);

  async findEntity(userId: number) {
    return await this.incomeRepository.findOne({ where: { userId } });
  }

  async findOne(request: Request, _, __) {
    const { userId } = request;
    return this.findEntity(userId);
  }

  async create(request: Request, _, __) {
    const { userId } = request;

    const income = await this.findEntity(userId);
    if (income) return income;

    const newIncome = await this.incomeRepository.save({
      amount: 0,
      usage: 0,
      userId,
    });
    return newIncome;
  }

  async updateIncomes(request: Request, _, __) {
    const { userId } = request;
    const { amount } = request.body;

    const { totalUsage } = await AppDataSource.getRepository(IncomeAllocation)
      .createQueryBuilder("allocations")
      .select("SUM(allocations.allocationAmount)", "totalUsage")
      .where("allocations.userId = :id", { id: userId })
      .getRawOne();

    let income = await this.create(request, "_", "_");

    income.amount += Number(amount);
    income.usage = totalUsage && income.amount ? totalUsage / income.amount : 0;

    await this.incomeRepository.save(income);
    return income;

    // const newIncome =
  }

  async updateUsage(request) {
    const { allocationAmount: amount } = request.body;
    const income = await this.create(request, "_", "__");

    const usedAllocation = (income.usage * income.amount) / 100;

    const newUsedAllocation =
      ((Number(amount) + usedAllocation) / income.amount) * 100;

    if (newUsedAllocation > 100) throw { name: "max_allocation_reached" };
    income.usage = newUsedAllocation;

    await this.incomeRepository.save(income);
    return income;
  }
}
