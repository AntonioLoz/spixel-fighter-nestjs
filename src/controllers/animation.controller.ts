import { Controller, Get, Param } from "@nestjs/common";
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
    public async find(@Param('id') id: string): Promise<any> {
        return this.service.get(id);
    }
}