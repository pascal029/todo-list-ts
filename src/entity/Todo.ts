import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  todoName: string;

  @Column({
    type: "timestamp",
    nullable: false,
  })
  todoDate: Date;

  @Column({
    default: false,
  })
  status: boolean;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
