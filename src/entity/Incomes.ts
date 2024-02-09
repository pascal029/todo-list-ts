import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usage: number;

  @Column()
  amount: number;

  @Column()
  userId: number;
}
