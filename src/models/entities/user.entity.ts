import { DefaultValuePipe } from "@nestjs/common";
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import bcrypt from 'bcrypt';

// TODO implementar los constraints y las validaciones

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique:true
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

    @Column( { default: 0})
    level: number;

    @CreateDateColumn()
    registeredAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    public async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

}