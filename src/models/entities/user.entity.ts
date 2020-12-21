import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
<<<<<<< HEAD
} from "typeorm";
import { Fighter } from "./fighter.entity";
=======
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Fighter } from './fighter.entity';
>>>>>>> e145aa9db8ef39f7c64687264af20b756e9fc0ea

// TODO implementar los constraints y las validaciones

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  birthday: Date;

  @Column({ default: 0 })
  exp: number;

  @ManyToMany(() => Fighter, { cascade: true, eager: true })
  @JoinTable()
  fighters: Fighter[];
<<<<<<< HEAD
    
=======

>>>>>>> e145aa9db8ef39f7c64687264af20b756e9fc0ea
  @Column({ default: 0 })
  level: number;

  @CreateDateColumn()
  registeredAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
