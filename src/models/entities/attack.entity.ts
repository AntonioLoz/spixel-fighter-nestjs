import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Fighter } from "./fighter.entity";

@Entity()
export class Attack extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    damage: number;

    @ManyToOne(() => Fighter, fighter => fighter.attacks)
    fighter: Fighter;

    @Column()
    animationId: string;

    animation: Object;
}