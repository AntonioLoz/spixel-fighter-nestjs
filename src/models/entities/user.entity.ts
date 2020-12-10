import { DefaultValuePipe } from "@nestjs/common";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// TODO implementar los constraints y las validaciones

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
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

    @Column( { default: 0})
    level: number;

    @CreateDateColumn()
    registeredAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}