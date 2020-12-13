import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fighter } from "./fighter.entity";

@Entity()
export class Attack extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Fighter, fighter => fighter.attacks)
    fighter: Fighter;

    @Column()
    animationId: string;
}