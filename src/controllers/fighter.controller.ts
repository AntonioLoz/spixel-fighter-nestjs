import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Fighter } from "src/models/entities/fighter.entity";
import { FighterService } from "src/services/fighter.service";


@Controller('fighters')
export class FighterController {

    constructor(private service: FighterService) {

    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    public getAll() {

        return this.service.getAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    public async getById(@Param('id', ParseIntPipe) id: number): Promise<Fighter> {        

        return this.service.getById(id);
    }

    @Get(':name')
    @UseGuards(AuthGuard('jwt'))
    public getByName(@Param('name') name: string) {

        return this.service.getByName(name);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    public save(@Body() fighter: Fighter) {

        return this.service.save(fighter);
    }

    @Put()
    @UseGuards(AuthGuard('jwt'))
    public async update(@Param('id', ParseIntPipe) id: number, @Body() fighter: Fighter) {

        return await this.service.update(id, fighter);
    }

    @Delete()
    @UseGuards(AuthGuard('jwt'))
    public async delete(@Param('id', ParseIntPipe) id: number) {

        return this.service.removeById(id);
    }
    
}