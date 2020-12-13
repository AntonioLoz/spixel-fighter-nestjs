import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Fighter } from "src/models/entities/fighter.entity";
import { Repository } from "typeorm";
import { AnimationService } from "./animation.service";


export class FighterService {

    constructor(@InjectRepository(Fighter) private repository: Repository<Fighter>, private animationService: AnimationService) {

    }

    public async getAll(): Promise<Array<Fighter>> {        
        
        return await this.repository.find();
    }

    public async getById(id: number): Promise<Fighter> {

        const fighter = await this.repository.findOne(id);

        fighter.animations = await this.animationService.get(fighter.id);        
        
        return fighter;
    }

    public async getByName(nameIn: string): Promise<Fighter> {

        const fighter = await this.repository.findOne({
            where: {name: nameIn}
        });

        fighter.animations = await this.animationService.get(fighter.id);    
        
        return fighter
    }

    public async save(fighter: Fighter): Promise<Fighter> {

        return await this.repository.save(fighter);
    }

    public async update(id: number, fighter: Fighter): Promise<Fighter> {

        const toUpdate = await this.repository.findOne(id);

        if(!toUpdate) {
            throw new NotFoundException();
        }

        toUpdate.id = fighter.id;
        toUpdate.name = fighter.name;
        toUpdate.exp = fighter.exp;
        toUpdate.lvl = fighter.lvl;
        toUpdate.defense = fighter.defense;
        toUpdate.attacks = fighter.attacks;

        return await this.repository.save(toUpdate);
    }

    // TODO: Con la animacion
    public async removeById(id: number): Promise<Fighter> {

        const toRemove = await this.repository.findOne(id);

        if(!toRemove) {
            throw new NotFoundException();
        }

        return await this.repository.remove(toRemove);
    }
}