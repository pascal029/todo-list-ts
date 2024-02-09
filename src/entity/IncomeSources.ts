import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class IncomeSource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  incomeName: string;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.incomeSources)
  user: User;
}
