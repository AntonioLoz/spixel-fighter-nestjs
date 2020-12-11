import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectID } from "mongodb";
import { Db } from "typeorm";

@Injectable()
export class AnimationService {

    constructor(@Inject('MONGO_CONNECTION') private db: Db) {

    }

    public async getAll(): Promise<Array<any>> {
        return await this.db.collection('animations').find().toArray();
    }

    public async get(id: string): Promise<any> {
        if (!ObjectID.isValid(id)) {
            throw new BadRequestException();
        }

        const response = await this.db.collection('animations').find({
            _id: new ObjectID(id)
        });

        if(!response) {
            throw new NotFoundException();
        }

        return response;
    }
}