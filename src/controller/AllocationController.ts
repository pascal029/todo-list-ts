import { AppDataSource } from "../data-source";
import { IncomeAllocation } from "../entity/IncomeAllocations";

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
}
