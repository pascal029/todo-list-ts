import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Todo } from "./Todo";
import { Income } from "./Incomes";
import { IncomeSource } from "./IncomeSources";
import { IncomeAllocation } from "./IncomeAllocations";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    unique: true,
    nullable: false,
  })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => IncomeSource, (incomeSource) => incomeSource.user)
  incomeSources: IncomeSource[];

  @OneToMany(
    () => IncomeAllocation,
    (incomeAllocation) => incomeAllocation.user
  )
  allocations: IncomeAllocation[];

  @OneToOne(() => Income)
  @JoinColumn()
  income: Income;
}
