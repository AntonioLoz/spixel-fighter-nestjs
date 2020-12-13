import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attack } from "./attack.entity";

@Entity()

export class Fighter extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    exp: number;

    @Column()
    lvl: number;

    @Column()
    defense: number;
    
    @OneToMany(() => Attack, attack => attack.fighter, { cascade: true, eager: true })
    attacks: Attack[];

    animations: Array<Object>;
}