import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class IncomeAllocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bankName: string;

  @Column()
  allocationAmount: number;

  @ManyToOne(() => User, (user) => user.allocations)
  user: User;
}
