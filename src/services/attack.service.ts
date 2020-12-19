import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Attack } from "src/models/entities/attack.entity";
import { Repository } from "typeorm";


@Injectable()
export class AttackService {

    constructor(@InjectRepository(Attack) private repository: Repository<Attack>) {

    }

    public async getAll(): Promise<Array<Attack>> {

        return await this.repository.find();
    }

    public async getById(id: number): Promise<Attack> {

        return this.repository.findOne(id);
    }

    public async getByName(nameIn: string): Promise<Attack> {

        return this.repository.findOne({
            where: { name: nameIn }
        });
    }

    public async save(attack: Attack): Promise<Attack> {
        return await this. repository.save(attack);
    }

    public async update(id: number, attack: Attack): Promise<Attack> {

        const toUpdate = await this.repository.findOne(id);

        if(!toUpdate){
            throw new NotFoundException();
        }

        toUpdate.id = attack.id;
        toUpdate.fighter = attack.fighter;
        toUpdate.animationId = attack.animationId;

        return this.repository.save(toUpdate);
    }

    public async removeById(id: number): Promise<Attack> {

        const attackToRemove = await this.repository.findOne(id);

        if(!attackToRemove) {
            throw new NotFoundException();
        }
        
        return this.repository.remove(attackToRemove)
    }
}