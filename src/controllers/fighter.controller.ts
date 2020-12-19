import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Fighter } from "src/models/entities/fighter.entity";
import { FighterService } from "src/services/fighter.service";


@Controller('fighters')
export class FighterController {

    constructor(private service: FighterService) {

    }

    @Get()
    public getAll() {

        return this.service.getAll();
    }

    @Get(':id')
    public async getById(@Param('id', ParseIntPipe) id: number): Promise<Fighter> {        

        return this.service.getById(id);
    }

    @Get(':name')
    public getByName(@Param('name') name: string) {

        return this.service.getByName(name);
    }

    @Post()
    public save(@Body() fighter: Fighter) {

        return this.service.save(fighter);
    }

    @Put()
    public async update(@Param('id', ParseIntPipe) id: number, @Body() fighter: Fighter) {

        return await this.service.update(id, fighter);
    }

    @Delete()
    public async delete(@Param('id', ParseIntPipe) id: number) {

        return this.service.removeById(id);
    }
    
}