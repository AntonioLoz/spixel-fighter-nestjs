import { Controller, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ObjectId, ObjectID } from "mongodb";
import { AnimationService } from "src/services/animation.service";

@Controller('animations')
export class AnimationController {
    
    constructor(private service: AnimationService) {

    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async findAll(): Promise<Array<any>> {

        return await this.service.getAll();
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public async find(@Param('id') id: number): Promise<any> {

        return this.service.get(new ObjectId(id));
    }
}