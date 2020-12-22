import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ObjectId, ObjectID } from "mongodb";
import { AnimationService } from "src/services/animation.service";

@Controller('animations')
export class AnimationController {
    
    constructor(private service: AnimationService) {

    }

    @Get()
    public async findAll(): Promise<Array<any>> {

        return await this.service.getAll();
    }

    @Get()
    public async find(@Param('id') id: number): Promise<any> {

        return this.service.get(new ObjectId(id));
    }
}